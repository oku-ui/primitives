import type { PropType } from 'vue'
import type { Sizes } from './scroll-area'
import type { ScrollAreaScrollbarImplElement, ScrollAreaScrollbarImplNaviteElement, ScrollAreaScrollbarImplPrivateProps, ScrollAreaScrollbarImplProps } from './scroll-area-scrollbar-impl'
import type { ScrollAreaThumbElement } from './scroll-area-thumb'

export type ScrollAreaScrollbarAxisNaviteElement = ScrollAreaScrollbarImplNaviteElement
export type ScrollAreaScrollbarAxisElement = ScrollAreaScrollbarImplElement

export interface ScrollAreaScrollbarAxisProps extends Omit<ScrollAreaScrollbarImplProps, keyof ScrollAreaScrollbarImplPrivateProps>, ScrollAreaScrollbarAxisPrivateProps { }

export type ScrollAreaScrollbarAxisPrivateProps = {
  hasThumb: boolean
  sizes: Sizes
  onSizesChange(sizes: Sizes): void
  onThumbChange(thumb: ScrollAreaThumbElement | null): void
  onThumbPointerDown(pointerPos: number): void
  onThumbPointerUp(): void
  onThumbPositionChange(): void
  onWheelScroll(scrollPos: number): void
  onDragScroll(pointerPos: number): void
}

export const scrollAreaScrollbarAxisProps = {
  props: {
    hasThumb: {
      type: Boolean,
    },
    sizes: {
      type: Object as PropType<Sizes>,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    sizesChange: (sizes: Sizes) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    thumbChange: (thumb: ScrollAreaThumbElement | null) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    thumbPointerDown: (pointerPos: number) => true,
    thumbPointerUp: () => true,
    thumbPositionChange: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    wheelScroll: (scrollPos: number) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    dragScroll: (pointerPos: number) => true,
  },
}
