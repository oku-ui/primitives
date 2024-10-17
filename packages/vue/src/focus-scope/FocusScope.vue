<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { useComponentRef } from '@oku-ui/use-composable'

import { defineOptions, nextTick, reactive, ref, watchEffect } from 'vue'

import { focusScopesStack, removeLinks } from './focus-scope-stack'
import {
  focus,
  focusFirst,
  getTabbableCandidates,
  getTabbableEdges,
} from './utils'

const AUTOFOCUS_ON_MOUNT = 'okuFocusScope.autoFocusonMount'
const AUTOFOCUS_ON_UNMOUNT = 'okuFocusScope.autoFocusonUnmount'
const EVENT_OPTIONS = { bubbles: false, cancelable: true }

export interface FocusScopeProps extends PrimitiveProps {
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

</script>

<script setup lang="ts">
defineOptions({
  name: 'OkuFocusScope',
})

const props = withDefaults(defineProps<FocusScopeProps>(), {
  loop: false,
  trapped: false,
  is: 'div',
})

const emit = defineEmits<FocusScopeEmits>()

const { componentRef, currentElement } = useComponentRef<HTMLElement | null>()
const lastFocusedElementRef = ref<HTMLElement | null>(null)

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
watchEffect(async (onInvalidate) => {
  await nextTick()

  if (props.trapped) {
    const handleFocusIn = (event: FocusEvent) => {
      if (focusScope.paused || !currentElement.value)
        return
      const target = event.target as HTMLElement | null
      if (currentElement.value?.contains(target))
        lastFocusedElementRef.value = target
      else focus(lastFocusedElementRef.value, { select: true })
    }

    const handleFocusOut = (event: FocusEvent) => {
      if (focusScope.paused || !currentElement.value)
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
      if (!currentElement.value?.contains(relatedTarget))
        focus(lastFocusedElementRef.value, { select: true })
    }

    // When the focused element gets removed from the DOM, browsers move focus
    // back to the document.body. In this case, we move focus to the container
    // to keep focus trapped correctly.
    const handleMutations = (mutations: MutationRecord[]) => {
      const focusedElement = document.activeElement as HTMLElement | null
      if (focusedElement !== document.body)
        return
      for (const mutation of mutations) {
        if (mutation.removedNodes.length > 0)
          focus(currentElement.value)
      }
    }

    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)
    const mutationObserver: MutationObserver = new MutationObserver(
      handleMutations,
    )
    if (currentElement.value) {
      mutationObserver.observe(currentElement.value, {
        childList: true,
        subtree: true,
      })
    }

    onInvalidate(() => {
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
      mutationObserver.disconnect()
    })
  }
})

watchEffect(async (onInvalidate) => {
  await nextTick()
  if (currentElement.value) {
    focusScopesStack.add(focusScope)

    const previouslyFocusedElement
            = document.activeElement as HTMLElement | null
    const hasFocusedCandidate = currentElement.value?.contains(
      previouslyFocusedElement,
    )

    if (!hasFocusedCandidate) {
      const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS)
      currentElement.value?.addEventListener(AUTOFOCUS_ON_MOUNT, (event) => {
        emit('mountAutoFocus', event)
      })

      currentElement.value?.dispatchEvent(mountEvent)
      if (!mountEvent.defaultPrevented) {
        focusFirst(removeLinks(getTabbableCandidates(currentElement.value)), {
          select: true,
        })
        if (document.activeElement === previouslyFocusedElement)
          focus(currentElement.value)
      }
    }
    onInvalidate(async () => {
      currentElement.value?.removeEventListener(AUTOFOCUS_ON_MOUNT, (event) => {
        emit('mountAutoFocus', event)
      })

      // We hit a react bug (fixed in v17) with focusing in unmount.
      // We need to delay the focus a little to get around it for now.
      // See: https://github.com/facebook/react/issues/17894
      setTimeout(() => {
        const unmountEvent = new CustomEvent(
          AUTOFOCUS_ON_UNMOUNT,
          EVENT_OPTIONS,
        )
        currentElement.value?.addEventListener(AUTOFOCUS_ON_UNMOUNT, (event) => {
          emit('unmountAutoFocus', event)
        })
        currentElement.value?.dispatchEvent(unmountEvent)
        if (!unmountEvent.defaultPrevented) {
          focus(previouslyFocusedElement ?? document.body, {
            select: true,
          })
        }
        // we need to remove the listener after we `dispatchEvent`
        currentElement.value?.removeEventListener(
          AUTOFOCUS_ON_UNMOUNT,
          (event) => {
            emit('unmountAutoFocus', event)
          },
        )

        focusScopesStack.remove(focusScope)
      }, 0)
    })
  }
})

// Takes care of looping focus (when tabbing whilst at the edges)
function handleKeydown(event: KeyboardEvent) {
  if (!props.loop && !props.trapped)
    return
  if (focusScope.paused)
    return

  const isTabKey
        = event.key === 'Tab'
        && !event.altKey
        && !event.ctrlKey
        && !event.metaKey
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
        if (props.loop)
          focus(first, { select: true })
      }
      else if (event.shiftKey && focusedElement === first) {
        event.preventDefault()
        if (props.loop)
          focus(last, { select: true })
      }
    }
  }
}

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <Primitive
    :is="props.is"
    ref="componentRef"
    :as-child="props.asChild"
    :tabindex="-1"
    @keydown="handleKeydown"
  >
    <slot />
  </Primitive>
</template>
