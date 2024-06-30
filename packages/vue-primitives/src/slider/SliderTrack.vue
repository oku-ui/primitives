<script setup lang="ts">
import { Primitive } from '../primitive/index.ts'
import { useSliderContext } from './Slider.ts'
import type { SliderTrackProps } from './SliderTrack.ts'

defineOptions({
  name: 'SliderTrack',
})

withDefaults(defineProps<SliderTrackProps>(), {
  as: 'span',
})

const context = useSliderContext('SliderTrack')
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :data-disabled="context.disabled.value ? '' : undefined"
    :data-orientation="context.orientation.value"
  >
    <slot />
  </Primitive>
</template>
