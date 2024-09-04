<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { PopperAnchor } from '../popper/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useForwardElement } from '../hooks/useForwardElement.ts'
import { useTooltipProviderContext } from './TooltipProvider.ts'
import type { TooltipTriggerEmits, TooltipTriggerProps } from './TooltipTrigger.ts'
import { useTooltipContext } from './TooltipRoot.ts'

defineOptions({
  name: 'TooltipTrigger',
  inheritAttrs: false,
})

withDefaults(defineProps<TooltipTriggerProps>(), {
  as: 'button',
})

const emit = defineEmits<TooltipTriggerEmits>()

const context = useTooltipContext('TooltipTrigger')
const providerContext = useTooltipProviderContext('TooltipTrigger')

const forwardElement = useForwardElement(context.trigger)

let isPointerDownRef = false
let hasPointerMoveOpenedRef = false

function handlePointerUp() {
  isPointerDownRef = false
}

onBeforeUnmount(() => {
  document.removeEventListener('pointerup', handlePointerUp)
})

const onPointermove = composeEventHandlers<PointerEvent>((event) => {
  emit('pointermove', event)
}, (event) => {
  if (event.pointerType === 'touch')
    return

  if (hasPointerMoveOpenedRef || providerContext.isPointerInTransitRef.current)
    return

  context.onTriggerEnter()
  hasPointerMoveOpenedRef = true
})

const onPointerleave = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerleave', event)
}, () => {
  context.onTriggerLeave()
  hasPointerMoveOpenedRef = false
})

const onPointerdown = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerdown', event)
}, () => {
  isPointerDownRef = true
  document.addEventListener('pointerup', handlePointerUp, { once: true })
})

const onFocus = composeEventHandlers<FocusEvent>((event) => {
  emit('focus', event)
}, () => {
  if (!isPointerDownRef)
    context.onOpen()
})

const onBlur = composeEventHandlers<FocusEvent>((event) => {
  emit('blur', event)
}, context.onClose)

const onClick = composeEventHandlers<MouseEvent>((event) => {
  emit('click', event)
}, context.onClose)

defineExpose({
  $el: context.trigger,
})
</script>

<template>
  <PopperAnchor as="template">
    <Primitive
      :ref="forwardElement"
      :as="as"
      :aria-describedby="context.open.value ? context.contentId : undefined"
      :data-state="context.stateAttribute()"
      data-grace-area-trigger
      v-bind="$attrs"
      @pointermove="onPointermove"
      @pointerleave="onPointerleave"
      @pointerdown="onPointerdown"
      @focus="onFocus"
      @blur="onBlur"
      @click="onClick"
    >
      <slot />
    </Primitive>
  </PopperAnchor>
</template>
