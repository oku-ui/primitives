/// <reference types="resize-observer-browser" />
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { useDirection } from '@oku-ui/direction'
import type { PropType, Ref } from 'vue'
import { defineComponent, h, ref, toRefs } from 'vue'
import { createProvideScope } from '@oku-ui/provide'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { scopedScrollAreaProps } from './types'
import type { ScrollAreaViewportElement } from './scroll-area-viewport'
import type { ScrollAreaScrollbarElement } from './scroll-area-scrollbar'

/* -------------------------------------------------------------------------------------------------
 * ScrollArea
 * ----------------------------------------------------------------------------------------------- */

const SCROLL_AREA_NAME = 'OkuScrollArea'

export type ScrollAreaNaviteElement = OkuElement<'div'>
export type ScrollAreaElement = HTMLDivElement

export const [createScrollAreaProvide, createScrollAreaScope] = createProvideScope(SCROLL_AREA_NAME)

export type Type = 'auto' | 'always' | 'scroll' | 'hover'
type ScrollAreaProvideValue = {
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

export const [scrollAreaProvider, useScrollAreaInject] = createScrollAreaProvide<ScrollAreaProvideValue>(SCROLL_AREA_NAME)

export interface ScrollAreaProps extends PrimitiveProps {
  type?: Type
  dir?: ScrollAreaProvideValue['dir']
  scrollHideDelay?: number
}

const scrollAreaProps = {
  props: {
    type: {
      type: String as PropType<Type>,
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
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    viewportChange: (viewport: ScrollAreaViewportElement | null) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    contentChange: (content: HTMLDivElement) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    scrollbarXChange: (scrollbar: ScrollAreaScrollbarElement | null) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    scrollbarXEnabledChange: (rendered: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    scrollbarYChange: (scrollbar: ScrollAreaScrollbarElement | null) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    scrollbarYEnabledChange: (rendered: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    cornerWidthChange: (width: number) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    cornerHeightChange: (height: number) => true,
  },
}

const scrollArea = defineComponent({
  name: SCROLL_AREA_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  emits: scrollAreaProps.emits,
  setup(props, { attrs, slots }) {
    // const { ...scrollAreaAttrs } = attrs as ScrollAreaNaviteElement

    const {
      type,
      dir,
      scrollHideDelay,
    } = toRefs(props)

    const scrollArea = ref<ScrollAreaElement | null>(null)
    const viewport = ref<ScrollAreaViewportElement | null>(null)
    const content = ref<HTMLDivElement | null>(null)
    const scrollbarX = ref<ScrollAreaScrollbarElement | null>(null)
    const scrollbarY = ref<ScrollAreaScrollbarElement | null>(null)
    const cornerWidth = ref<number>(0)
    const cornerHeight = ref<number>(0)
    const scrollbarXEnabled = ref<boolean>(false)
    const scrollbarYEnabled = ref<boolean>(false)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, scrollArea)
    const direction = useDirection(dir.value)

    scrollAreaProvider({
      scope: props.scopeOkuScrollArea,
      type,
      dir: direction,
      scrollHideDelay,
      scrollArea,
      viewport,
      onViewportChange: (_viewport: ScrollAreaViewportElement) => viewport.value = _viewport,
      content,
      onContentChange: (_content: HTMLDivElement) => content.value = _content,
      scrollbarX,
      onScrollbarXChange: (scrollbar: ScrollAreaScrollbarElement) => scrollbarX.value = scrollbar,
      scrollbarXEnabled,
      onScrollbarXEnabledChange: (rendered: boolean) => scrollbarXEnabled.value = rendered,
      scrollbarY,
      onScrollbarYChange: (scrollbar: ScrollAreaScrollbarElement) => scrollbarY.value = scrollbar,
      scrollbarYEnabled,
      onScrollbarYEnabledChange: (rendered: boolean) => scrollbarYEnabled.value = rendered,
      onCornerWidthChange: (_width: number) => cornerWidth.value = _width,
      onCornerHeightChange: (_heigh: number) => cornerHeight.value = _heigh,
    })

    return () => h(Primitive.div,
      {
        dir: direction.value,
        ...attrs,
        ref: composedRefs,
        style: {
          position: 'relative',
          // Pass corner sizes as CSS vars to reduce re-renders of context consumers
          ['--oku-scroll-area-corner-width' as any]: `${cornerWidth.value}px`,
          ['--oku-scroll-area-corner-height' as any]: `${cornerHeight.value}px`,
          ...attrs.style as CSSStyleRule,
        },
      },
      {
        default: () => slots.default?.(),
      },
    )
  },
})

export const OkuScrollArea = scrollArea as typeof scrollArea &
(new () => { $props: Partial<ScrollAreaElement> })
