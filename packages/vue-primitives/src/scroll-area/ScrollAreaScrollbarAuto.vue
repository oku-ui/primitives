<script setup lang="ts">
import { normalizeAttrs } from '../shared/index.ts'
import { type ScrollAreaScrollbarAutoProps, useScrollAreaScrollbarAuto } from './ScrollAreaScrollbarAuto.ts'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'

defineOptions({
  name: 'ScrollAreaScrollbarAuto',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ScrollAreaScrollbarAutoProps>(), {
  orientation: 'vertical',
})

const scrollAreaScrollbarAuto = useScrollAreaScrollbarAuto({
  orientation: props.orientation,
  forceMount: props.forceMount,
})
</script>

<template>
  <ScrollAreaScrollbarVisible
    v-if="scrollAreaScrollbarAuto.isPresent.value"
    v-bind="normalizeAttrs(scrollAreaScrollbarAuto.attrs([$attrs]))"
  >
    <slot />
  </ScrollAreaScrollbarVisible>
</template>
