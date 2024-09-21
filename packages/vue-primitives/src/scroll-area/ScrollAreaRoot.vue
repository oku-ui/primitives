<script setup lang="ts">
import { useForwardElement } from '@oku-ui/hooks'
import { Primitive } from '@oku-ui/primitive'
import { shallowRef } from 'vue'
import { useDirection } from '../direction/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { provideScrollAreaContext, type ScrollAreaRootProps } from './ScrollAreaRoot.ts'

defineOptions({
  name: 'ScrollAreaRoot',
})

const props = withDefaults(defineProps<ScrollAreaRootProps>(), {
  type: 'hover',
  scrollHideDelay: 600,
})

const scrollArea = shallowRef<HTMLElement>()
const forwardElement = useForwardElement(scrollArea)
const viewport = shallowRef<HTMLElement>()
const content = shallowRef<HTMLDivElement>()
const scrollbarX = shallowRef<HTMLElement>()
const scrollbarY = shallowRef<HTMLElement>()
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
  scrollHideDelay: props.scrollHideDelay,
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
