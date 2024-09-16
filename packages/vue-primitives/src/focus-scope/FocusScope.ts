import { isClient } from '@vueuse/core'
import { nextTick, onWatcherCleanup, type Ref, toValue, watch, watchEffect } from 'vue'
import { focus, focusFirst, focusScopesStack, getTabbableCandidates, getTabbableEdges, removeLinks } from './utils.ts'

export interface FocusScopeProps {
  /**
   * When `true`, tabbing from last item will focus first tabbable
   * and shift+tab from first item will focus last tababble.
   * @defaultValue false
   */
  loop?: boolean

  /**
   * When `true`, focus cannot escape the focus scope via keyboard,
   * pointer, or a programmatic focus.
   * @defaultValue false
   */
  trapped?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type FocusScopeEmits = {
  /**
   * Event handler called when auto-focusing on mount.
   * Can be prevented.
   */
  mountAutoFocus: [event: Event]

  /**
   * Event handler called when auto-focusing on unmount.
   * Can be prevented.
   */
  unmountAutoFocus: [event: Event]
}

export const AUTOFOCUS_ON_MOUNT = 'focusScope.autoFocusOnMount'
export const EVENT_OPTIONS = { bubbles: false, cancelable: true }
export const AUTOFOCUS_ON_UNMOUNT = 'focusScope.autoFocusOnUnmount'

export interface UseFocusScopeProps {
  loop?: boolean
  trapped?: boolean | (() => boolean)
}
export interface UseFocusScopeEmits {
  onMountAutoFocus: (event: Event) => void
  onUnmountAutoFocus: (event: Event) => void
}

export function useFocusScope($el: Ref<HTMLElement | undefined>, props: UseFocusScopeProps, emits: UseFocusScopeEmits) {
  let lastFocusedElementRef: HTMLElement | null | undefined

  const focusScope = {
    paused: false,
    pause() {
      this.paused = true
    },
    resume() {
      this.paused = false
    },
  }

  // Takes care of trapping focus if focus is moved outside programmatically for example
  if (isClient) {
    function handleFocusIn(event: FocusEvent) {
      if (focusScope.paused || !$el.value)
        return

      const target = event.target as HTMLElement | null

      if ($el.value.contains(target)) {
        lastFocusedElementRef = target
      }
      else {
        focus(lastFocusedElementRef, { select: true })
      }
    }

    function handleFocusOut(event: FocusEvent) {
      if (focusScope.paused || !$el.value)
        return
      const relatedTarget = event.relatedTarget as HTMLElement | null

      // A `focusout` event with a `null` `relatedTarget` will happen in at least two cases:
      //
      // 1. When the user switches app/tabs/windows/the browser itself loses focus.
      // 2. In Google Chrome, when the focused element is removed from the DOM.
      //
      // We let the browser do its thing here because:
      //
      // 1. The browser already keeps a memory of what's focused for when the page gets refocused.
      // 2. In Google Chrome, if we try to focus the deleted focused element (as per below), it
      //    throws the CPU to 100%, so we avoid doing anything for this reason here too.
      if (relatedTarget === null)
        return

      // If the focus has moved to an actual legitimate element (`relatedTarget !== null`)
      // that is outside the container, we move focus to the last valid focused element inside.
      if (!$el.value.contains(relatedTarget)) {
        focus(lastFocusedElementRef, { select: true })
      }
    }

    // When the focused element gets removed from the DOM, browsers move focus
    // back to the document.body. In this case, we move focus to the container
    // to keep focus trapped correctly.
    // -- related: https://github.com/radix-vue/radix-vue/issues/518
    // Radix Vue tentative solution:
    // instead of leaning on document.activeElement, we use lastFocusedElementRef.value to check
    // if the element still exist inside the container,
    // if not then we focus to the container
    function handleMutations() {
      const isLastFocusedElementExist = $el.value?.contains(lastFocusedElementRef as HTMLElement)
      if (!isLastFocusedElementExist) {
        focus($el.value)
      }
    }

    watchEffect(() => {
      if (!toValue(props.trapped))
        return

      document.addEventListener('focusin', handleFocusIn)
      document.addEventListener('focusout', handleFocusOut)
      const mutationObserver = new MutationObserver(handleMutations)

      if ($el.value)
        mutationObserver.observe($el.value, { childList: true, subtree: true })

      onWatcherCleanup(() => {
        document.removeEventListener('focusin', handleFocusIn)
        document.removeEventListener('focusout', handleFocusOut)
        mutationObserver.disconnect()
      })
    })

    watch($el, async (container, _, onCleanup) => {
      if (!container)
        return
      focusScopesStack.add(focusScope)

      await nextTick()

      const previouslyFocusedElement = document.activeElement as HTMLElement | null
      const hasFocusedCandidate = container.contains(previouslyFocusedElement)

      if (!hasFocusedCandidate) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS)
        container.addEventListener(AUTOFOCUS_ON_MOUNT, emits.onMountAutoFocus)
        container.dispatchEvent(mountEvent)
        if (!mountEvent.defaultPrevented) {
          focusFirst(removeLinks(getTabbableCandidates(container)), { select: true })
          if (document.activeElement === previouslyFocusedElement) {
            focus(container)
          }
        }
      }

      onCleanup(() => {
        container.removeEventListener(AUTOFOCUS_ON_MOUNT, emits.onMountAutoFocus)

        // We hit a react bug (fixed in v17) with focusing in unmount.
        // We need to delay the focus a little to get around it for now.
        // See: https://github.com/facebook/react/issues/17894
        const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS)
        container.addEventListener(AUTOFOCUS_ON_UNMOUNT, emits.onUnmountAutoFocus)
        container.dispatchEvent(unmountEvent)

        setTimeout(() => {
          if (!unmountEvent.defaultPrevented) {
            focus(previouslyFocusedElement ?? document.body, { select: true })
          }

          // we need to remove the listener after we `dispatchEvent`
          container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, emits.onUnmountAutoFocus)

          focusScopesStack.remove(focusScope)
        }, 0)
      })
    })
  }

  // Takes care of looping focus (when tabbing whilst at the edges)
  function onKeydown(event: KeyboardEvent) {
    if (!props.loop && !toValue(props.trapped))
      return
    if (focusScope.paused)
      return

    const isTabKey = event.key === 'Tab' && !event.altKey && !event.ctrlKey && !event.metaKey
    const focusedElement = document.activeElement as HTMLElement | null

    if (!isTabKey || !focusedElement)
      return

    const container = event.currentTarget as HTMLElement
    const [first, last] = getTabbableEdges(container)
    const hasTabbableElementsInside = first && last

    // we can only wrap focus if we have tabbable edges
    if (!hasTabbableElementsInside) {
      if (focusedElement === container)
        event.preventDefault()
    }
    else {
      if (!event.shiftKey && focusedElement === last) {
        event.preventDefault()

        if (props.loop) {
          focus(first, { select: true })
        }
      }
      else if (event.shiftKey && focusedElement === first) {
        event.preventDefault()

        if (props.loop) {
          focus(last, { select: true })
        }
      }
    }
  }

  return {
    onKeydown,
  }
}
