<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { BACK_KEYS } from './Slider.ts'
import { linearScale } from './utils.ts'
import SliderImpl from './SliderImpl.vue'
import { type SliderOrientationPrivateEmits, provideSliderOrientationContext } from './SliderOrientation.ts'
import type { SliderVerticalProps } from './SliderVertical.ts'

defineOptions({
  name: 'SliderVertical',
})

const props = defineProps<SliderVerticalProps>()

const emit = defineEmits<SliderOrientationPrivateEmits>()

const elRef = shallowRef<HTMLSpanElement>()
let rectRef: DOMRect | undefined
const isSlidingFromBottom = computed(() => !props.inverted)

function getValueFromPointer(pointerPosition: number) {
  const rect = rectRef || elRef.value!.getBoundingClientRect()
  const input: [number, number] = [0, rect.height]
  const output: [number, number] = isSlidingFromBottom.value ? [props.max, props.min] : [props.min, props.max]
  const value = linearScale(input, output)

  rectRef = rect
  return value(pointerPosition - rect.top)
}

provideSliderOrientationContext({
  startEdge: isSlidingFromBottom.value ? 'bottom' : 'top',
  endEdge: isSlidingFromBottom.value ? 'top' : 'bottom',
  size: 'height',
  direction: isSlidingFromBottom.value ? 1 : -1,
})
</script>

<template>
  <SliderImpl
    :ref="(el: any) => elRef = el?.$el"
    data-orientation="vertical"
    style="--radix-slider-thumb-transform: translateY(50%)"
    @slide-start="(event) => {
      const value = getValueFromPointer(event.clientY);
      emit('slideStart', value)
    }"
    @slide-move="(event) => {
      const value = getValueFromPointer(event.clientY);
      emit('slideMove', value)
    }"
    @slide-end="() => {
      rectRef = undefined;
      emit('slideEnd')
    }"
    @step-keydown="(event) => {
      const slideDirection = isSlidingFromBottom ? 'from-bottom' : 'from-top';
      const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
      emit('stepKeydown', { event, direction: isBackKey ? -1 : 1 })
    }"
  >
    <slot />
  </SliderImpl>
</template>
