export interface ScrollAreaScrollbarVisibleProps {
  orientation?: 'horizontal' | 'vertical'
}

// eslint-disable-next-line ts/consistent-type-definitions
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
