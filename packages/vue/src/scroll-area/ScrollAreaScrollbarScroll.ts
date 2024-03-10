import type { ScrollAreaScrollbarVisibleProps } from './ScrollAreaScrollbarVisible'

// Props

export interface ScrollAreaScrollbarScrollProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true
}

// Emits

export type ScrollAreaScrollbarScrollEmits = {
  pointerenter: [event: PointerEvent]
  pointerleave: [event: PointerEvent]
}
