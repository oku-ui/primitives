<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { useScrollAreaContext } from './ScrollArea'
import type { ScrollAreaScrollbarAxisPrivateEmits, ScrollAreaScrollbarAxisProps } from './ScrollAreaScrollbarAxis'
import { SCROLL_AREA_SCROLLBAR_NAME, SCROLL_AREA_SCROLLBAR_Y } from './constants'
import type { ScrollAreaScrollbarAxisElement } from './types'
import { getThumbSize, isScrollingWithinScrollbarBounds, toInt } from './utils'
import ScrollAreaScrollbarImpl from './ScrollAreaScrollbarImpl.vue'

defineOptions({
  name: SCROLL_AREA_SCROLLBAR_Y,
})

const props = defineProps<ScrollAreaScrollbarAxisProps>()
const emit = defineEmits<ScrollAreaScrollbarAxisPrivateEmits>()

const context = useScrollAreaContext(SCROLL_AREA_SCROLLBAR_NAME, props.scopeOkuScrollArea)
const computedStyle = shallowRef<CSSStyleDeclaration>()
const [scrollbarAxisRef, forwardRef] = usePrimitiveElement<ScrollAreaScrollbarAxisElement>(el => context.onScrollbarYChange(el))

watchEffect(() => {
  if (scrollbarAxisRef.value)
    computedStyle.value = getComputedStyle(scrollbarAxisRef.value)
})

function handleThumbPointerDown(event: { y: number }) {
  emit('thumbPointerDown', event.y)
}

function handleDragScroll(event: { y: number }) {
  emit('dragScroll', event.y)
}

function handleWheelScroll(event: WheelEvent, maxScrollPos: number) {
  if (context.viewport.value) {
    const scrollPos = context.viewport.value.scrollTop + event.deltaY
    emit('wheelScroll', scrollPos)
    // prevent window scroll when wheeling on scrollbar
    if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos))
      event.preventDefault()
  }
}

function handleThumbPositionChange() {
  emit('thumbPositionChange')
}

function handleThumbChange(thumb: ScrollAreaScrollbarAxisPrivateEmits['thumbChange'][0]) {
  emit('thumbChange', thumb)
}

function handleResize() {
  if (scrollbarAxisRef.value && context.viewport.value && computedStyle.value) {
    emit('sizesChange', {
      content: context.viewport.value.scrollHeight,
      viewport: context.viewport.value.offsetHeight,
      scrollbar: {
        size: scrollbarAxisRef.value.clientHeight,
        paddingStart: toInt(computedStyle.value.paddingTop),
        paddingEnd: toInt(computedStyle.value.paddingBottom),
      },
    })
  }
}

defineExpose({
  $el: scrollbarAxisRef,
})
</script>

<template>
  <ScrollAreaScrollbarImpl
    :is="is"
    :ref="forwardRef"
    :as-child="asChild"
    data-orientation="vertical"
    :sizes="sizes"
    :has-thumb="hasThumb"
    :style="{
      top: '0px',
      right: context.dir.value === 'ltr' ? '0px' : undefined,
      left: context.dir.value === 'rtl' ? '0px' : undefined,
      bottom: 'var(--oku-scroll-area-corner-height)',
      ['--oku-scroll-area-thumb-height']: `${getThumbSize(sizes)}px`,
    }"
    @thumb-pointer-down="handleThumbPointerDown"
    @drag-scroll="handleDragScroll"
    @wheel-scroll="handleWheelScroll"
    @thumb-position-change="handleThumbPositionChange"
    @thumb-change="handleThumbChange"
    @resize="handleResize"
  >
    <slot />
  </ScrollAreaScrollbarImpl>
</template>
