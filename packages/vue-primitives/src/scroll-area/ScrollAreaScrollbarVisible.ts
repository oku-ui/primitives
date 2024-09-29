import { useDebounceFn, useResizeObserver } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import { type ElAttrs, mergeHooksAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'
import { provideScrollbarContext } from './ScrollAreaScrollbar.ts'
import { getScrollPositionFromPointer, getThumbOffsetFromScroll, getThumbRatio, getThumbSize, isScrollingWithinScrollbarBounds, toInt } from './utils.ts'

export interface ScrollAreaScrollbarVisibleProps {
  orientation?: 'horizontal' | 'vertical'
}

export interface Sizes {
  content: number
  viewport: number
  scrollbar: {
    size: number
    paddingStart: number
    paddingEnd: number
  }
}

export interface UseScrollAreaScrollbarVisibleProps {
  orientation?: 'horizontal' | 'vertical'
}

let wheelListeners: ((e: WheelEvent) => void)[] = []

function onDocumentWheel(event: WheelEvent) {
  for (const wheelListener of wheelListeners) {
    wheelListener(event)
  }
}

export function useScrollAreaScrollbarVisible(props: UseScrollAreaScrollbarVisibleProps): RadixPrimitiveReturns {
  const isHorizontal = props.orientation === 'horizontal'

  // VISIBLE
  const context = useScrollAreaContext('ScrollAreaScrollbarVisible')
  const scrollbar = isHorizontal ? context.scrollbarX : context.scrollbarY

  function setTemplateEl(templateEl: HTMLElement | undefined) {
    scrollbar.value = templateEl
  }

  const thumbRef = shallowRef<HTMLElement>()
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

  function onPointerdown(event: PointerEvent) {
    if (event.defaultPrevented)
      return

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
  }

  function onPointermove(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    handleDragScroll(event)
  }

  function onPointerup(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    const element = event.target as HTMLElement
    if (element.hasPointerCapture(event.pointerId))
      element.releasePointerCapture(event.pointerId)

    document.body.style.webkitUserSelect = prevWebkitUserSelect
    if (context.viewport)
      context.viewport.value!.style.scrollBehavior = ''

    rect = undefined
  }

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
    if (wheelListeners.length === 0)
      document.addEventListener('wheel', onDocumentWheel, { passive: false })
    wheelListeners.push(onImplWheelScroll)
  })

  onBeforeUnmount(() => {
    wheelListeners = wheelListeners.filter(i => i !== onImplWheelScroll)
    if (wheelListeners.length === 0)
      document.removeEventListener('wheel', onDocumentWheel)
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

  return {
    attrs(extraAttrs) {
      const attrs: ElAttrs = {
        'ref': setTemplateEl,
        'style': isHorizontal
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
            },
        'data-orientation': isHorizontal ? 'horizontal' : 'vertical',
        onPointerdown,
        onPointermove,
        onPointerup,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergeHooksAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
