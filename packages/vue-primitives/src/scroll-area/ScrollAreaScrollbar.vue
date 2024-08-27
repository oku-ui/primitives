<script setup lang="ts">
import { watchEffect } from 'vue'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'
import type { ScrollAreaScrollbarProps } from './ScrollAreaScrollbar.ts'
import ScrollAreaScrollbarHover from './ScrollAreaScrollbarHover.vue'
import ScrollAreaScrollbarScroll from './ScrollAreaScrollbarScroll.vue'
import ScrollAreaScrollbarAuto from './ScrollAreaScrollbarAuto.vue'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'

defineOptions({
  name: 'ScrollAreaScrollbar',
})

const props = withDefaults(defineProps<ScrollAreaScrollbarProps>(), {
  orientation: 'vertical',
})
const context = useScrollAreaContext('ScrollAreaScrollbar')

watchEffect(() => {
  if (props.orientation === 'horizontal')
    context.onScrollbarXEnabledChange(true)
  else
    context.onScrollbarYEnabledChange(true)
})

const type = context.type()

const Comp = type === 'hover'
  ? ScrollAreaScrollbarHover
  : type === 'scroll'
    ? ScrollAreaScrollbarScroll
    : type === 'auto'
      ? ScrollAreaScrollbarAuto
      : ScrollAreaScrollbarVisible
</script>

<template>
  <Comp :orientation="orientation">
    <slot />
  </Comp>
</template>
