<script setup lang="ts">
import { useAttrs } from 'vue'
import { composeEventHandlers } from '../utils/composeEventHandlers.ts'
import { isFunction } from '../utils/is.ts'
import { Primitive } from '../primitive/index.ts'
import type { SliderImplPrivateEmits, SliderImplProps } from './SliderImpl.ts'
import { ARROW_KEYS, PAGE_KEYS, useSliderContext } from './Slider.ts'

defineOptions({
  name: 'SliderImpl',
  inheritAttrs: false,
})

withDefaults(defineProps<SliderImplProps>(), {
  as: 'span',
})

const emit = defineEmits<SliderImplPrivateEmits>()

const attrs = useAttrs()

const context = useSliderContext('SliderImpl')

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  isFunction(attrs.onKeydown) && attrs.onKeydown(event)
}, (event) => {
  if (event.key === 'Home') {
    emit('homeKeydown', event)
    // Prevent scrolling to page start
    event.preventDefault()
  }
  else if (event.key === 'End') {
    emit('endKeydown', event)
    // Prevent scrolling to page end
    event.preventDefault()
  }
  else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
    emit('stepKeydown', event)
    // Prevent scrolling for directional key presses
    event.preventDefault()
  }
})

const onPointerdown = composeEventHandlers<PointerEvent>((event) => {
  isFunction(attrs.onPointerdown) && attrs.onPointerdown(event)
}, (event) => {
  const target = event.target as HTMLElement
  target.setPointerCapture(event.pointerId)
  // Prevent browser focus behaviour because we focus a thumb manually when values change.
  event.preventDefault()
  // Touch devices have a delay before focusing so won't focus if touch immediately moves
  // away from target (sliding). We want thumb to focus regardless.
  if (context.thumbs.has(target)) {
    target.focus()
  }
  else {
    emit('slideStart', event)
  }
})

const onPointermove = composeEventHandlers<PointerEvent>((event) => {
  isFunction(attrs.onPointermove) && attrs.onPointermove(event)
}, (event) => {
  const target = event.target as HTMLElement
  if (target.hasPointerCapture(event.pointerId))
    emit('slideMove', event)
})

const onPointerup = composeEventHandlers<PointerEvent>((event) => {
  isFunction(attrs.onPointerup) && attrs.onPointerup(event)
}, (event) => {
  const target = event.target as HTMLElement
  if (target.hasPointerCapture(event.pointerId)) {
    target.releasePointerCapture(event.pointerId)
    emit('slideEnd', event)
  }
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{
      ...attrs,
      onKeydown,
      onPointerdown,
      onPointermove,
      onPointerup,
    }"
  >
    <slot />
  </Primitive>
</template>
