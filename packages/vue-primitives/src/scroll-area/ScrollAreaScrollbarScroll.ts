import type { ScrollAreaScrollbarVisibleProps } from './ScrollAreaScrollbarVisible.ts'

export interface ScrollAreaScrollbarScrollProps {
  orientation?: ScrollAreaScrollbarVisibleProps['orientation']
  forceMount?: true
}

export type ScrollAreaScrollbarScrollEmits = {
  pointerenter: [event: PointerEvent]
  pointerleave: [event: PointerEvent]
}
