<script setup lang="ts">
import type { ScrollAreaScrollbarAutoProps } from './ScrollAreaScrollbarAuto'
import { OkuPresence } from '@oku-ui/presence'
import { usePrimitiveElement, useResizeObserver } from '@oku-ui/use-composable'
import { ref } from 'vue'
import { SCROLL_AREA_SCROLLBAR_AUTO_NAME, SCROLL_AREA_SCROLLBAR_NAME } from './constants'
import { useScrollAreaContext } from './ScrollArea'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'
import { useDebounceCallback } from './utils'

defineOptions({
  name: SCROLL_AREA_SCROLLBAR_AUTO_NAME,
  inheritAttrs: false,
})

const props = defineProps<ScrollAreaScrollbarAutoProps>()
const context = useScrollAreaContext(SCROLL_AREA_SCROLLBAR_NAME, props.scopeOkuScrollArea)

const visible = ref(false)

const isHorizontal = props.orientation === 'horizontal'

const handleResize = useDebounceCallback(() => {
  if (context.viewport.value) {
    const isOverflowX = context.viewport.value.offsetWidth < context.viewport.value.scrollWidth
    const isOverflowY = context.viewport.value.offsetHeight < context.viewport.value.scrollHeight

    visible.value = isHorizontal ? isOverflowX : isOverflowY
  }
}, 10)

useResizeObserver(context.viewport, handleResize)
useResizeObserver(context.content, handleResize)

const [$el, forwardRef] = usePrimitiveElement()

defineExpose({
  $el,
})
</script>

<template>
  <OkuPresence :present="undefined || visible">
    <ScrollAreaScrollbarVisible
      :is="is"
      :ref="forwardRef"
      :as-child="asChild"
      :data-state="visible ? 'visible' : 'hidden'"
      :orientation="orientation"
      v-bind="$attrs"
    >
      <slot />
    </ScrollAreaScrollbarVisible>
  </OkuPresence>
</template>
