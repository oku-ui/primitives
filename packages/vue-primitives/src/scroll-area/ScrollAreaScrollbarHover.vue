<script setup lang="ts">
import { normalizeAttrs } from '../shared/index.ts'
import ScrollAreaScrollbarAuto from './ScrollAreaScrollbarAuto.vue'
import { type ScrollAreaScrollbarHoverProps, useScrollAreaScrollbarHover } from './ScrollAreaScrollbarHover.ts'

defineOptions({
  name: 'ScrollAreaScrollbarHover',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ScrollAreaScrollbarHoverProps>(), {
  orientation: 'vertical',
})

const scrollAreaScrollbarHover = useScrollAreaScrollbarHover({
  orientation: props.orientation,
  forceMount: props.forceMount,
})
</script>

<template>
  <ScrollAreaScrollbarAuto
    v-if="scrollAreaScrollbarHover.isPresent.value"
    v-bind="normalizeAttrs(scrollAreaScrollbarHover.attrs(), $attrs)"
  >
    <slot />
  </ScrollAreaScrollbarAuto>
</template>
