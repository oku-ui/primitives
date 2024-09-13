<script setup lang="ts">
import type { ScrollAreaScrollbarProps } from './ScrollAreaScrollbar.ts'
import { watchEffect } from 'vue'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'
import ScrollAreaScrollbarAuto from './ScrollAreaScrollbarAuto.vue'
import ScrollAreaScrollbarHover from './ScrollAreaScrollbarHover.vue'
import ScrollAreaScrollbarScroll from './ScrollAreaScrollbarScroll.vue'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'

defineOptions({
  name: 'ScrollAreaScrollbar',
})

const props = withDefaults(defineProps<ScrollAreaScrollbarProps>(), {
  orientation: 'vertical',
})
const context = useScrollAreaContext('ScrollAreaScrollbar')

watchEffect((onCleanup) => {
  const isHorizontal = props.orientation === 'horizontal'

  if (isHorizontal)
    context.onScrollbarXEnabledChange(true)
  else
    context.onScrollbarYEnabledChange(true)

  onCleanup(() => {
    if (isHorizontal)
      context.onScrollbarXEnabledChange(false)
    else
      context.onScrollbarYEnabledChange(false)
  })
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
