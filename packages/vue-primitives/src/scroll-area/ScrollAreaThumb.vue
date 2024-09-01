<script setup lang="ts">
import { watchEffect } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { usePresence } from '../presence/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { Primitive } from '../primitive/index.ts'
import { useForwardElement } from '../hooks/index.ts'
import type { ScrollAreaThumbEmits, ScrollAreaThumbProps } from './ScrollAreaThumb.ts'
import { useScrollbarContext } from './ScrollAreaScrollbar.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'
import { addUnlinkedScrollListener } from './utils.ts'

defineOptions({
  name: 'ScrollAreaThumb',
})

const props = defineProps<ScrollAreaThumbProps>()
const emit = defineEmits<ScrollAreaThumbEmits>()

const scrollAreaContext = useScrollAreaContext('ScrollAreaThumb')
const scrollbarContext = useScrollbarContext('ScrollAreaThumb')
const forwardElement = useForwardElement(scrollbarContext.thumb)
const { onThumbPositionChange } = scrollbarContext

let removeUnlinkedScrollListener: (() => void) | undefined

const debounceScrollEnd = useDebounceFn(() => {
  if (!removeUnlinkedScrollListener)
    return

  removeUnlinkedScrollListener()
  removeUnlinkedScrollListener = undefined
}, 100)

watchEffect((onCleanup) => {
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
    if (!removeUnlinkedScrollListener) {
      const listener = addUnlinkedScrollListener(viewport!, onThumbPositionChange)
      removeUnlinkedScrollListener = listener
      onThumbPositionChange()
    }
  }

  onThumbPositionChange()
  viewport.addEventListener('scroll', handleScroll)

  onCleanup(() => {
    viewport.removeEventListener('scroll', handleScroll)
  })
})

const onPointerdownCapture = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerdownCapture', event)
}, (event) => {
  const thumb = event.target as HTMLElement
  const thumbRect = thumb.getBoundingClientRect()
  const x = event.clientX - thumbRect.left
  const y = event.clientY - thumbRect.top
  scrollbarContext.onThumbPointerDown({ x, y })
})

const onPointerup = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerup', event)
}, scrollbarContext.onThumbPointerUp)

const isPresent = usePresence(scrollbarContext.thumb, () => props.forceMount || scrollbarContext.hasThumb.value)
</script>

<template>
  <Primitive
    v-if="isPresent"
    :ref="forwardElement"
    :data-state="scrollbarContext.hasThumb.value ? 'visible' : 'hidden'"
    style="width: var(--radix-scroll-area-thumb-width); height: var(--radix-scroll-area-thumb-height)"
    @pointerdown.capture="onPointerdownCapture"
    @pointerup="onPointerup"
  >
    <slot />
  </Primitive>
</template>
