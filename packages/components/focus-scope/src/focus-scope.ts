import { Primitive } from '@oku-ui/primitive'
import type {
  ElementType,
  IPrimitiveProps,
  InstanceTypeRef,
  MergeProps,
} from '@oku-ui/primitive'

import { useCallbackRef, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'

import type { PropType } from 'vue'
import { defineComponent, h, reactive, ref, toRefs, watchEffect } from 'vue'

import { focus, focusFirst, getTabbableCandidates, getTabbableEdges } from './utils'
import { focusScopesStack, removeLinks } from './focus-scope-stack'

const AUTOFOCUS_ON_MOUNT = 'focusScope.autoFocusOnMount'
const AUTOFOCUS_ON_UNMOUNT = 'focusScope.autoFocusOnUnmount'
const EVENT_OPTIONS = { bubbles: false, cancelable: true }

export type FocusableTarget = HTMLElement | { focus(): void }

/* -------------------------------------------------------------------------------------------------
 * FocusScope
 * ----------------------------------------------------------------------------------------------- */

const FOCUS_SCOPE_NAME = 'FocusScope'

type FocusScopeElement = ElementType<'div'>
export type _FocusScopeEl = HTMLDivElement

interface FocusScopeProps extends IPrimitiveProps {
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

  /**
   * Event handler called when auto-focusing on mount.
   * Can be prevented.
   */
  onMountAutoFocus?: (event: Event) => void

  /**
   * Event handler called when auto-focusing on unmount.
   * Can be prevented.
   */
  onUnmountAutoFocus?: (event: Event) => void
}

const FocusScope = defineComponent({
  name: FOCUS_SCOPE_NAME,
  inheritAttrs: false,
  props: {
    loop: {
      type: Boolean,
      required: false,
      default: false,
    },
    trapped: {
      type: Boolean,
      required: false,
      default: false,
    },
    asChild: {
      type: Boolean,
      default: undefined,
    },
    onMountAutoFocus: {
      type: Function as PropType<FocusScopeProps['onMountAutoFocus']>,
      required: false,
    },
    onUnmountAutoFocus: {
      type: Function as PropType<FocusScopeProps['onUnmountAutoFocus']>,
      required: false,
    },
  },
  setup(props, { slots, attrs }) {
    const { ...FocusScopeProps } = attrs as FocusScopeElement

    const {
      loop,
      trapped,
      asChild,
      onMountAutoFocus: onMountAutoFocusProp,
      onUnmountAutoFocus: onUnmountAutoFocusProp,
    } = toRefs(props)

    const container = ref<HTMLElement | null>(null)
    const onMountAutoFocus = useCallbackRef(onMountAutoFocusProp.value)
    const onUnmountAutoFocus = useCallbackRef(onUnmountAutoFocusProp.value)
    const lastFocusedElementRef = ref<HTMLElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, (node) => {
      if (node instanceof HTMLElement)
        container.value = node
    })

    const focusScope = reactive({
      paused: false,
      pause() {
        focusScope.paused = true
      },
      resume() {
        focusScope.paused = false
      },
    })

    // Takes care of trapping focus if focus is moved outside programmatically for example
    watchEffect((onInvalidate) => {
      if (trapped.value) {
        function handleFocusIn(event: FocusEvent) {
          if (focusScope.paused || !container.value)
            return
          const target = event.target as HTMLElement | null
          if (container.value.contains(target))
            lastFocusedElementRef.value = target
          else
            focus(lastFocusedElementRef.value, { select: true })
        }

        function handleFocusOut(event: FocusEvent) {
          if (focusScope.paused || !container.value)
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
          if (!container.value.contains(relatedTarget))
            focus(lastFocusedElementRef.value, { select: true })
        }

        // When the focused element gets removed from the DOM, browsers move focus
        // back to the document.body. In this case, we move focus to the container
        // to keep focus trapped correctly.
        function handleMutations(mutations: MutationRecord[]) {
          const focusedElement = document.activeElement as HTMLElement | null
          if (focusedElement !== document.body)
            return
          for (const mutation of mutations) {
            if (mutation.removedNodes.length > 0)
              focus(container.value)
          }
        }

        document.addEventListener('focusin', handleFocusIn)
        document.addEventListener('focusout', handleFocusOut)
        const mutationObserver: MutationObserver = new MutationObserver(handleMutations)
        if (container.value)
          mutationObserver.observe(container.value, { childList: true, subtree: true })
        onInvalidate(() => {
          document.removeEventListener('focusin', handleFocusIn)
          document.removeEventListener('focusout', handleFocusOut)
          if (mutationObserver)
            mutationObserver.disconnect()
        })
      }
    })

    watchEffect((onInvalidate) => {
      if (container.value) {
        focusScopesStack.add(focusScope)
        const previouslyFocusedElement = document.activeElement as HTMLElement | null
        const hasFocusedCandidate = container.value.contains(previouslyFocusedElement)

        if (!hasFocusedCandidate) {
          const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS)
          container.value.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus)
          container.value.dispatchEvent(mountEvent)
          if (!mountEvent.defaultPrevented) {
            focusFirst(removeLinks(getTabbableCandidates(container.value)), { select: true })
            if (document.activeElement === previouslyFocusedElement)
              focus(container.value)
          }
        }
        onInvalidate(() => {
          container.value?.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus)

          // We hit a react bug (fixed in v17) with focusing in unmount.
          // We need to delay the focus a little to get around it for now.
          // See: https://github.com/facebook/react/issues/17894
          setTimeout(() => {
            const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS)
            container.value?.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus)
            container.value?.dispatchEvent(unmountEvent)
            if (!unmountEvent.defaultPrevented)
              focus(previouslyFocusedElement ?? document.body, { select: true })

            container.value?.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus)

            focusScopesStack.remove(focusScope)
          }, 0)
        })
      }
    })

    // Takes care of looping focus (when tabbing whilst at the edges)
    function handleKeyDown(event: KeyboardEvent) {
      if (!loop.value && !trapped.value)
        return
      if (focusScope.paused)
        return

      const isTabKey = event.key === 'Tab' && !event.altKey && !event.ctrlKey && !event.metaKey
      const focusedElement = document.activeElement as HTMLElement | null

      if (isTabKey && focusedElement) {
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
            if (loop.value)
              focus(first, { select: true })
          }
          else if (event.shiftKey && focusedElement === first) {
            event.preventDefault()
            if (loop.value)
              focus(last, { select: true })
          }
        }
      }
    }

    const originalReturn = () => h(Primitive.div, {
      tabIndex: -1,
      ref: composedRefs,
      onKeydown: handleKeyDown,
      ...FocusScopeProps,
      asChild: asChild.value,
    }, {
      default: () => slots.default?.(),
    })

    return originalReturn
  },
})

type _FocusScopeProps = MergeProps<FocusScopeProps, FocusScopeElement>
type InstanceFocusScopeType = InstanceTypeRef<typeof FocusScope, _FocusScopeEl>

const OkuFocusScope = FocusScope as typeof FocusScope & (new () => { $props: _FocusScopeProps })

export { OkuFocusScope }
export type { FocusScopeProps, FocusScopeElement, InstanceFocusScopeType }
