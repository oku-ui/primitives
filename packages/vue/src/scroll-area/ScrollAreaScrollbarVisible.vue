<script setup lang="ts">
import type { ScrollAreaScrollbarVisibleProps } from './ScrollAreaScrollbarVisible'
import type { Direction, ScrollAreaThumbElement, Sizes } from './types'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { computed, reactive, ref, shallowRef } from 'vue'
import { SCROLL_AREA_SCROLLBAR_NAME, SCROLL_AREA_SCROLLBAR_VISIBLE_NAME } from './constants'
import { useScrollAreaContext } from './ScrollArea'
import ScrollAreaScrollbarX from './ScrollAreaScrollbarX.vue'
import ScrollAreaScrollbarY from './ScrollAreaScrollbarY.vue'
import { getScrollPositionFromPointer, getThumbOffsetFromScroll, getThumbRatio } from './utils'

defineOptions({
  name: SCROLL_AREA_SCROLLBAR_VISIBLE_NAME,
  inheritAttrs: false,
})

const props = defineProps<ScrollAreaScrollbarVisibleProps>()

const context = useScrollAreaContext(SCROLL_AREA_SCROLLBAR_NAME, props.scopeOkuScrollArea)
const thumbRef = shallowRef<ScrollAreaThumbElement>()
const pointerOffsetRef = ref(0)
const sizes = reactive<Sizes>({
  content: 0,
  viewport: 0,
  scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
})

const thumbRatio = computed(() => getThumbRatio(sizes.viewport, sizes.content))

function getScrollPosition(pointerPos: number, dir?: Direction) {
  return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.value, sizes, dir)
}

function handleSizesChange(newSizes: Sizes) {
  sizes.content = newSizes.content
  sizes.viewport = newSizes.viewport
  sizes.scrollbar = newSizes.scrollbar
}

const hasThumb = computed(() => Boolean(thumbRatio.value > 0 && thumbRatio.value < 1))

function handleThumbChange(thumb: ScrollAreaThumbElement | undefined) {
  thumbRef.value = thumb
}

function handleThumbPointerUp() {
  pointerOffsetRef.value = 0
}

function handleThumbPointerDown(pointerPos: number) {
  pointerOffsetRef.value = pointerPos
}

function handleThumbPositionChangeX() {
  if (context.viewport.value && thumbRef.value) {
    const scrollPos = context.viewport.value.scrollLeft
    const offset = getThumbOffsetFromScroll(scrollPos, sizes, context.dir.value)
    thumbRef.value.style.transform = `translate3d(${offset}px, 0, 0)`
  }
}

function handleThumbPositionChangeY() {
  if (context.viewport.value && thumbRef.value) {
    const scrollPos = context.viewport.value.scrollTop
    const offset = getThumbOffsetFromScroll(scrollPos, sizes)
    thumbRef.value.style.transform = `translate3d(0, ${offset}px, 0)`
  }
}

function handleWheelScrollX(scrollPos: number) {
  if (context.viewport.value)
    context.viewport.value.scrollLeft = scrollPos
}

function handleWheelScrollY(scrollPos: number) {
  if (context.viewport.value)
    context.viewport.value.scrollTop = scrollPos
}

function handleDragScrollX(pointerPos: number) {
  if (context.viewport.value)
    context.viewport.value.scrollLeft = getScrollPosition(pointerPos, context.dir.value)
}

function handleDragScrollY(pointerPos: number) {
  if (context.viewport.value)
    context.viewport.value.scrollTop = getScrollPosition(pointerPos)
}

const [$el, forwardRef] = usePrimitiveElement()

defineExpose({
  $el,
})
</script>

<template>
  <ScrollAreaScrollbarX
    v-if="orientation === 'horizontal'"
    :ref="forwardRef"
    :sizes="sizes"
    :has-thumb="hasThumb"
    v-bind="$attrs"
    @sizes-change="handleSizesChange"
    @thumb-change="handleThumbChange"
    @thumb-pointer-up="handleThumbPointerUp"
    @thumb-pointer-down="handleThumbPointerDown"
    @thumb-position-change="handleThumbPositionChangeX"
    @wheel-scroll="handleWheelScrollX"
    @drag-scroll="handleDragScrollX"
  >
    <slot />
  </ScrollAreaScrollbarX>
  <ScrollAreaScrollbarY
    v-else
    :ref="forwardRef"
    :sizes="sizes"
    :has-thumb="hasThumb"
    v-bind="$attrs"
    @sizes-change="handleSizesChange"
    @thumb-change="handleThumbChange"
    @thumb-pointer-up="handleThumbPointerUp"
    @thumb-pointer-down="handleThumbPointerDown"
    @thumb-position-change="handleThumbPositionChangeY"
    @wheel-scroll="handleWheelScrollY"
    @drag-scroll="handleDragScrollY"
  >
    <slot />
  </ScrollAreaScrollbarY>
</template>
