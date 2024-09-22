<script setup lang="ts">
import { normalizeAttrs } from '../shared/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'
import { type ScrollAreaScrollbarProps, useScrollAreaScrollbar } from './ScrollAreaScrollbar.ts'
import ScrollAreaScrollbarAuto from './ScrollAreaScrollbarAuto.vue'
import ScrollAreaScrollbarHover from './ScrollAreaScrollbarHover.vue'
import ScrollAreaScrollbarScroll from './ScrollAreaScrollbarScroll.vue'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'

defineOptions({
  name: 'ScrollAreaScrollbar',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ScrollAreaScrollbarProps>(), {
  orientation: 'vertical',
})
const context = useScrollAreaContext('ScrollAreaScrollbar')

const scrollAreaScrollbar = useScrollAreaScrollbar({
  orientation: props.orientation,
})

const Comp = context.type === 'hover'
  ? ScrollAreaScrollbarHover
  : context.type === 'scroll'
    ? ScrollAreaScrollbarScroll
    : context.type === 'auto'
      ? ScrollAreaScrollbarAuto
      : ScrollAreaScrollbarVisible
</script>

<template>
  <Comp v-bind="normalizeAttrs(scrollAreaScrollbar.attrs(), $attrs)">
    <slot />
  </Comp>
</template>
