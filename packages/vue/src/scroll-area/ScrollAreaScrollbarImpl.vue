<script setup lang="ts">
import { computed, shallowRef, watchEffect } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { usePrimitiveElement } from '@oku-ui/use-composable'
import { useScrollAreaContext } from './ScrollArea'
import type { ScrollAreaScrollbarImplEmits, ScrollAreaScrollbarImplProps } from './ScrollAreaScrollbarImpl'
import { provideScrollbarContext } from './ScrollAreaScrollbarImpl'
import type { ScrollAreaScrollbarElement } from './types'
import { useDebounceCallback } from './utils'
import { SCROLL_AREA_SCROLLBAR_IMPL_NAME, SCROLL_AREA_SCROLLBAR_NAME } from './constants'
import { useResizeObserver } from '@vueuse/core'

defineOptions({
  name: SCROLL_AREA_SCROLLBAR_IMPL_NAME,
})

const props = defineProps<ScrollAreaScrollbarImplProps>()
const emit = defineEmits<ScrollAreaScrollbarImplEmits>()

const context = useScrollAreaContext(SCROLL_AREA_SCROLLBAR_NAME, props.scopeOkuScrollArea)

const [scrollbar, setScrollbar] = usePrimitiveElement<ScrollAreaScrollbarElement>(node => scrollbar.value = node)

const rectRef = shallowRef()
const prevWebkitUserSelectRef = shallowRef('')
const maxScrollPos = computed(() => props.sizes.content - props.sizes.viewport)

const handleWheelScroll = (event: WheelEvent, maxScrollPos: number) => emit('wheelScroll', event, maxScrollPos)
const handleThumbPositionChange = () => emit('thumbPositionChange')
const handleResize = useDebounceCallback(() => emit('resize'), 10)

function handleDragScroll(event: PointerEvent) {
  if (rectRef.value) {
    const x = event.clientX - rectRef.value.left
    const y = event.clientY - rectRef.value.top
    emit('dragScroll', ({ x, y }))
  }
}

/**
 * We bind wheel event imperatively so we can switch off passive
 * mode for document wheel event to allow it to be prevented
 */
watchEffect((onInvalidate) => {
  const handleWheel = (event: WheelEvent) => {
    const element = event.target as HTMLElement
    const isScrollbarWheel = scrollbar.value?.contains(element)

    if (isScrollbarWheel)
      handleWheelScroll(event, maxScrollPos.value)
  }

  document.addEventListener('wheel', handleWheel, { passive: false })

  onInvalidate(() => {
    document.removeEventListener('wheel', handleWheel, { passive: false } as any)
  })
})

/**
 * Update thumb position on sizes change
 */
watchEffect(() => {
  handleThumbPositionChange()
})

useResizeObserver(scrollbar, handleResize)
useResizeObserver(context.content, handleResize)

provideScrollbarContext({
  scope: props.scopeOkuScrollArea,
  scrollbar,
  hasThumb: computed(() => props.hasThumb || false),
  onThumbChange: thumb => emit('thumbChange', thumb),
  onThumbPointerUp: () => emit('thumbPointerUp'),
  onThumbPositionChange: () => handleThumbPositionChange(),
  onThumbPointerDown: pointerPos => emit('thumbPointerDown', pointerPos),
})

const handlePointerDown = composeEventHandlers<ScrollAreaScrollbarImplEmits['pointerdown'][0]>((event) => {
  emit('pointerdown', event)
}, (event) => {
  const mainPointer = 0
  if (event.button === mainPointer) {
    const element = event.target as HTMLElement
    element.setPointerCapture(event.pointerId)
    rectRef.value = scrollbar.value!.getBoundingClientRect()
    // pointer capture doesn't prevent text selection in Safari
    // so we remove text selection manually when scrolling
    prevWebkitUserSelectRef.value = document.body.style.webkitUserSelect
    document.body.style.webkitUserSelect = 'none'
    if (context.viewport.value)
      context.viewport.value.style.scrollBehavior = 'auto'
    handleDragScroll(event)
  }
})

const handlePointerMove = composeEventHandlers<ScrollAreaScrollbarImplEmits['pointermove'][0]>((event) => {
  emit('pointermove', event)
}, handleDragScroll)

const handlePointerUp = composeEventHandlers<ScrollAreaScrollbarImplEmits['pointerup'][0]>((event) => {
  emit('pointerup', event)
}, (event) => {
  const element = event.target as HTMLElement
  if (element.hasPointerCapture(event.pointerId))
    element.releasePointerCapture(event.pointerId)

  document.body.style.webkitUserSelect = prevWebkitUserSelectRef.value
  if (context.viewport.value)
    context.viewport.value.style.scrollBehavior = ''
  rectRef.value = null
})
</script>

<template>
  <Primitive
    :is="is"
    :ref="setScrollbar"
    :as-child="asChild"
    style="position: absolute"
    data-scrollbarimpl
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerUp"
  >
    <slot />
  </Primitive>
</template>
