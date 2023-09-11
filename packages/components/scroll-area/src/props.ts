import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { PropType, Ref } from 'vue'

import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'

export type ScopedScrollArea<P> = P & { scopeOkuScrollArea?: Scope }

export const scopedScrollAreaProps = {
  scopeOkuScrollArea: {
    ...ScopePropObject,
  },
}

// NAMES
export const SCROLL_AREA_NAME = 'OkuScrollArea'
export const SCROLL_AREA_THUMB_NAME = 'OkuScrollAreaThumb'
export const SCROLL_AREA_SCROLLBAR_NAME = 'OkuScrollAreaScrollbar'
export const SCROLL_AREA_THUMB_IMPL_NAME = 'OkuScrollAreaThumbImpl'
export const SCROLL_AREA_SCROLLBAR_IMPL_NAME = 'OkuScrollAreaScrollbarImpl'
export const SCROLL_AREA_SCROLLBAR_SCROLL_NAME = 'OkuScrollAreaScrollbarScroll'
export const SCROLL_AREA_SCROLLBAR_VISIBLE_NAME = 'OkuScrollAreaScrollbarVisible'
export const SCROLL_AREA_SCROLLBAR_AUTO_NAME = 'OkuScrollAreaScrollbarAuto'
export const SCROLL_AREA_CORNER_NAME = 'OkuScrollAreaCorner'
export const SCROLL_AREA_CORNER_IMPL_NAME = 'OkuScrollAreaCornerImpl'

/* -------------------------------------------------------------------------------------------------
 * ScrollArea - scroll-area.ts
 * ----------------------------------------------------------------------------------------------- */

export type Direction = 'ltr' | 'rtl'
export type Sizes = {
  content: number
  viewport: number
  scrollbar: {
    size: number
    paddingStart: number
    paddingEnd: number
  }
}

export type ScrollAreaNaviteElement = OkuElement<'div'>
export type ScrollAreaElement = HTMLDivElement

export type ScrollAreaProvideValue = {
  type: Ref<'auto' | 'always' | 'scroll' | 'hover'>
  dir: Ref<Direction>
  scrollHideDelay: Ref<number>
  scrollArea: Ref<ScrollAreaElement | null>
  viewport: Ref<ScrollAreaViewportElement | null>
  onViewportChange(viewport: ScrollAreaViewportElement | null): void
  content: Ref<HTMLDivElement | null>
  onContentChange(content: HTMLDivElement): void
  scrollbarX: Ref<ScrollAreaScrollbarElement | null>
  onScrollbarXChange(scrollbar: ScrollAreaScrollbarElement | null): void
  scrollbarXEnabled: Ref<boolean>
  onScrollbarXEnabledChange(rendered: boolean): void
  scrollbarY: Ref<ScrollAreaScrollbarElement | null>
  onScrollbarYChange(scrollbar: ScrollAreaScrollbarElement | null): void
  scrollbarYEnabled: Ref<boolean>
  onScrollbarYEnabledChange(rendered: boolean): void
  onCornerWidthChange(width: number): void
  onCornerHeightChange(height: number): void
}

export interface ScrollAreaProps extends PrimitiveProps {
  type?: ScrollAreaProvideValue['type']
  dir?: ScrollAreaProvideValue['dir']
  scrollHideDelay?: number
}

export const scrollAreaProps = {
  props: {
    type: {
      type: String as unknown as PropType<ScrollAreaProvideValue['type']>,
      default: 'hover',
    },
    dir: {
      type: String as PropType<Direction>,
    },
    scrollHideDelay: {
      type: Number as PropType<number>,
      default: 600,
    },
  },
  emits: {},
}
export const [createScrollAreaProvide, createScrollAreaScope] = createProvideScope(SCROLL_AREA_NAME)

export const [scrollAreaProvider, useScrollAreaInject] = createScrollAreaProvide<ScrollAreaProvideValue>(SCROLL_AREA_NAME)

/* -------------------------------------------------------------------------------------------------
 * ScrollAreaViewport - scroll-area-viewport.ts
 * ----------------------------------------------------------------------------------------------- */

export type ScrollAreaViewportNaviteElement = OkuElement<'div'>
export type ScrollAreaViewportElement = HTMLDivElement

export interface ScrollAreaViewportProps extends PrimitiveProps { }

export const SCROLL_AREA_VIEWPORT = 'OkuScrollAreaViewport'

export const scrollAreaViewportProps = {
  props: {
    ...primitiveProps,
  },
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * ScrollAreaThumb - scroll-area-thumb.ts
 * ----------------------------------------------------------------------------------------------- */

export type ScrollAreaThumbNaviteElement = ScrollAreaThumbImplNaviteElement
export type ScrollAreaThumbElement = ScrollAreaThumbImplElement

export interface ScrollAreaThumbProps extends ScrollAreaThumbImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const scrollAreaThumbProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
    },
  },
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * ScrollAreaScrollImpl - scroll-area-scroll-impl.ts
 * ----------------------------------------------------------------------------------------------- */

