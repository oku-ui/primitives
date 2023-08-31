/// <reference types="resize-observer-browser" />
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { useDirection } from '@Oku-ui/direction'
import type { PropType } from 'vue'
import { defineComponent, h, ref, toRefs } from 'vue'
import { createProvideScope } from '@Oku-ui/provide'
import { useComposedRefs, useForwardRef } from '@Oku-ui/use-composable'
import { scopedProps } from './types'
import type { ScrollAreaViewportElement } from './scroll-area-viewport'
import type { ScrollAreaScrollbarElement } from './scroll-area-scrollbar'

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

/* -------------------------------------------------------------------------------------------------
 * ScrollArea
 * ----------------------------------------------------------------------------------------------- */

const SCROLL_AREA_NAME = 'ScrollArea'

export type ScrollAreaIntrinsicElement = ElementType<'div'>
type ScrollAreaElement = HTMLDivElement

export const [createScrollAreaContext, createScrollAreaScope] = createProvideScope(SCROLL_AREA_NAME)

type ScrollAreaContextValue = {
  type: 'auto' | 'always' | 'scroll' | 'hover'
  dir: Direction
  scrollHideDelay: number
  scrollArea: ScrollAreaElement | null
  viewport: ScrollAreaViewportElement | null
  onViewportChange(viewport: ScrollAreaViewportElement | null): void
  content: HTMLDivElement | null
  onContentChange(content: HTMLDivElement): void
  scrollbarX: ScrollAreaScrollbarElement | null
  onScrollbarXChange(scrollbar: ScrollAreaScrollbarElement | null): void
  scrollbarXEnabled: boolean
  onScrollbarXEnabledChange(rendered: boolean): void
  scrollbarY: ScrollAreaScrollbarElement | null
  onScrollbarYChange(scrollbar: ScrollAreaScrollbarElement | null): void
  scrollbarYEnabled: boolean
  onScrollbarYEnabledChange(rendered: boolean): void
  onCornerWidthChange(width: number): void
  onCornerHeightChange(height: number): void
}

export const [ScrollAreaProvider, useScrollAreaContext]
  = createScrollAreaContext<ScrollAreaContextValue>(SCROLL_AREA_NAME)

interface ScrollAreaProps extends PrimitiveProps {
  type?: ScrollAreaContextValue['type']
  dir?: ScrollAreaContextValue['dir']
  scrollHideDelay?: number
}

const scrollAreaProps = {
  type: {
    type: String as PropType<ScrollAreaProps['type']>,
    required: false,
    default: 'hover',
  },
  dir: {
    type: String as PropType<ScrollAreaProps['dir']>,
    required: false,
  },
  scrollHideDelay: {
    type: Number,
    required: false,
    default: 600,
  },
}

const scrollArea = defineComponent({
  name: SCROLL_AREA_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { ...scrollAreaAttrs } = attrs as ScrollAreaIntrinsicElement

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
    const cornerWidth = ref(0)
    const cornerHeight = ref(0)
    const scrollbarXEnabled = ref(false)
    const scrollbarYEnabled = ref(false)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, scrollArea)
    const direction = useDirection(dir.value)

    const originalReturn = () =>
      h(
        ScrollAreaProvider,
        {
          scope: props.scopeOkuScrollArea,
          type: type.value,
          dir: direction.value,
          scrollHideDelay: scrollHideDelay.value,
          scrollArea: scrollArea.value,
          viewport: viewport.value,
          onViewportChange: (_viewport: ScrollAreaViewportElement) => viewport.value = _viewport,
          content: content.value,
          onContentChange: (_content: HTMLDivElement) => content.value = _content,
          scrollbarX: scrollbarX.value,
          onScrollbarXChange: (scrollbar: ScrollAreaScrollbarElement) => scrollbarX.value = scrollbar,
          scrollbarXEnabled: scrollbarXEnabled.value,
          onScrollbarXEnabledChange: (rendered: boolean) => scrollbarXEnabled.value = rendered,
          scrollbarY: scrollbarY.value,
          onScrollbarYChange: (scrollbar: ScrollAreaScrollbarElement) => scrollbarY.value = scrollbar,
          scrollbarYEnabled: scrollbarYEnabled.value,
          onScrollbarYEnabledChange: (rendered: boolean) => scrollbarYEnabled.value = rendered,
          // onCornerWidthChange: (width: number) => viewport.value = _viewport,
          // onCornerHeightChange: (heigh: number) => viewport.value = _viewport,
        },
        [
          h(
            Primitive.div,
            {
              dir: direction,
              ...scrollAreaAttrs,
              ref: composedRefs,
              style: {
                'position': 'relative',
                // Pass corner sizes as CSS vars to reduce re-renders of context consumers
                '--oku-scroll-area-corner-width': `${cornerWidth.value}px`,
                '--oku-scroll-area-corner-height': `${cornerHeight.value}px`,
                // ...props.style,
              },
            },
            [
              slots.default?.(),
            ],
          ),
        ],
      )

    return originalReturn
  },
})

export const OkuScrollArea = scrollArea as typeof scrollArea &
(new () => { $props: Partial<ScrollAreaElement> })

export type { ScrollAreaElement, ScrollAreaProps }
