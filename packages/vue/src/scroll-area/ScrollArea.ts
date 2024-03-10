import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Ref } from 'vue'
import type { Direction } from '@oku-ui/direction'
import { createScope } from '@oku-ui/provide'
import { SCROLL_AREA_NAME } from './constants'
import type { ScrollAreaElement, ScrollAreaScopeProps, ScrollAreaScrollbarElement, ScrollAreaViewportElement } from './types'

// Props

export interface ScrollAreaProps extends PrimitiveProps, ScrollAreaScopeProps {
  /**
   * Describes the nature of scrollbar visibility, similar to how the scrollbar preferences in MacOS control visibility of native scrollbars.
   *
   * `auto` - means that scrollbars are visible when content is overflowing on the corresponding orientation. <br>
   * `always` - means that scrollbars are always visible regardless of whether the content is overflowing.<br>
   * `scroll` - means that scrollbars are visible when the user is scrolling along its corresponding orientation.<br>
   * `hover` - when the user is scrolling along its corresponding orientation and when the user is hovering over the scroll area.
   */
  type?: 'auto' | 'always' | 'scroll' | 'hover'
  /** The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `DirectionProvider` or assumes LTR (left-to-right) reading mode. */
  dir?: Direction
  /** If type is set to either `scroll` or `hover`, this prop determines the length of time, in milliseconds, <br> before the scrollbars are hidden after the user stops interacting with scrollbars. */
  scrollHideDelay?: number
}

// Context

export interface ScrollAreaContext {
  type: Ref<NonNullable<ScrollAreaProps['type']>>
  dir: Ref<NonNullable<ScrollAreaProps['dir']>>
  scrollHideDelay: Ref<number>
  scrollArea: Ref<ScrollAreaElement | undefined>
  viewport: Ref<ScrollAreaViewportElement | undefined>
  onViewportChange: (viewport: ScrollAreaViewportElement | undefined) => void
  content: Ref<HTMLElement | undefined>
  onContentChange: (content: HTMLDivElement) => void
  scrollbarX: Ref<ScrollAreaScrollbarElement | undefined>
  onScrollbarXChange: (scrollbar: ScrollAreaScrollbarElement | undefined) => void
  scrollbarXEnabled: Ref<boolean>
  onScrollbarXEnabledChange: (rendered: boolean) => void
  scrollbarY: Ref<ScrollAreaScrollbarElement | undefined>
  onScrollbarYChange: (scrollbar: ScrollAreaScrollbarElement | undefined) => void
  scrollbarYEnabled: Ref<boolean>
  onScrollbarYEnabledChange: (rendered: boolean) => void
  onCornerWidthChange: (width: number) => void
  onCornerHeightChange: (height: number) => void
}

export const [createScrollAreaContext, createScrollAreaScope] = createScope(SCROLL_AREA_NAME)

export const [provideScrollAreaContext, useScrollAreaContext] = createScrollAreaContext<ScrollAreaContext>(SCROLL_AREA_NAME)
