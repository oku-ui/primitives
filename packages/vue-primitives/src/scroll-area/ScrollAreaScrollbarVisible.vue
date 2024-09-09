<script setup lang="ts">
import { useDebounceFn, useResizeObserver } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import { useForwardElement } from '../hooks/index.ts'
import { Primitive } from '../primitive/index.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'
import { provideScrollbarContext, type ScrollAreaThumbElement } from './ScrollAreaScrollbar.ts'
import { getScrollPositionFromPointer, getThumbOffsetFromScroll, getThumbRatio, getThumbSize, isScrollingWithinScrollbarBounds, toInt } from './utils.ts'
import type { ScrollAreaScrollbarVisibleEmits, ScrollAreaScrollbarVisibleProps, Sizes } from './ScrollAreaScrollbarVisible.ts'

defineOptions({
  name: 'ScrollAreaScrollbarVisible',
})

const props = withDefaults(defineProps<ScrollAreaScrollbarVisibleProps>(), {
  orientation: 'vertical',
})
const emit = defineEmits<ScrollAreaScrollbarVisibleEmits>()

const isHorizontal = props.orientation === 'horizontal'

// VISIBLE
const context = useScrollAreaContext('ScrollAreaScrollbarVisible')

const forwardElement = useForwardElement(isHorizontal ? context.scrollbarX : context.scrollbarY)

const thumbRef = shallowRef<ScrollAreaThumbElement>()
let pointerOffset = 0
const sizes = shallowRef<Sizes>({
  content: 0,
  viewport: 0,
  scrollbar: {
    size: 0,
    paddingStart: 0,
    paddingEnd: 0,
  },
})

const hasThumb = computed(() => {
  const thumbRatio = getThumbRatio(sizes.value.viewport, sizes.value.content)
  return Boolean(thumbRatio > 0 && thumbRatio < 1)
})

// VISIBLE::END

// IMPLEMENTATION
const scrollbar = isHorizontal ? context.scrollbarX : context.scrollbarY
let rect: DOMRect | undefined
let prevWebkitUserSelect = ''

function handleDragScroll(event: PointerEvent) {
  if (!rect)
    return

  // VISIBLE
  const viewport = context.viewport.value
  if (!viewport)
    return

  if (isHorizontal) {
    viewport.scrollLeft = getScrollPositionFromPointer(
      event.clientX - rect.left,
      pointerOffset,
      sizes.value,
      context.dir.value,
    )
  }
  else {
    viewport.scrollTop = getScrollPositionFromPointer(
      event.clientY - rect.top,
      pointerOffset,
      sizes.value,
    )
  }
  // VISIBLE::END
}

const onPointerdown = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerdown', event)
}, (event) => {
  const mainPointer = 0
  if (event.button !== mainPointer)
    return

  const element = event.target as HTMLElement
  element.setPointerCapture(event.pointerId)
  rect = scrollbar.value!.getBoundingClientRect()

  // pointer capture doesn't prevent text selection in Safari
  // so we remove text selection manually when scrolling
  prevWebkitUserSelect = document.body.style.webkitUserSelect
  document.body.style.webkitUserSelect = 'none'
  if (context.viewport)
    context.viewport.value!.style.scrollBehavior = 'auto'

  handleDragScroll(event)
})

const onPointermove = composeEventHandlers<PointerEvent>((event) => {
  emit('pointermove', event)
}, (event: PointerEvent) => {
  handleDragScroll(event)
})

const onPointerup = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerup', event)
}, (event: PointerEvent) => {
  const element = event.target as HTMLElement
  if (element.hasPointerCapture(event.pointerId))
    element.releasePointerCapture(event.pointerId)

  document.body.style.webkitUserSelect = prevWebkitUserSelect
  if (context.viewport)
    context.viewport.value!.style.scrollBehavior = ''

  rect = undefined
})

