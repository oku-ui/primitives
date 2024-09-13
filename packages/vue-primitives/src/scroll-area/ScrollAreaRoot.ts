import type { Ref } from 'vue'
import type { Direction } from '../direction/index.ts'
import { createContext } from '../hooks/index.ts'

type ScrollAreaType = 'auto' | 'always' | 'scroll' | 'hover'

export interface ScrollAreaRootProps {
  type?: ScrollAreaType
  dir?: Direction
  scrollHideDelay?: number
}

export type ScrollAreaElement = HTMLDivElement
export type ScrollAreaViewportElement = HTMLDivElement
export type ScrollAreaScrollbarElement = ScrollAreaScrollbarVisibleElement
export type ScrollAreaScrollbarVisibleElement = ScrollAreaScrollbarAxisElement
export type ScrollAreaScrollbarAxisElement = HTMLDivElement

export interface ScrollAreaContext {
  type: () => ScrollAreaType
  dir: Ref<Direction>
  scrollHideDelay: number
  scrollArea: Ref<ScrollAreaElement | undefined>
  viewport: Ref<ScrollAreaViewportElement | undefined>
  // onViewportChange: (viewport: ScrollAreaViewportElement | undefined) => void
  content: Ref<HTMLDivElement | undefined>
  // onContentChange: (content: HTMLDivElement | undefined) => void
  scrollbarX: Ref<ScrollAreaScrollbarElement | undefined>
  // onScrollbarXChange: (scrollbar: ScrollAreaScrollbarElement | undefined) => void
  scrollbarXEnabled: Ref<boolean>
  onScrollbarXEnabledChange: (rendered: boolean) => void
  scrollbarY: Ref<ScrollAreaScrollbarElement | undefined>
  // onScrollbarYChange: (scrollbar: ScrollAreaScrollbarElement | undefined) => void
  scrollbarYEnabled: Ref<boolean>
  onScrollbarYEnabledChange: (rendered: boolean) => void
  onCornerWidthChange: (width: number) => void
  onCornerHeightChange: (height: number) => void
}

export const [provideScrollAreaContext, useScrollAreaContext] = createContext<ScrollAreaContext>('ScrollArea')
