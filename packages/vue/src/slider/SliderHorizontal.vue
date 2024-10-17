<script lang="ts">
import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import type { SliderImplElement } from './SliderImpl.vue'
import type { Direction, SliderOrientationPrivateEmits } from './utils'
import { useDirection } from '@oku-ui/direction'
import { useComponentRef } from '@oku-ui/use-composable'
import { BACK_KEYS, linearScale, sliderOrientationProvider } from './utils'

export type SliderHorizontalElement = SliderImplElement

export interface SliderOrientationPrivateProps {

}

export interface SliderHorizontalProps extends PrimitiveProps {
  min: number
  max: number
  inverted: boolean
  scopeOkuSlider?: Scope
  dir?: Direction
}

</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import OkuSliderImpl from './SliderImpl.vue'

defineOptions({
  name: 'OkuSliderHorizontal',
})

const props = withDefaults(defineProps<SliderHorizontalProps>(), {

})

const emits = defineEmits<SliderOrientationPrivateEmits>()

const rectRef = ref<ClientRect>()

const { componentRef, currentElement } = useComponentRef()

const direction = useDirection(props.dir)
const isDirectionLTR = computed(() => direction.value === 'ltr')
const isSlidingFromLeft = computed(() => (isDirectionLTR.value && !props.inverted) || (!isDirectionLTR.value && props.inverted))

function getValueFromPointer(pointerPosition: number) {
  const rect = rectRef.value || currentElement.value!.getBoundingClientRect()
  const input: [number, number] = [0, rect.width]
  const output: [number, number] = isSlidingFromLeft.value ? [props.min!, props.max!] : [props.max!, props.min!]
  const value = linearScale(input, output)

  rectRef.value = rect
  return value(pointerPosition - rect.left)
}

sliderOrientationProvider({
  scope: props.scopeOkuSlider,
  startEdge: computed(() => isSlidingFromLeft.value ? 'left' : 'right'),
  endEdge: computed(() => isSlidingFromLeft.value ? 'right' : 'left'),
  direction: computed(() => isSlidingFromLeft.value ? 1 : -1),
  size: ref('width'),
})

defineExpose({
  $el: currentElement,
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
      ['--oku-slider-thumb-transform' as any]: 'translateX(-50%)',
    }"
    @slide-start="(event: PointerEvent) => {
      const value = getValueFromPointer(event.clientX)
      emits('slideStart', value)
    }"
    @slide-move="(event: PointerEvent) => {
      const value = getValueFromPointer(event.clientX)
      emits('slideMove', value)
    }"
    @slide-end="() => {
      rectRef = undefined
      emits('slideEnd')
    }"
    @step-key-down="(event: KeyboardEvent) => {
      const slideDirection = isSlidingFromLeft ? 'from-left' : 'from-right'
      const isBackKey = BACK_KEYS[slideDirection].includes(event.key)
      emits('stepKeyDown', { event, direction: isBackKey ? -1 : 1 })
    }"
  >
    <slot />
  </OkuSliderImpl>
</template>
