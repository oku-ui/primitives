import type { ScrollAreaScrollbarVisibleProps } from './ScrollAreaScrollbarVisible.ts'

export interface ScrollAreaScrollbarScrollProps {
  orientation?: ScrollAreaScrollbarVisibleProps['orientation']
  forceMount?: true
}

// eslint-disable-next-line ts/consistent-type-definitions
export type ScrollAreaScrollbarScrollEmits = {
  pointerenter: [event: PointerEvent]
  pointerleave: [event: PointerEvent]
}
