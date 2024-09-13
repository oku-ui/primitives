<script setup lang="ts">
import type { SliderTrackProps } from './SliderTrack.ts'
import { Primitive } from '../primitive/index.ts'
import { useSliderContext } from './SliderRoot.ts'

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
    :data-disabled="context.disabled() ? '' : undefined"
    :data-orientation="context.orientation()"
  >
    <slot />
  </Primitive>
</template>
