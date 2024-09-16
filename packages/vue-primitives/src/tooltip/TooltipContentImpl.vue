<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { type FocusOutsideEvent, useDismissableLayer } from '../dismissable-layer/index.ts'
import { PopperContent, usePopperContext } from '../popper/index.ts'
import { provideTooltipContentContext, type TooltipContentImplEmits, type TooltipContentImplProps } from './TooltipContentImpl.ts'
import { TOOLTIP_OPEN, useTooltipContext } from './TooltipRoot.ts'

defineOptions({
  name: 'TooltipContentImpl',
})

const props = defineProps<TooltipContentImplProps>()
const emit = defineEmits<TooltipContentImplEmits>()

const context = useTooltipContext('TooltipContentImpl')
const popperContext = usePopperContext('TooltipContentImpl')

// Close the tooltip if the trigger is scrolled
function handleScroll(event: Event) {
  const target = event.target as HTMLElement
  if (target?.contains(context.trigger.value ?? null))
    context.onClose()
}

onMounted(() => {
  // Close this tooltip if another one opens
  document.addEventListener(TOOLTIP_OPEN, context.onClose)
  window.addEventListener('scroll', handleScroll, { capture: true, passive: true })
})

onBeforeUnmount(() => {
  document.removeEventListener(TOOLTIP_OPEN, context.onClose)
  window.removeEventListener('scroll', handleScroll, { capture: true })
})

function onFocusOutside(event: FocusOutsideEvent) {
  event.preventDefault()
}

provideTooltipContentContext({
  id: context.contentId,
  label() {
    return props.ariaLabel
  },
})

const dismissableLayer = useDismissableLayer(popperContext.content, {
  disableOutsidePointerEvents() {
    return false
  },
}, {
  onEscapeKeydown(event) {
    emit('escapeKeydown', event)
  },
  onDismiss: context.onClose,
  onFocusOutside,
  onPointerdownOutside(event) {
    emit('pointerdownOutside', event)
  },
})
</script>

<template>
  <PopperContent
    :id="ariaLabel ? undefined : context.contentId"

    data-dismissable-layer

    :role="ariaLabel ? undefined : 'tooltip'"
    :data-state="context.stateAttribute()"
    :style="{
      'pointerEvents': dismissableLayer.pointerEvents(),
      '--radix-tooltip-content-transform-origin': 'var(--radix-popper-transform-origin)',
      '--radix-tooltip-content-available-width': 'var(--radix-popper-available-width)',
      '--radix-tooltip-content-available-height': 'var(--radix-popper-available-height)',
      '--radix-tooltip-trigger-width': 'var(--radix-popper-anchor-width)',
      '--radix-tooltip-trigger-height': 'var(--radix-popper-anchor-height)',
    }"
  >
    <slot />
  </PopperContent>
</template>
