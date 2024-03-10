<script setup lang="ts">
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { shallowRef, watchEffect } from 'vue'
import { useScrollAreaContext } from './ScrollArea'
import type { ScrollAreaScrollbarAxisPrivateEmits, ScrollAreaScrollbarAxisProps } from './ScrollAreaScrollbarAxis'
import { SCROLL_AREA_SCROLLBAR_NAME, SCROLL_AREA_SCROLLBAR_X } from './constants'
import type { ScrollAreaScrollbarAxisElement } from './types'
import ScrollAreaScrollbarImpl from './ScrollAreaScrollbarImpl.vue'
import { getThumbSize, isScrollingWithinScrollbarBounds, toInt } from './utils'

defineOptions({
  name: SCROLL_AREA_SCROLLBAR_X,
})

const props = defineProps<ScrollAreaScrollbarAxisProps>()
const emit = defineEmits<ScrollAreaScrollbarAxisPrivateEmits>()

const context = useScrollAreaContext(SCROLL_AREA_SCROLLBAR_NAME, props.scopeOkuScrollArea)
const computedStyle = shallowRef<CSSStyleDeclaration>()
const [scrollbarAxisRef, forwardRef] = usePrimitiveElement<ScrollAreaScrollbarAxisElement>(el => context.onScrollbarXChange(el))

watchEffect(() => {
  if (scrollbarAxisRef.value)
    computedStyle.value = getComputedStyle(scrollbarAxisRef.value)
})

function handleThumbPointerDown(event: { x: number }) {
  emit('thumbPointerDown', event.x)
}

function handleDragScroll(event: { x: number }) {
  emit('dragScroll', event.x)
}

function handleWheelScroll(event: WheelEvent, maxScrollPos: number) {
  if (context.viewport.value) {
    const scrollPos = context.viewport.value.scrollLeft + event.deltaX
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
      content: context.viewport.value.scrollWidth,
      viewport: context.viewport.value.offsetWidth,
      scrollbar: {
        size: scrollbarAxisRef.value.clientWidth,
        paddingStart: toInt(computedStyle.value.paddingLeft),
        paddingEnd: toInt(computedStyle.value.paddingRight),
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
    data-orientation="horizontal"
    :sizes="sizes"
    :has-thumb="hasThumb"
    :style="{
      bottom: '0px',
      left: context.dir.value === 'rtl' ? 'var(--oku-scroll-area-corner-width)' : '0px',
      right: context.dir.value === 'ltr' ? 'var(--oku-scroll-area-corner-width)' : '0px',
      ['--oku-scroll-area-thumb-width']: `${getThumbSize(sizes)}px`,
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