function onImplWheelScroll(event: WheelEvent) {
  const isScrollbarWheel = scrollbar.value?.contains(event.target as HTMLElement)
  if (!isScrollbarWheel)
    return

  // AXIS
  const viewport = context.viewport.value
  if (!viewport)
    return

  const maxScrollPos = sizes.value.content - sizes.value.viewport

  if (isHorizontal) {
    const scrollPos = viewport.scrollLeft + event.deltaY
    // VISIBLE
    viewport.scrollLeft = scrollPos
    // VISIBLE::END
    // prevent window scroll when wheeling on scrollbar
    if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos))
      event.preventDefault()
  }
  else {
    const scrollPos = viewport.scrollTop + event.deltaY
    // VISIBLE
    viewport.scrollTop = scrollPos
    // VISIBLE::END
    // prevent window scroll when wheeling on scrollbar
    if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos))
      event.preventDefault()
  }
  // AXIS::END
}

onMounted(() => {
  document.addEventListener('wheel', onImplWheelScroll, {
    passive: false,
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('wheel', onImplWheelScroll)
})

/**
 * Update thumb position on sizes change
 */
watch(sizes, onThumbPositionChange)

function onThumbPositionChange() {
  // AXIS
  const viewport = context.viewport.value
  const thumb = thumbRef.value
  if (!viewport || !thumb)
    return

  if (isHorizontal)
    thumb.style.transform = `translate3d(${getThumbOffsetFromScroll(viewport.scrollLeft, sizes.value, context.dir.value)}px, 0, 0)`
  else
    thumb.style.transform = `translate3d(0, ${getThumbOffsetFromScroll(viewport.scrollTop, sizes.value)}px, 0)`
  // AXIS::END
}

function onResize() {
  const viewportEl = context.viewport.value
  const scrollbarEl = scrollbar.value
  if (!scrollbarEl || !viewportEl)
    return

  if (isHorizontal) {
    sizes.value = {
      content: viewportEl.scrollWidth ?? 0,
      viewport: viewportEl.offsetWidth ?? 0,
      scrollbar: {
        size: scrollbarEl.clientWidth ?? 0,
        paddingStart: toInt(getComputedStyle(scrollbarEl).paddingLeft),
        paddingEnd: toInt(getComputedStyle(scrollbarEl).paddingRight),
      },
    }
  }
  else {
    sizes.value = {
      content: viewportEl.scrollHeight ?? 0,
      viewport: viewportEl.offsetHeight ?? 0,
      scrollbar: {
        size: scrollbarEl.clientHeight ?? 0,
        paddingStart: toInt(getComputedStyle(scrollbarEl).paddingLeft),
        paddingEnd: toInt(getComputedStyle(scrollbarEl).paddingRight),
      },
    }
  }
}

const handleResize = useDebounceFn(onResize, 10)

useResizeObserver([context.scrollbarX, context.scrollbarY], handleResize)
useResizeObserver(context.content, handleResize)

provideScrollbarContext({
  hasThumb,
  thumb: thumbRef,
  onThumbPointerUp() {
    pointerOffset = 0
  },
  onThumbPositionChange,
  onThumbPointerDown(payload) {
    if (isHorizontal)
      pointerOffset = payload.x
    else
      pointerOffset = payload.y
  },
})
// IMPLEMENTATION::END

function CompStyles() {
  return isHorizontal
    ? {
        'position': 'absolute',
        'bottom': 0,
        'left': context.dir.value === 'rtl' ? 'var(--radix-scroll-area-corner-width)' : 0,
        'right': context.dir.value === 'ltr' ? 'var(--radix-scroll-area-corner-width)' : 0,
        '--radix-scroll-area-thumb-width': `${getThumbSize(sizes.value)}px`,
      }
    : {
        'position': 'absolute',
        'top': 0,
        'right': context.dir.value === 'ltr' ? 0 : undefined,
        'left': context.dir.value === 'rtl' ? 0 : undefined,
        'bottom': 'var(--radix-scroll-area-corner-height)',
        '--radix-scroll-area-thumb-height': `${getThumbSize(sizes.value)}px`,
      }
}
</script>

<template>
  <Primitive
    :ref="forwardElement"
    :style="CompStyles()"
    data-scrollbarimpl
    :data-orientation="isHorizontal ? 'horizontal' : 'vertical'"
    @pointerdown="onPointerdown"
    @pointermove="onPointermove"
    @pointerup="onPointerup"
  >
    <slot />
  </Primitive>
</template>