export type ScrollAreaThumbImplNaviteElement = OkuElement<'div'>
export type ScrollAreaThumbImplElement = HTMLDivElement

export interface ScrollAreaThumbImplProps extends PrimitiveProps { }

export type scrollAreaThumbImplEmits = {
  pointerdownCapture: [event: PointerEvent]
  pointerup: [event: PointerEvent]
}

export const scrollAreaThumbImplProps = {
  props: {
    style: {
      type: Object,
      required: false,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdownCapture: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerup: (event: PointerEvent) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * ScrollAreaCornerImpl - scroll-area-corner-impl.ts
 * ----------------------------------------------------------------------------------------------- */

export type ScrollAreaCornerImplNaviteElement = OkuElement<'div'>
export type ScrollAreaCornerImplElement = HTMLDivElement

export interface ScrollAreaCornerImplProps extends PrimitiveProps { }
export const scrollAreaCornerImplProps = {
  props: {
    ...primitiveProps,
  },
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 *  ScrollAreaCorner - scroll-area-corner.ts
 * ----------------------------------------------------------------------------------------------- */

export type ScrollAreaCornerNaviteElement = ScrollAreaCornerImplNaviteElement
export type ScrollAreaCornerElement = ScrollAreaCornerImplElement

export interface ScrollAreaCornerProps extends ScrollAreaCornerImplProps { }

export const scrollAreaCornerProps = {
  props: {
    ...scrollAreaCornerImplProps.props,
  },
  emits: {
    ...scrollAreaCornerImplProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ScrollAreaScrollbarImpl - scroll-area-scrollbar-impl.ts
 * ----------------------------------------------------------------------------------------------- */

export type ScrollAreaScrollbarImplNaviteElement = OkuElement<'div'>
export type ScrollAreaScrollbarImplElement = HTMLDivElement

export interface ScrollAreaScrollbarImplProps extends PrimitiveProps, ScrollAreaScrollbarImplPrivateProps { }

export const [createScrollProvide, createScrollScope] = createProvideScope(SCROLL_AREA_SCROLLBAR_NAME)

export type ScrollbarProvideValue = {
  hasThumb: Ref<boolean>
  scrollbar: Ref<ScrollAreaScrollbarElement | null>
  onThumbChange(thumb: ScrollAreaThumbElement | null): void
  onThumbPointerUp(): void
  onThumbPointerDown(pointerPos: { x: number; y: number }): void
  onThumbPositionChange(): void
}

export const [scrollbarProvider, useScrollbarInject] = createScrollProvide<ScrollbarProvideValue>(SCROLL_AREA_SCROLLBAR_NAME)

export type ScrollAreaScrollbarImplPrivateProps = {
  sizes: Ref<Sizes>
  hasThumb: Ref<boolean>
}

export type ScrollAreaScrollbarImplPrivateEmits = {
  thumbChange: [thumb: Parameters<ScrollbarProvideValue['onThumbChange']>[0]]
  thumbPointerUp: []
  thumbPointerDown: [pointerPos: Parameters<ScrollbarProvideValue['onThumbPointerDown']>[0]]
  thumbPositionChange: []
  wheelScroll: [event: WheelEvent, maxScrollPos: number]
  dragScroll: [pointerPos: { x: number; y: number }]
  resize: []
  pointerdown: [event: PointerEvent]
  pointermove: [event: PointerEvent]
  pointerup: [event: PointerEvent]
}

export const scrollAreaScrollbarImplProps = {
  props: {
    hasThumb: {
      type: Boolean,
    },
    sizes: {
      type: Object,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    thumbChange: (thumb: Parameters<ScrollbarProvideValue['onThumbChange']>[0]) => true,
    thumbPointerUp: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    thumbPointerDown: (pointerPos: Parameters<ScrollbarProvideValue['onThumbPointerDown']>[0]) => true,

    thumbPositionChange: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    wheelScroll: (...args: ScrollAreaScrollbarImplPrivateEmits['wheelScroll']) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    dragScroll: (...args: ScrollAreaScrollbarImplPrivateEmits['dragScroll']) => true,
    resize: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdown: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointermove: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerup: (event: PointerEvent) => true,
  },
  propKeys: ['hasThumb', 'sizes', 'asChild'] as ['hasThumb', 'sizes', 'asChild'],
  emitKeys: [
    'thumbChange',
    'thumbPointerUp',
    'thumbPointerDown',
    'thumbPositionChange',
    'wheelScroll',
    'dragScroll',
    'resize',
    'pointerdown',
    'pointermove',
    'pointerup',
  ] as [
    'thumbChange',
    'thumbPointerUp',
    'thumbPointerDown',
    'thumbPositionChange',
    'wheelScroll',
    'dragScroll',
    'resize',
    'pointerdown',
    'pointermove',
    'pointerup',
  ],
}

export type ScrollAreaScrollbarImplEmits = {
  pointerup: [event: PointerEvent]
  pointermove: [event: PointerEvent]
  pointerdown: [event: PointerEvent]
}

/* -------------------------------------------------------------------------------------------------
 *  ScrollAreaScrollbarAxisX - scroll-area-scrollbar-axis-x.ts
 * ----------------------------------------------------------------------------------------------- */

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

export const SCROLL_AREA_SCROLLBAR_X = 'OkuScrollAreaScrollbarX'

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

/* -------------------------------------------------------------------------------------------------
 *  ScrollAreaScrollVisible - scroll-area-scrollbar-visible.ts
 * ----------------------------------------------------------------------------------------------- */

export type ScrollAreaScrollbarVisibleNaviteElement = ScrollAreaScrollbarAxisNaviteElement
export type ScrollAreaScrollbarVisibleElement = ScrollAreaScrollbarAxisElement

export interface ScrollAreaScrollbarVisibleProps extends Omit<ScrollAreaScrollbarAxisProps, keyof ScrollAreaScrollbarAxisPrivateProps> {
  orientation?: 'horizontal' | 'vertical'
}

export const scrollAreaScrollbarVisibleProps = {
  props: {
    ...propsOmit(scrollAreaScrollbarAxisProps.props, scrollAreaScrollbarAxisPrivateProps.propKeys),
    orientation: {
      type: String as PropType<ScrollAreaScrollbarVisibleProps['orientation']>,
      required: false,
      default: 'vertical',
    },
  },
  emits: {
    ...propsOmit(scrollAreaScrollbarAxisProps.emits, scrollAreaScrollbarAxisPrivateProps.emitKeys),
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ScrollAreaScrollbar - scroll-area-scrollbar.ts
 * ----------------------------------------------------------------------------------------------- */

export type ScrollAreaScrollbarNaviteElement = ScrollAreaScrollbarVisibleNaviteElement
export type ScrollAreaScrollbarElement = ScrollAreaScrollbarVisibleElement

export interface ScrollAreaScrollbarProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true
}

export const scrollAreaScrollbarProps = {
  props: {
    ...scrollAreaScrollbarVisibleProps.props,
    forceMount: {
      type: Boolean as PropType<true | undefined>,
    },
  },
  emits: {
    ...scrollAreaScrollbarVisibleProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ScrollAreaScrollbarAuto - scroll-area-scrollbar-auto.ts
 * ----------------------------------------------------------------------------------------------- */

export type ScrollAreaScrollbarAutoNaviteElement = ScrollAreaScrollbarVisibleNaviteElement
export type ScrollAreaScrollbarAutoElement = ScrollAreaScrollbarVisibleElement

export interface ScrollAreaScrollbarAutoProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true
}

export const scrollAreaScrollbarAutoProps = {
  props: {
    ...scrollAreaScrollbarVisibleProps.props,
    forceMount: {
      type: Boolean as PropType<true | undefined>,
    },
  },
  emits: {
    ...scrollAreaScrollbarVisibleProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ScrollAreaScrollbarScroll - scroll-area-scrollbar-scroll.ts
 * ----------------------------------------------------------------------------------------------- */

export type ScrollAreaScrollbarScrollNaviteElement = ScrollAreaScrollbarVisibleNaviteElement
export type ScrollAreaScrollbarScrollElement = ScrollAreaScrollbarVisibleElement

export interface ScrollAreaScrollbarScrollProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true
}

export type ScrollAreaScrollbarScrollEmits = {
  pointerenter: [event: PointerEvent]
  pointerleave: [event: PointerEvent]
}

export const scrollAreaScrollbarScrollProps = {
  props: {
    ...scrollAreaScrollbarVisibleProps.props,
    forceMount: {
      type: Boolean as PropType<true | undefined>,
    },
  },
  emits: {
    ...scrollAreaScrollbarVisibleProps.emits,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerenter: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerleave: (event: PointerEvent) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ScrollAreaScrollbarHover - scroll-area-scrollbar-hover.ts
 * ----------------------------------------------------------------------------------------------- */

export const SCROLL_AREA_SCROLLBAR_HOVER = 'OkuScrollAreaScrollbarHover'

export type ScrollAreaScrollbarHoverNaviteElement = ScrollAreaScrollbarAutoNaviteElement
export type ScrollAreaScrollbarHoverElement = ScrollAreaScrollbarAutoElement

export interface ScrollAreaScrollbarHoverProps extends ScrollAreaScrollbarAutoProps {
  forceMount?: true
}

export const scrollAreaScrollbarHoverProps = {
  props: {
    ...scrollAreaScrollbarAutoProps.props,
    forceMount: {
      type: Boolean as PropType<true | undefined>,
    },
  },
  emits: {
    ...scrollAreaScrollbarAutoProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ScrollAreaScrollbarAxisY - scroll-area-scrollbar-axis-y.ts
 * ----------------------------------------------------------------------------------------------- */

export const SCROLL_AREA_SCROLLBAR_Y = 'OkuScrollAreaScrollbarY'
