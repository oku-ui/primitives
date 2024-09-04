<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef, watchEffect } from 'vue'
import { isClient } from '@vueuse/core'
import DismissableLayer from '../dismissable-layer/DismissableLayer.vue'
import { PopperContent } from '../popper/index.ts'
import type { FocusOutsideEvent } from '../dismissable-layer/DismissableLayer.ts'
import { useForwardElement } from '../hooks/index.ts'
import { TOOLTIP_OPEN, useTooltipContext } from './TooltipRoot.ts'
import { type TooltipContentImplEmits, type TooltipContentImplProps, provideTooltipContentContext } from './TooltipContentImpl.ts'

defineOptions({
  name: 'TooltipContentImpl',
  inheritAttrs: false,
})

const props = defineProps<TooltipContentImplProps>()
const emit = defineEmits<TooltipContentImplEmits>()

const $el = shallowRef<HTMLElement>()
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

function focusOutside(event: FocusOutsideEvent) {
  event.preventDefault()
}

provideTooltipContentContext({
  id: context.contentId,
  label() {
    return props.ariaLabel
  },
})

defineExpose({
  $el,
})
</script>

<template>
  <DismissableLayer
    as="template"
    :disable-outside-pointer-events="false"
    @escape-keydown="emit('escapeKeydown', $event)"
    @pointerdown-outside="emit('pointerdownOutside', $event)"
    @focus-outside="focusOutside"
    @dismiss="context.onClose"
  >
    <PopperContent
      :id="ariaLabel ? undefined : context.contentId"
      :ref="forwardElement"
      :role="ariaLabel ? undefined : 'tooltip'"
      :data-state="context.stateAttribute()"
      style="--radix-tooltip-content-transform-origin: var(--radix-popper-transform-origin); --radix-tooltip-content-available-width: var(--radix-popper-available-width); --radix-tooltip-content-available-height: var(--radix-popper-available-height); --radix-tooltip-trigger-width: var(--radix-popper-anchor-width); --radix-tooltip-trigger-height: var(--radix-popper-anchor-height);"
      v-bind="$attrs"
    >
      <slot />
    </PopperContent>
  </DismissableLayer>
</template>
