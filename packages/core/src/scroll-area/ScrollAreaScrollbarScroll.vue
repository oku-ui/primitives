<script setup lang="ts">
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import { DEFAULT_SCROLLBAR_SCROLL_PROPS, type ScrollAreaScrollbarScrollProps, useScrollAreaScrollbarScroll } from './ScrollAreaScrollbarScroll.ts'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'

defineOptions({
  name: 'ScrollAreaScrollbarScroll',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ScrollAreaScrollbarScrollProps>(), DEFAULT_SCROLLBAR_SCROLL_PROPS)

const scrollAreaScrollbarScroll = useScrollAreaScrollbarScroll(convertPropsToHookProps(props))
</script>

<template>
  <ScrollAreaScrollbarVisible
    v-if="scrollAreaScrollbarScroll.isPresent.value"
    v-bind="normalizeAttrs(scrollAreaScrollbarScroll.attrs([$attrs]))"
  >
    <slot />
  </ScrollAreaScrollbarVisible>
</template>
