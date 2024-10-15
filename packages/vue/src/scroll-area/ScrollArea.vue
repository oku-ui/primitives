<script setup lang="ts">
import { shallowRef, toRef } from 'vue'
import type { ScrollAreaProps } from './ScrollArea'
import type { ScrollAreaElement, ScrollAreaScrollbarElement, ScrollAreaViewportElement } from './types'
import { useDirection } from '@oku-ui/direction'
import { provideScrollAreaContext } from './ScrollArea'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { SCROLL_AREA_NAME } from './constants'
import { Primitive } from '@oku-ui/primitive'

defineOptions({
  name: SCROLL_AREA_NAME,
})

const props = withDefaults(defineProps<ScrollAreaProps>(), {
  type: 'hover',
  scrollHideDelay: 600,
})

const [scrollArea, setScrollArea] = usePrimitiveElement<ScrollAreaElement>()
const viewport = shallowRef<ScrollAreaViewportElement>()
const content = shallowRef<HTMLElement>()

const scrollbarX = shallowRef<ScrollAreaScrollbarElement>()
const scrollbarY = shallowRef<ScrollAreaScrollbarElement>()

const cornerWidth = shallowRef(0)
const cornerHeight = shallowRef(0)
const scrollbarXEnabled = shallowRef(false)
const scrollbarYEnabled = shallowRef(false)

const direction = useDirection(() => props.dir)

provideScrollAreaContext({
  scope: props.scopeOkuScrollArea,
  type: toRef(props, 'type'),
  dir: direction,
  scrollHideDelay: toRef(props, 'scrollHideDelay'),
  scrollArea,
  viewport,
  onViewportChange(payload) {
    viewport.value = payload
  },
  content,
  onContentChange(payload) {
    content.value = payload
  },
  scrollbarX,
  onScrollbarXChange(payload) {
    scrollbarX.value = payload
  },
  scrollbarXEnabled,
  onScrollbarXEnabledChange(payload) {
    scrollbarXEnabled.value = payload
  },
  scrollbarY,
  onScrollbarYChange(payload) {
    scrollbarY.value = payload
  },
  scrollbarYEnabled,
  onScrollbarYEnabledChange(payload) {
    scrollbarYEnabled.value = payload
  },
  onCornerWidthChange(payload) {
    cornerWidth.value = payload
  },
  onCornerHeightChange(payload) {
    cornerHeight.value = payload
  },
})
</script>

<template>
  <Primitive
    :is="is"
    :ref="setScrollArea"
    :as-child="asChild"
    :dir="direction"
    :style="{
      position: 'relative',
      // Pass corner sizes as CSS vars to reduce re-renders of context consumers
      ['--oku-scroll-area-corner-width']: `${cornerWidth}px`,
      ['--oku-scroll-area-corner-height']: `${cornerHeight}px`,
    }"
  >
    <slot />
  </Primitive>
</template>
