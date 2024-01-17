<script lang="ts">
import type { SliderOrientationPrivateEmits } from './utils'
import { BACK_KEYS, linearScale, sliderOrientationProvider } from './utils'
import type { PrimitiveProps } from '@oku-ui/primitive'

export type SliderVerticalElement = SliderImplElement

export interface SliderVerticalProps extends PrimitiveProps {
  min: number
  max: number
  inverted: boolean
  scopeOkuSlider?: any
}

</script>

<script setup lang="ts">
import type { SliderImplElement } from './SliderImpl.vue'
import OkuSliderImpl from './SliderImpl.vue'
import { computed, ref } from 'vue'
import { useComponentRef } from '@oku-ui/use-composable'

const props = defineProps<SliderVerticalProps>()

const emits = defineEmits<SliderOrientationPrivateEmits>()

const isSlidingFromBottom = computed(() => !props.inverted)

const { componentRef, currentElement } = useComponentRef<SliderImplElement | null>()

const rectRef = ref<ClientRect>()

function getValueFromPointer(pointerPosition: number) {
  const rect = rectRef.value || currentElement.value!.getBoundingClientRect()
  const input: [number, number] = [0, rect.height]
  const output: [number, number] = isSlidingFromBottom.value ? [props.max, props.min] : [props.min, props.max]
  const value = linearScale(input, output)

  rectRef.value = rect
  return value(pointerPosition - rect.top)
}

sliderOrientationProvider({
  scope: props.scopeOkuSlider,
  startEdge: computed(() => isSlidingFromBottom.value ? 'bottom' : 'top'),
  endEdge: computed(() => isSlidingFromBottom.value ? 'top' : 'bottom'),
  direction: computed(() => isSlidingFromBottom.value ? 1 : -1),
  size: ref('height'),
})
</script>

<template>
  <OkuSliderImpl
    :is="props.is"
    ref="componentRef"
    :as-child="props.asChild"
    :min="props.min"
    :max="props.max"
    :inverted="props.inverted"
    :style="{
      ...$attrs.style as any,
      ['--oku-slider-thumb-transform' as any]: 'translateY(50%)',
    }"
    @slide-start="(event: PointerEvent) => {
      const value = getValueFromPointer(event.clientY)
      emits('slideStart', value)
    }"
    @slide-move="(event: PointerEvent) => {
      const value = getValueFromPointer(event.clientY)
      emits('slideStart', value)
    }"
    @slide-end="() => {
      rectRef = undefined
      emits('slideEnd')
    }"
    @step-key-down="(event: KeyboardEvent) => {
      const slideDirection = isSlidingFromBottom ? 'from-bottom' : 'from-top'
      const isBackKey = BACK_KEYS[slideDirection].includes(event.key)
      emits('stepKeyDown', { event, direction: isBackKey ? -1 : 1 })
    }"
  >
    <slot />
  </OkuSliderImpl>
</template>
