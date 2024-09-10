<script setup lang="ts">
import { isClient } from '@vueuse/core'
import { onBeforeUnmount, onMounted, shallowRef, watchEffect } from 'vue'
import { type FocusOutsideEvent, useDismissableLayer } from '../dismissable-layer/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import { PopperContent } from '../popper/index.ts'
import { provideTooltipContentContext, type TooltipContentImplEmits, type TooltipContentImplProps } from './TooltipContentImpl.ts'
import { TOOLTIP_OPEN, useTooltipContext } from './TooltipRoot.ts'

defineOptions({
  name: 'TooltipContentImpl',
})

const props = defineProps<TooltipContentImplProps>()
const emit = defineEmits<TooltipContentImplEmits>()

const $el = shallowRef<HTMLDivElement>()
const forwardElement = useForwardElement($el)

const context = useTooltipContext('TooltipContentImpl')

onMounted(() => {
  // Close this tooltip if another one opens
  document.addEventListener(TOOLTIP_OPEN, context.onClose)
})

onBeforeUnmount(() => {
  document.removeEventListener(TOOLTIP_OPEN, context.onClose)
})

// Close the tooltip if the trigger is scrolled
if (isClient) {
  watchEffect((onCleanup) => {
    const trigger = context.trigger.value
    if (!trigger)
      return

    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement
      if (target?.contains(trigger))
        context.onClose()
    }

    window.addEventListener('scroll', handleScroll, { capture: true })

    onCleanup(() => {
      window.removeEventListener('scroll', handleScroll, { capture: true })
    })
  })
}

function onFocusOutside(event: FocusOutsideEvent) {
  event.preventDefault()
}

provideTooltipContentContext({
  id: context.contentId,
  label() {
    return props.ariaLabel
  },
})

const dismissableLayer = useDismissableLayer($el, {
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

defineExpose({
  $el,
})
</script>

<template>
  <PopperContent
    :id="ariaLabel ? undefined : context.contentId"
    :ref="forwardElement"

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

    @focus.capture="dismissableLayer.onFocusCapture"
    @blur.capture="dismissableLayer.onBlurCapture"
    @pointerdown.capture="dismissableLayer.onPointerdownCapture"
  >
    <slot />
  </PopperContent>
</template>
