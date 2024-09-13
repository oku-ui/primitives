import type { Ref } from 'vue'
import type { ScrollAreaScrollbarVisibleProps } from './ScrollAreaScrollbarVisible.ts'
import { createContext } from '../hooks/index.ts'

export interface ScrollAreaScrollbarProps {
  orientation?: ScrollAreaScrollbarVisibleProps['orientation']
}

// type ScrollAreaScrollbarElement = HTMLDivElement
export type ScrollAreaThumbElement = HTMLDivElement

export interface ScrollbarContext {
  hasThumb: Ref<boolean>
  // scrollbar: Ref<ScrollAreaScrollbarElement | undefined>
  // onThumbChange: (thumb: ScrollAreaThumbElement | undefined) => void
  thumb: Ref<ScrollAreaThumbElement | undefined>
  onThumbPointerUp: () => void
  onThumbPointerDown: (pointerPos: { x: number, y: number }) => void
  onThumbPositionChange: () => void
}

export const [provideScrollbarContext, useScrollbarContext] = createContext<ScrollbarContext>('ScrollAreaScrollbar')
