<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useDirection } from '../direction/Direction.ts'
import { BACK_KEYS } from './Slider.ts'
import type { SliderHorizontalProps } from './SliderHorizontal.ts'
import { linearScale } from './utils.ts'
import SliderImpl from './SliderImpl.vue'
import { type SliderOrientationPrivateEmits, provideSliderOrientationContext } from './SliderOrientation.ts'

defineOptions({
  name: 'SliderHorizontal',
})

const props = defineProps<SliderHorizontalProps>()

const emit = defineEmits<SliderOrientationPrivateEmits>()

const elRef = shallowRef<HTMLSpanElement>()
let rectRef: DOMRect | undefined
const direction = useDirection(() => props.dir)
const isSlidingFromLeft = computed(() => (direction.value === 'ltr' && !props.inverted) || (direction.value !== 'ltr' && props.inverted))

function getValueFromPointer(pointerPosition: number) {
  const rect = rectRef || elRef.value!.getBoundingClientRect()
  const input: [number, number] = [0, rect.width]
  const output: [number, number] = isSlidingFromLeft.value ? [props.min, props.max] : [props.max, props.min]
  const value = linearScale(input, output)

  rectRef = rect

  return value(pointerPosition - rect.left)
}

provideSliderOrientationContext({
  startEdge: isSlidingFromLeft.value ? 'left' : 'right',
  endEdge: isSlidingFromLeft.value ? 'right' : 'left',
  direction: isSlidingFromLeft.value ? 1 : -1,
  size: 'width',
})
</script>

<template>
  <SliderImpl
    :ref="(el: any) => elRef = el?.$el"
    :dir="direction"
    data-orientation="horizontal"
    style="--radix-slider-thumb-transform: translateX(-50%)"
    @slide-start="(event) => {
      const value = getValueFromPointer(event.clientX);
      emit('slideStart', value)
    }"
    @slide-move="(event) => {
      const value = getValueFromPointer(event.clientX);
      emit('slideMove', value)
    }"
    @slide-end="() => {
      rectRef = undefined;
      emit('slideEnd')
    }"
    @step-keydown="(event) => {
      const slideDirection = isSlidingFromLeft ? 'from-left' : 'from-right';
      const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
      emit('stepKeydown', { event, direction: isBackKey ? -1 : 1 })
    }"
  >
    <slot />
  </SliderImpl>
</template>
