<script setup lang="ts">
import { convertPropsToHookProps, normalizeAttrs } from '../shared/index.ts'
import ScrollAreaScrollbarAuto from './ScrollAreaScrollbarAuto.vue'
import { DEFAULT_SCROLLBAR_HOVER_PROPS, type ScrollAreaScrollbarHoverProps, useScrollAreaScrollbarHover } from './ScrollAreaScrollbarHover.ts'

defineOptions({
  name: 'ScrollAreaScrollbarHover',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ScrollAreaScrollbarHoverProps>(), DEFAULT_SCROLLBAR_HOVER_PROPS)

const scrollAreaScrollbarHover = useScrollAreaScrollbarHover(convertPropsToHookProps(props))
</script>

<template>
  <ScrollAreaScrollbarAuto
    v-if="scrollAreaScrollbarHover.isPresent.value"
    v-bind="normalizeAttrs(scrollAreaScrollbarHover.attrs([$attrs]))"
  >
    <slot />
  </ScrollAreaScrollbarAuto>
</template>
