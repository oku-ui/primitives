export interface ScrollAreaScrollbarVisibleProps {
  orientation?: 'horizontal' | 'vertical'
}

export type ScrollAreaScrollbarVisibleEmits = {
  pointerdown: [event: PointerEvent]
  pointermove: [event: PointerEvent]
  pointerup: [event: PointerEvent]
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
