<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef, watchEffect } from 'vue'
import { type FocusOutsideEvent, useDismissableLayer } from '../dismissable-layer/index.ts'
import { PopperContent, usePopperContext } from '../popper/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useHoverCardContext } from './HoverCardRoot.ts'
import { getTabbableNodes } from './utils.ts'
import type { HoverCardContentImplEmits } from './HoverCardContentImpl.ts'

defineOptions({
  name: 'HoverCardContentImpl',
})

const emit = defineEmits<HoverCardContentImplEmits>()

const context = useHoverCardContext('HoverCardContentImpl')
const popperContext = usePopperContext('HoverCardContentImpl')
const containSelection = shallowRef(false)

watchEffect((onCleanup) => {
  if (containSelection.value) {
    const body = document.body

    // Safari requires prefix
    originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect

    body.style.userSelect = 'none'
    body.style.webkitUserSelect = 'none'
    onCleanup(() => {
      body.style.userSelect = originalBodyUserSelect
      body.style.webkitUserSelect = originalBodyUserSelect
    })
  }
})

function handlePointerUp() {
  containSelection.value = false
  context.isPointerDownOnContentRef.current = false

  // Delay a frame to ensure we always access the latest selection
  setTimeout(() => {
    const hasSelection = document.getSelection()?.toString() !== ''
    if (hasSelection)
      context.hasSelectionRef.current = true
  })
}

onMounted(() => {
  if (!popperContext.content.value)
    return

  document.addEventListener('pointerup', handlePointerUp)

  const tabbables = getTabbableNodes(popperContext.content.value)
  for (const tabbable of tabbables) {
    tabbable.setAttribute('tabindex', '-1')
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerup', handlePointerUp)
  context.hasSelectionRef.current = false
  context.isPointerDownOnContentRef.current = false
})

const onFocusOutside = composeEventHandlers<FocusOutsideEvent>((event) => {
  emit('focusOutside', event)
}, (event) => {
  event.preventDefault()
})

const onPointerdown = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerdown', event)
}, (event) => {
  // Contain selection to current layer
  if ((event.currentTarget as HTMLElement)?.contains(event.target as HTMLElement)) {
    containSelection.value = true
  }
  context.hasSelectionRef.current = false
  context.isPointerDownOnContentRef.current = true
})

const dismissableLayer = useDismissableLayer(popperContext.content, {
  disableOutsidePointerEvents() {
    return false
  },
}, {
  onInteractOutside(event) {
    emit('interactOutside', event)
  },
  onEscapeKeydown(event) {
    emit('escapeKeydown', event)
  },
  onDismiss: context.onDismiss,
  onFocusOutside,
  onPointerdownOutside(event) {
    emit('pointerdownOutside', event)
  },
})
</script>

<script lang="ts">
let originalBodyUserSelect: string
</script>

<template>
  <PopperContent
    data-dismissable-layer

    :style="{
      pointerEvents: dismissableLayer.pointerEvents(),
      userSelect: containSelection ? 'text' : undefined,
      // Safari requires prefix
      WebkitUserSelect: containSelection ? 'text' : undefined,
      // re-namespace exposed content custom properties
      ...{
        '--radix-hover-card-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-hover-card-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-hover-card-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-hover-card-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-hover-card-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    }"

    @pointerdown="onPointerdown"
  >
    <slot />
  </PopperContent>
</template>
