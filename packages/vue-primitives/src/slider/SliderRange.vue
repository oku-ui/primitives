<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { type SliderRangeProps, useSliderRange } from './SliderRange.ts'

defineOptions({
  name: 'SliderRange',
  inheritAttrs: false,
})

withDefaults(defineProps<SliderRangeProps>(), {
  as: 'span',
})

const sliderRange = useSliderRange()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(sliderRange.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
