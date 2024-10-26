<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_SLIDER_RANGE_PROPS, type SliderRangeProps, useSliderRange } from './SliderRange.ts'

defineOptions({
  name: 'SliderRange',
  inheritAttrs: false,
})

withDefaults(defineProps<SliderRangeProps>(), DEFAULT_SLIDER_RANGE_PROPS)

const sliderRange = useSliderRange()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(sliderRange.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
