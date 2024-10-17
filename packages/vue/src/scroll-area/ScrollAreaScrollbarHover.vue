<script setup lang="ts">
import type { ScrollAreaScrollbarHoverProps } from './ScrollAreaScrollbarHover'
import { OkuPresence } from '@oku-ui/presence'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { ref, watchEffect } from 'vue'
import { SCROLL_AREA_SCROLLBAR_HOVER, SCROLL_AREA_SCROLLBAR_NAME } from './constants'
import { useScrollAreaContext } from './ScrollArea'
import ScrollAreaScrollbarAuto from './ScrollAreaScrollbarAuto.vue'

defineOptions({
  name: SCROLL_AREA_SCROLLBAR_HOVER,
  inheritAttrs: false,
})

const props = defineProps<ScrollAreaScrollbarHoverProps>()

const context = useScrollAreaContext(SCROLL_AREA_SCROLLBAR_NAME, props.scopeOkuScrollArea)
const visible = ref(false)

watchEffect((onInvalidate) => {
  const scrollArea = context.scrollArea.value
  let hideTimer = 0

  if (scrollArea) {
    function handlePointerEnter() {
      window.clearTimeout(hideTimer)
      visible.value = true
    }

    function handlePointerLeave() {
      hideTimer = window.setTimeout(() => visible.value = false, context.scrollHideDelay.value)
    }

    scrollArea.addEventListener('pointerenter', handlePointerEnter)
    scrollArea.addEventListener('pointerleave', handlePointerLeave)

    onInvalidate(() => {
      window.clearTimeout(hideTimer)
      scrollArea.removeEventListener('pointerenter', handlePointerEnter)
      scrollArea.removeEventListener('pointerleave', handlePointerLeave)
    })
  }
})

const [$el, forwardRef] = usePrimitiveElement()

defineExpose({
  $el,
})
</script>

<template>
  <OkuPresence :present="forceMount || visible">
    <ScrollAreaScrollbarAuto
      :is="is"
      :ref="forwardRef"
      :as-child="asChild"
      :data-state="visible ? 'visible' : 'hidden'"
      :orientation="orientation"
      v-bind="$attrs"
    >
      <slot />
    </ScrollAreaScrollbarAuto>
  </OkuPresence>
</template>
