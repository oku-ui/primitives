import type { RadixPrimitiveReturns } from '../shared/index.ts'
import { useDebounceFn } from '@vueuse/core'
import { onWatcherCleanup, watchEffect } from 'vue'
import { mergeHooksAttrs } from '../shared/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'
import { useScrollbarContext } from './ScrollAreaScrollbar.ts'
import { addUnlinkedScrollListener } from './utils.ts'

export function useScrollAreaThumbImpl(): RadixPrimitiveReturns {
  const scrollAreaContext = useScrollAreaContext('ScrollAreaThumb')
  const scrollbarContext = useScrollbarContext('ScrollAreaThumb')

  function forwardElement(nodeRef: HTMLElement | undefined) {
    scrollbarContext.thumb.value = nodeRef
  }

  let removeUnlinkedScrollListener: (() => void) | undefined

  const debounceScrollEnd = useDebounceFn(() => {
    if (!removeUnlinkedScrollListener)
      return

    removeUnlinkedScrollListener()
    removeUnlinkedScrollListener = undefined
  }, 100)

  watchEffect(() => {
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
        const listener = addUnlinkedScrollListener(viewport!, scrollbarContext.onThumbPositionChange)
        removeUnlinkedScrollListener = listener
        scrollbarContext.onThumbPositionChange()
      }
    }

    scrollbarContext.onThumbPositionChange()
    viewport.addEventListener('scroll', handleScroll)

    onWatcherCleanup(() => {
      viewport.removeEventListener('scroll', handleScroll)
    })
  })

  function onPointerdownCapture(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    const thumb = event.target as HTMLElement
    const thumbRect = thumb.getBoundingClientRect()
    const x = event.clientX - thumbRect.left
    const y = event.clientY - thumbRect.top
    scrollbarContext.onThumbPointerDown({ x, y })
  }

  function onPointerup(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    scrollbarContext.onThumbPointerUp()
  }

  return (extraAttrs) => {
    const attrs = {
      'ref': forwardElement,
      'data-state': scrollbarContext.hasThumb.value ? 'visible' : 'hidden',
      'style': 'width: var(--radix-scroll-area-thumb-width); height: var(--radix-scroll-area-thumb-height)',
      onPointerdownCapture,
      onPointerup,
    }

    if (extraAttrs)
      mergeHooksAttrs(attrs, extraAttrs)

    return attrs
  }
}
