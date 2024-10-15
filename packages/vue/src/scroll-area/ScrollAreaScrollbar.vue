<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import ScrollAreaScrollbarHover from './ScrollAreaScrollbarHover.vue'
import ScrollAreaScrollbarScroll from './ScrollAreaScrollbarScroll.vue'
import ScrollAreaScrollbarAuto from './ScrollAreaScrollbarAuto.vue'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'
import { useScrollAreaContext } from './ScrollArea'
import type { ScrollAreaScrollbarProps } from './ScrollAreaScrollbar'
import { SCROLL_AREA_SCROLLBAR_NAME } from './constants'

defineOptions({
  name: SCROLL_AREA_SCROLLBAR_NAME,
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ScrollAreaScrollbarProps>(), {
  orientation: 'vertical',
})
const context = useScrollAreaContext(SCROLL_AREA_SCROLLBAR_NAME, props.scopeOkuScrollArea)
const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context
const isHorizontal = computed(() => props.orientation === 'horizontal')

watchEffect((onInvalidate) => {
  isHorizontal.value ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true)

  onInvalidate(() => {
    isHorizontal.value ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false)
  })
})

const [$el, forwardRef] = usePrimitiveElement()

defineExpose({
  $el,
})

</script>

<template>
  <ScrollAreaScrollbarHover
    :is="is"
    v-if="context.type.value === 'hover'"
    :ref="forwardRef"
    :as-child="asChild"
    :force-mount="forceMount"
    :orientation="orientation"
    v-bind="$attrs"
  >
    <slot />
  </ScrollAreaScrollbarHover>
  <ScrollAreaScrollbarScroll
    :is="is"
    v-else-if="context.type.value === 'scroll'"
    :ref="forwardRef"
    :as-child="asChild"
    :force-mount="forceMount"
    :orientation="orientation"
    v-bind="$attrs"
  >
    <slot />
  </ScrollAreaScrollbarScroll>
  <ScrollAreaScrollbarAuto
    :is="is"
    v-else-if="context.type.value === 'auto'"
    :ref="forwardRef"
    :as-child="asChild"
    :force-mount="forceMount"
    :orientation="orientation"
    v-bind="$attrs"
  >
    <slot />
  </ScrollAreaScrollbarAuto>
  <ScrollAreaScrollbarVisible
    :is="is"
    v-else
    :ref="forwardRef"
    :as-child="asChild"
    :orientation="orientation"
    v-bind="$attrs"
  >
    <slot />
  </ScrollAreaScrollbarVisible>
</template>
