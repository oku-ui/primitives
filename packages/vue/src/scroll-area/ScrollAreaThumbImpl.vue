<script setup lang="ts">
import type { ScrollAreaThumbImplEmits, ScrollAreaThumbImplProps } from './ScrollAreaThumbImpl'
import type { ScrollAreaThumbElement } from './types'
import { Primitive } from '@oku-ui/primitive'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { ref, watchEffect } from 'vue'
import { SCROLL_AREA_THUMB_IMPL_NAME, SCROLL_AREA_THUMB_NAME } from './constants'
import { useScrollAreaContext } from './ScrollArea'
import { useScrollbarContext } from './ScrollAreaScrollbarImpl'
import { addUnlinkedScrollListener, useDebounceCallback } from './utils'

defineOptions({
  name: SCROLL_AREA_THUMB_IMPL_NAME,
})

const props = defineProps<ScrollAreaThumbImplProps>()
const emit = defineEmits<ScrollAreaThumbImplEmits>()

const scrollAreaContext = useScrollAreaContext(SCROLL_AREA_THUMB_NAME, props.scopeOkuScrollArea)
const scrollbarContext = useScrollbarContext(SCROLL_AREA_THUMB_NAME, props.scopeOkuScrollArea)

const { onThumbPositionChange } = scrollbarContext
const [$el, forwardRef] = usePrimitiveElement<ScrollAreaThumbElement>(el => scrollbarContext.onThumbChange(el))
const removeUnlinkedScrollListenerRef = ref<() => void>()
const debounceScrollEnd = useDebounceCallback(() => {
  if (removeUnlinkedScrollListenerRef.value) {
    removeUnlinkedScrollListenerRef.value()
    removeUnlinkedScrollListenerRef.value = undefined
  }
}, 100)

watchEffect((onInvalidate) => {
  const viewport = scrollAreaContext.viewport.value

  if (!viewport)
    return

  /**
   * We only bind to native scroll event so we know when scroll starts and ends.
   * When scroll starts we start a requestAnimationFrame loop that checks for
   * changes to scroll position. That rAF loop triggers our thumb position change
   * when relevant to avoid scroll-linked effects. We cancel the loop when scroll ends.
   * https://developer.mozilla.org/en-US/docs/Mozilla/Performance/Scroll-linked_effects
   */
  function handleScroll() {
    debounceScrollEnd()
    if (!removeUnlinkedScrollListenerRef.value) {
      const listener = addUnlinkedScrollListener(viewport!, onThumbPositionChange)
      removeUnlinkedScrollListenerRef.value = listener
      onThumbPositionChange()
    }
  }

  onThumbPositionChange()
  viewport.addEventListener('scroll', handleScroll)

  onInvalidate(() => viewport.removeEventListener('scroll', handleScroll))
})

const handlePointerdownCapture = composeEventHandlers<ScrollAreaThumbImplEmits['pointerdownCapture'][0]>((event) => {
  emit('pointerdownCapture', event)
}, (event) => {
  const thumb = event.target as HTMLElement
  const thumbRect = thumb.getBoundingClientRect()
  const x = event.clientX - thumbRect.left
  const y = event.clientY - thumbRect.top
  scrollbarContext.onThumbPointerDown({ x, y })
})

const handlePointerup = composeEventHandlers<ScrollAreaThumbImplEmits['pointerup'][0]>((event) => {
  emit('pointerup', event)
}, () => scrollbarContext.onThumbPointerUp())

defineExpose({
  $el,
})
</script>

<template>
  <Primitive
    :is="is"
    :ref="forwardRef"
    :as-child="asChild"
    :data-state="scrollbarContext.hasThumb.value ? 'visible' : 'hidden'"
    :style="{
      width: 'var(--oku-scroll-area-thumb-width)',
      height: 'var(--oku-scroll-area-thumb-height)',
    }"
    @pointerdown.capture="handlePointerdownCapture"
    @pointerup="handlePointerup"
  >
    <slot />
  </Primitive>
</template>
