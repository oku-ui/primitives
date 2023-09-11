import type { PropType } from 'vue'
import { propsOmit } from '@oku-ui/primitive'
import type { Sizes } from './scroll-area'
import { type ScrollAreaScrollbarImplElement, type ScrollAreaScrollbarImplNaviteElement, type ScrollAreaScrollbarImplPrivateProps, type ScrollAreaScrollbarImplProps, scrollAreaScrollbarImplProps } from './scroll-area-scrollbar-impl'
import type { ScrollAreaThumbElement } from './scroll-area-thumb'

export type ScrollAreaScrollbarAxisNaviteElement = ScrollAreaScrollbarImplNaviteElement
export type ScrollAreaScrollbarAxisElement = ScrollAreaScrollbarImplElement

export interface ScrollAreaScrollbarAxisProps extends Omit<ScrollAreaScrollbarImplProps, keyof ScrollAreaScrollbarImplPrivateProps>, ScrollAreaScrollbarAxisPrivateProps { }

export type ScrollAreaScrollbarAxisPrivateProps = {
  hasThumb: boolean
  sizes: Sizes
}

export type ScrollAreaScrollbarAxisPrivateEmits = {
  sizesChange: [sizes: Sizes]
  thumbChange: [thumb: ScrollAreaThumbElement | null]
  thumbPointerDown: [pointerPos: number]
  thumbPointerUp: []
  thumbPositionChange: []
  wheelScroll: [scrollPos: number]
  dragScroll: [pointerPos: number]
}

export const scrollAreaScrollbarAxisPrivateProps = {
  props: {
    hasThumb: {
      type: Boolean,
      required: true,
    },
    sizes: {
      type: Object as PropType<Sizes>,
      required: true,
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
  propKeys: ['hasThumb', 'sizes'] as ['hasThumb', 'sizes'],
  emitKeys: [
    'sizesChange',
    'thumbChange',
    'thumbPointerDown',
    'thumbPointerUp',
    'thumbPositionChange',
    'wheelScroll',
    'dragScroll',
  ] as [
    'sizesChange',
    'thumbChange',
    'thumbPointerDown',
    'thumbPointerUp',
    'thumbPositionChange',
    'wheelScroll',
    'dragScroll',
  ],
}

export const scrollAreaScrollbarAxisProps = {
  props: {
    ...propsOmit(scrollAreaScrollbarImplProps.props, [...scrollAreaScrollbarImplProps.propKeys]),
    ...scrollAreaScrollbarAxisPrivateProps.props,
  },
  emits: {
    ...propsOmit(scrollAreaScrollbarImplProps.emits, scrollAreaScrollbarImplProps.emitKeys),
    ...scrollAreaScrollbarAxisPrivateProps.emits,
  },
}
