import type { Ref } from 'vue'
import { createContext, type MutableRefObject, useRef } from '@oku-ui/hooks'
import { mergePrimitiveAttrs, type PrimitiveElAttrs, type RadixPrimitiveReturns } from '@oku-ui/shared'
import { useSelectContentContext } from './SelectContent'
import { CONTENT_MARGIN } from './SelectContentImpl'

export interface SelectViewportContext {
  contentWrapper: Ref<HTMLElement | undefined>
  shouldExpandOnScrollRef?: MutableRefObject<boolean>
  onScrollButtonChange: (node: HTMLElement | undefined) => void
}

export const [provideSelectViewportContext, useSelectViewportContext] = createContext<SelectViewportContext>('SelectViewport')

export function useSelectViewport(): RadixPrimitiveReturns {
  const contentContext = useSelectContentContext('SekectViewport')
  const viewportContext = useSelectViewportContext('SekectViewport')

  // TODO: Collection.Slot
  function setElRef(v: HTMLElement | undefined) {
    contentContext.viewport.value = v
  }

  const prevScrollTopRef = useRef(0)

  function onScroll(event: Event) {
    if (event.defaultPrevented)
      return
    const viewport = event.currentTarget! as HTMLElement
    const { shouldExpandOnScrollRef } = viewportContext
    const contentWrapper = viewportContext.contentWrapper.value

    if (shouldExpandOnScrollRef?.value && contentWrapper) {
      const scrolledBy = Math.abs(prevScrollTopRef.value - viewport.scrollTop)
      if (scrolledBy > 0) {
        const availableHeight = window.innerHeight - CONTENT_MARGIN * 2
        const cssMinHeight = Number.parseFloat(contentWrapper.style.minHeight)
        const cssHeight = Number.parseFloat(contentWrapper.style.height)
        const prevHeight = Math.max(cssMinHeight, cssHeight)

        if (prevHeight < availableHeight) {
          const nextHeight = prevHeight + scrolledBy
          const clampedNextHeight = Math.min(availableHeight, nextHeight)
          const heightDiff = nextHeight - clampedNextHeight

          contentWrapper.style.height = `${clampedNextHeight}px`
          if (contentWrapper.style.bottom === '0px') {
            viewport.scrollTop = heightDiff > 0 ? heightDiff : 0
            // ensure the content stays pinned to the bottom
            contentWrapper.style.justifyContent = 'flex-end'
          }
        }
      }
    }

    prevScrollTopRef.value = viewport.scrollTop
  }

  const style = {
    // we use position: 'relative' here on the `viewport` so that when we call
    // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
    // (independent of the scrollUpButton).
    position: 'relative',
    flex: 1,
    // Viewport should only be scrollable in the vertical direction.
    // This won't work in vertical writing modes, so we'll need to
    // revisit this if/when that is supported
    // https://developer.chrome.com/blog/vertical-form-controls
    overflow: 'hidden auto',
  } as const

  return {
    attrs(extraAttrs) {
      const attrs: PrimitiveElAttrs = {
        'elRef': setElRef,
        'data-radix-select-viewport': '',
        'role': 'presentation',
        style,
        onScroll,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
