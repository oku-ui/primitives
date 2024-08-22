<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue'
import { forwardRef } from '../utils/vue.ts'
import { useScrollAreaContext } from './ScrollArea.ts'
import type { ScrollAreaScrollbarProps } from './ScrollAreaScrollbar.ts'
import ScrollAreaScrollbarHover from './ScrollAreaScrollbarHover.vue'
import ScrollAreaScrollbarScroll from './ScrollAreaScrollbarScroll.vue'
import ScrollAreaScrollbarAuto from './ScrollAreaScrollbarAuto.vue'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'

defineOptions({
  name: 'ScrollAreaScrollbar',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ScrollAreaScrollbarProps>(), {
  orientation: 'vertical',
})
const $el = shallowRef<HTMLElement>()
const forwardedRef = forwardRef($el)

const context = useScrollAreaContext('ScrollAreaScrollbar')

watchEffect(() => {
  if (props.orientation === 'horizontal')
    context.onScrollbarXEnabledChange(true)
  else
    context.onScrollbarYEnabledChange(true)
})

defineExpose({
  $el,
})
</script>

<template>
  <ScrollAreaScrollbarHover
    v-if="context.type() === 'hover'"
    :ref="forwardedRef"
    :as="as"
    :as-child="asChild"
    :force-mount="forceMount"
    :orientation="orientation"
    v-bind="$attrs"
  >
    <slot />
  </ScrollAreaScrollbarHover>
  <ScrollAreaScrollbarScroll
    v-else-if="context.type() === 'scroll'"
    :ref="forwardedRef"
    :as="as"
    :as-child="asChild"
    :force-mount="forceMount"
    :orientation="orientation"
    v-bind="$attrs"
  >
    <slot />
  </ScrollAreaScrollbarScroll>
  <ScrollAreaScrollbarAuto
    v-else-if="context.type() === 'auto'"
    :ref="forwardedRef"
    :as="as"
    :as-child="asChild"
    :force-mount="forceMount"
    :orientation="orientation"
    v-bind="$attrs"
  >
    <slot />
  </ScrollAreaScrollbarAuto>
  <ScrollAreaScrollbarVisible
    v-else
    :ref="forwardedRef"
    :as="as"
    :as-child="asChild"
    :orientation="orientation"
    v-bind="$attrs"
  >
    <slot />
  </ScrollAreaScrollbarVisible>
</template>
