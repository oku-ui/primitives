import { clamp } from '@Oku-ui/utils'
import { nextTick, onMounted, ref, watchEffect } from 'vue'
import { useCallbackRef } from '@oku-ui/use-composable'
import type { Direction, Sizes } from './scroll-area'

function toInt(value?: string) {
  return value ? Number.parseInt(value, 10) : 0
}

function getThumbRatio(viewportSize: number, contentSize: number) {
  const ratio = viewportSize / contentSize
  return Number.isNaN(ratio) ? 0 : ratio
}

function getThumbSize(sizes: Sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content)
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio
  // minimum of 18 matches macOS minimum
  return Math.max(thumbSize, 18)
}

function getScrollPositionFromPointer(
  pointerPos: number,
  pointerOffset: number,
  sizes: Sizes,
  dir: Direction = 'ltr',
) {
  const thumbSizePx = getThumbSize(sizes)
  const thumbCenter = thumbSizePx / 2
  const offset = pointerOffset || thumbCenter
  const thumbOffsetFromEnd = thumbSizePx - offset
  const minPointerPos = sizes.scrollbar.paddingStart + offset
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd
  const maxScrollPos = sizes.content - sizes.viewport
  const scrollRange = dir === 'ltr' ? [0, maxScrollPos] : [maxScrollPos * -1, 0]
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange as [number, number])
  return interpolate(pointerPos)
}

function getThumbOffsetFromScroll(scrollPos: number, sizes: Sizes, dir: Direction = 'ltr') {
  const thumbSizePx = getThumbSize(sizes)
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd
  const scrollbar = sizes.scrollbar.size - scrollbarPadding
  const maxScrollPos = sizes.content - sizes.viewport
  const maxThumbPos = scrollbar - thumbSizePx
  const scrollClampRange = dir === 'ltr' ? [0, maxScrollPos] : [maxScrollPos * -1, 0]
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange as [number, number])
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos])
  return interpolate(scrollWithoutMomentum)
}

// https://github.com/tmcw-up-for-adoption/simple-linear-scale/blob/master/index.js
function linearScale(input: readonly [number, number], output: readonly [number, number]) {
  return (value: number) => {
    if (input[0] === input[1] || output[0] === output[1])
      return output[0]
    const ratio = (output[1] - output[0]) / (input[1] - input[0])
    return output[0] + ratio * (value - input[0])
  }
}

function isScrollingWithinScrollbarBounds(scrollPos: number, maxScrollPos: number) {
  return scrollPos > 0 && scrollPos < maxScrollPos
}

// Custom scroll handler to avoid scroll-linked effects
// https://developer.mozilla.org/en-US/docs/Mozilla/Performance/Scroll-linked_effects
function addUnlinkedScrollListener(node: HTMLElement, handler = () => {}) {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop }
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop }
    const isHorizontalScroll = prevPosition.left !== position.left
    const isVerticalScroll = prevPosition.top !== position.top
    if (isHorizontalScroll || isVerticalScroll)
      handler()
    prevPosition = position
    rAF = window.requestAnimationFrame(loop)
  })()
  return () => window.cancelAnimationFrame(rAF)
}

function useDebounceCallback(callback: () => void, delay: number) {
  const handleCallback = useCallbackRef(callback)
  const debounceTimerRef = ref<number>(0)

  onMounted(() => {
    window.clearTimeout(debounceTimerRef.value)
  })

  return () => {
    window.clearTimeout(debounceTimerRef.value)
    debounceTimerRef.value = window.setTimeout(handleCallback.value, delay)
  }
}

function useResizeObserver(element: HTMLElement | null, onResize: () => void) {
  const handleResize = useCallbackRef(onResize)
  watchEffect((onInvalidate) => {
    nextTick()

    let rAF = 0
    if (element) {
      /**
       * Resize Observer will throw an often benign error that says `ResizeObserver loop
       * completed with undelivered notifications`. This means that ResizeObserver was not
       * able to deliver all observations within a single animation frame, so we use
       * `requestAnimationFrame` to ensure we don't deliver unnecessary observations.
       * Further reading: https://github.com/WICG/resize-observer/issues/38
       */
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF)
        rAF = window.requestAnimationFrame(handleResize.value)
      })
      resizeObserver.observe(element)

      onInvalidate(() => {
        window.cancelAnimationFrame(rAF)
        resizeObserver.unobserve(element)
      })
    }
  })
}

export { getThumbRatio, toInt, getThumbSize, getScrollPositionFromPointer, getThumbOffsetFromScroll, isScrollingWithinScrollbarBounds, addUnlinkedScrollListener, useDebounceCallback, useResizeObserver }
