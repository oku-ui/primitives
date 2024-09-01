<script setup lang="ts">
import { PopperAnchor } from '../popper/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useHoverCardContext } from './HoverCardRoot.ts'
import type { HoverCardTriggerEmits, HoverCardTriggerProps } from './HoverCardTrigger.ts'
import { excludeTouch } from './utils.ts'

defineOptions({
  name: 'HoverCardTrigger',
  inheritAttrs: false,
})

withDefaults(defineProps<HoverCardTriggerProps>(), {
  as: 'a',
})

const emit = defineEmits<HoverCardTriggerEmits>()

const context = useHoverCardContext('HoverCardTrigger')

const onPointerenter = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerenter', event)
}, excludeTouch(context.onOpen))

const onPointerleave = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerleave', event)
}, excludeTouch(context.onClose))

const onFocus = composeEventHandlers<FocusEvent>((event) => {
  emit('focus', event)
}, context.onOpen)

const onBlur = composeEventHandlers<FocusEvent>((event) => {
  emit('blur', event)
}, context.onClose)

// prevent focus event on touch devices
const onTouchstart = composeEventHandlers<TouchEvent>((event) => {
  emit('touchstart', event)
}, event => event.preventDefault())
</script>

<template>
  <PopperAnchor as-child>
    <Primitive
      :as="as" v-bind="$attrs"
      :data-state="context.open.value ? 'open' : 'closed'"
      @pointerenter="onPointerenter"
      @pointerleave="onPointerleave"
      @focus="onFocus"
      @blur="onBlur"
      @touchstart="onTouchstart"
    >
      <slot />
    </Primitive>
  </PopperAnchor>
</template>
