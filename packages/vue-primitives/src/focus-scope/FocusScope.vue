<script setup lang="ts">
import { nextTick, shallowRef, watch, watchEffect } from 'vue'
import { isClient } from '@vueuse/core'
import { useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import {
  AUTOFOCUS_ON_MOUNT,
  AUTOFOCUS_ON_UNMOUNT,
  EVENT_OPTIONS,
  type FocusScopeEmits,
  type FocusScopeProps,
  focus,
  focusFirst,
  focusScopesStack,
  getTabbableCandidates,
  getTabbableEdges,
  removeLinks,
} from './FocusScope.ts'

defineOptions({
  name: 'FocusScope',
})

const props = defineProps<FocusScopeProps>()
const emit = defineEmits<FocusScopeEmits>()

const container = shallowRef<HTMLElement>()
const forwardElement = useForwardElement(container)
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
    if (focusScope.paused || !container.value)
      return

    const target = event.target as HTMLElement | null

    if (container.value.contains(target))
      lastFocusedElementRef = target
    else
      focus(lastFocusedElementRef, { select: true })
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
    if (!container.value.contains(relatedTarget)) {
      focus(lastFocusedElementRef, { select: true })
    }
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

  watchEffect((onCleanup) => {
    if (!props.trapped)
      return

    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)
    const mutationObserver = new MutationObserver(handleMutations)

    if (container.value)
      mutationObserver.observe(container.value, { childList: true, subtree: true })

    onCleanup(() => {
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
      mutationObserver.disconnect()
    })
  })
}

if (isClient) {
  function onMountAutoFocus(event: Event) {
    emit('mountAutoFocus', event)
  }

  function onUnmountAutoFocus(event: Event) {
    emit('unmountAutoFocus', event)
  }

  watch(container, async (newContainer, _, onCleanup) => {
    if (!newContainer)
      return

    await nextTick()

    focusScopesStack.add(focusScope)
    const previouslyFocusedElement = document.activeElement as HTMLElement | null
    const hasFocusedCandidate = newContainer.contains(previouslyFocusedElement)

    if (!hasFocusedCandidate) {
      const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS)
      newContainer.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus)
      newContainer.dispatchEvent(mountEvent)
      if (!mountEvent.defaultPrevented) {
        focusFirst(removeLinks(getTabbableCandidates(newContainer)), { select: true })
        if (document.activeElement === previouslyFocusedElement) {
          focus(newContainer)
        }
      }
    }

    onCleanup(() => {
      newContainer.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus)

      // We hit a react bug (fixed in v17) with focusing in unmount.
      // We need to delay the focus a little to get around it for now.
      // See: https://github.com/facebook/react/issues/17894
      const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS)
      newContainer.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus)
      newContainer.dispatchEvent(unmountEvent)

      setTimeout(() => {
        if (!unmountEvent.defaultPrevented)
          focus(previouslyFocusedElement ?? document.body, { select: true })

        // we need to remove the listener after we `dispatchEvent`
        newContainer.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus)

        focusScopesStack.remove(focusScope)
      }, 0)
    })
  })
}

// Takes care of looping focus (when tabbing whilst at the edges)
function handleKeydown(event: KeyboardEvent) {
  if (!props.loop && !props.trapped)
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
</script>

<template>
  <Primitive
    :ref="forwardElement"
    tabindex="-1"
    @keydown="handleKeydown"
  >
    <slot />
  </Primitive>
</template>
