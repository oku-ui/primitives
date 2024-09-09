<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from '../primitive/index.ts'
import { useSliderOrientationContext } from './SliderOrientation.ts'
import { useSliderContext } from './SliderRoot.ts'
import { convertValueToPercentage } from './utils.ts'
import type { SliderRangeProps } from './SliderRange.ts'

defineOptions({
  name: 'SliderRange',
})

withDefaults(defineProps<SliderRangeProps>(), {
  as: 'span',
})

const context = useSliderContext('SliderRange')
const orientation = useSliderOrientationContext('SliderRange')

const percentages = computed(() => context.values.value.map(value => convertValueToPercentage(value, context.min(), context.max())))

const offsetStart = computed(() => context.values.value.length > 1 ? Math.min(...percentages.value) : 0)
const offsetEnd = computed(() => 100 - Math.max(...percentages.value))
</script>

<template>
  <Primitive
    :as="as"
    :data-disabled="context.disabled() ? '' : undefined"
    :data-orientation="context.orientation()"
    :style="{
      [orientation.startEdge]: `${offsetStart}%`,
      [orientation.endEdge]: `${offsetEnd}%`,
    }"
  >
    <slot />
  </Primitive>
</template>
