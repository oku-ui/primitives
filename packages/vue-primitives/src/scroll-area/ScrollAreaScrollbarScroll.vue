<script setup lang="ts">
import { normalizeAttrs } from '../shared/index.ts'
import { type ScrollAreaScrollbarScrollProps, useScrollAreaScrollbarScroll } from './ScrollAreaScrollbarScroll.ts'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'

defineOptions({
  name: 'ScrollAreaScrollbarScroll',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ScrollAreaScrollbarScrollProps>(), {
  orientation: 'vertical',
})

const scrollAreaScrollbarScroll = useScrollAreaScrollbarScroll({
  orientation: props.orientation,
  forceMount: props.forceMount,
})
</script>

<template>
  <ScrollAreaScrollbarVisible
    v-if="scrollAreaScrollbarScroll.isPresent.value"
    v-bind="normalizeAttrs(scrollAreaScrollbarScroll.attrs([$attrs]))"
  >
    <slot />
  </ScrollAreaScrollbarVisible>
</template>
