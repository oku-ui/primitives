<script setup lang="ts">
import { shallowRef } from 'vue'
import { useDirection } from '../direction/index.ts'
import { Primitive } from '../primitive/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import {
  type ScrollAreaElement,
  type ScrollAreaRootProps,
  type ScrollAreaScrollbarElement,
  type ScrollAreaViewportElement,
  provideScrollAreaContext,
} from './ScrollAreaRoot.ts'

defineOptions({
  name: 'ScrollAreaRoot',
})

const props = withDefaults(defineProps<ScrollAreaRootProps>(), {
  type: 'hover',
  scrollHideDelay: 600,
})

const scrollArea = shallowRef<ScrollAreaElement>()
const forwardElement = useForwardElement(scrollArea)
const viewport = shallowRef<ScrollAreaViewportElement>()
const content = shallowRef<HTMLDivElement>()
const scrollbarX = shallowRef<ScrollAreaScrollbarElement>()
const scrollbarY = shallowRef<ScrollAreaScrollbarElement>()
const cornerWidth = shallowRef(0)
const cornerHeight = shallowRef(0)
const scrollbarXEnabled = shallowRef(false)
const scrollbarYEnabled = shallowRef(false)

const direction = useDirection(() => props.dir)

provideScrollAreaContext({
  type() {
    return props.type
  },
  dir: direction,
  scrollHideDelay() {
    return props.scrollHideDelay
  },
  scrollArea,
  viewport,
  content,
  scrollbarX,
  scrollbarXEnabled,
  onScrollbarXEnabledChange(rendered) {
    scrollbarXEnabled.value = rendered
  },
  scrollbarY,
  scrollbarYEnabled,
  onScrollbarYEnabledChange(rendered) {
    scrollbarYEnabled.value = rendered
  },
  onCornerWidthChange(width) {
    cornerWidth.value = width
  },
  onCornerHeightChange(height) {
    cornerHeight.value = height
  },
})
</script>

<template>
  <Primitive
    :ref="forwardElement"
    :dir="direction"
    :style="{
      'position': 'relative',
      // Pass corner sizes as CSS vars to reduce re-renders of context consumers
      '--radix-scroll-area-corner-width': `${cornerWidth}px`,
      '--radix-scroll-area-corner-height': `${cornerHeight}px`,
    }"
  >
    <slot />
  </Primitive>
</template>
