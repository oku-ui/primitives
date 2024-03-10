import type { ScrollAreaScrollbarImplProps } from './ScrollAreaScrollbarImpl'
import type { ScrollAreaThumbElement, Sizes } from './types'

// Props

export interface ScrollAreaScrollbarAxisProps extends ScrollAreaScrollbarImplProps {

}

// Emits

export type ScrollAreaScrollbarAxisPrivateEmits = {
  sizesChange: [sizes: Sizes]
  thumbChange: [thumb: ScrollAreaThumbElement | undefined]
  thumbPointerDown: [pointerPos: number]
  thumbPointerUp: []
  thumbPositionChange: []
  wheelScroll: [scrollPos: number]
  dragScroll: [pointerPos: number]
}
