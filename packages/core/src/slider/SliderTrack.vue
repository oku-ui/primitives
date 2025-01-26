<script setup lang="ts">
import type { SliderTrackProps } from './SliderTrack.ts'
import { Primitive } from '../primitive/index.ts'
import { normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_SLIDER_TRACK_PROPS, useSliderTrack } from './SliderTrack.ts'

defineOptions({
  name: 'SliderTrack',
  inheritAttrs: false,
})

withDefaults(defineProps<SliderTrackProps>(), DEFAULT_SLIDER_TRACK_PROPS)

const sliderTrack = useSliderTrack()
</script>

<template>
  <Primitive v-bind="normalizeAttrs(sliderTrack.attrs([$attrs, { as }]))">
    <slot />
  </Primitive>
</template>
