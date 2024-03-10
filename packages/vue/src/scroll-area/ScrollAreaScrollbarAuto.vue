<script setup lang="ts">
import { ref } from 'vue'
import { OkuPresence } from '@oku-ui/presence'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { useScrollAreaContext } from './ScrollArea'
import type { ScrollAreaScrollbarAutoProps } from './ScrollAreaScrollbarAuto'
import { SCROLL_AREA_SCROLLBAR_AUTO_NAME, SCROLL_AREA_SCROLLBAR_NAME } from './constants'
import { useDebounceCallback, useResizeObserver } from './utils'
import ScrollAreaScrollbarVisible from './ScrollAreaScrollbarVisible.vue'

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

useResizeObserver(context.viewport.value, handleResize)
useResizeObserver(context.content.value, handleResize)

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
