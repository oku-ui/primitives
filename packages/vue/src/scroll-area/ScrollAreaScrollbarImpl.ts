import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Ref } from 'vue'
import type { ScrollAreaScopeProps, ScrollAreaScrollbarElement, ScrollAreaThumbElement, Sizes } from './types'
import { createScrollAreaContext } from './ScrollArea'
import { SCROLL_AREA_SCROLLBAR_NAME } from './constants'

// Props

export interface ScrollAreaScrollbarImplProps extends PrimitiveProps, ScrollAreaScopeProps {
  sizes: Sizes
  hasThumb: boolean
}

// Emits

export type ScrollAreaScrollbarImplPrivateEmits = {
  thumbChange: [thumb: ScrollAreaThumbElement | undefined]
  thumbPointerUp: []
  thumbPointerDown: [pointerPos: { x: number, y: number }]
  thumbPositionChange: []
  wheelScroll: [event: WheelEvent, maxScrollPos: number]
  dragScroll: [pointerPos: { x: number, y: number }]
  resize: []
}

export type ScrollAreaScrollbarImplEmits = {
  pointerup: [event: PointerEvent]
  pointermove: [event: PointerEvent]
  pointerdown: [event: PointerEvent]
} & ScrollAreaScrollbarImplPrivateEmits

// Context

export interface ScrollbarContext {
  hasThumb: Ref<boolean>
  scrollbar: Ref<ScrollAreaScrollbarElement | undefined>
  onThumbChange: (thumb: ScrollAreaThumbElement | undefined) => void
  onThumbPointerUp: () => void
  onThumbPointerDown: (pointerPos: { x: number, y: number }) => void
  onThumbPositionChange: () => void
}

export const [provideScrollbarContext, useScrollbarContext] = createScrollAreaContext<ScrollbarContext>(SCROLL_AREA_SCROLLBAR_NAME)
