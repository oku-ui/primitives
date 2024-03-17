import type { Scope } from '@oku-ui/provide'

export type ScrollAreaElement = HTMLDivElement
export type ScrollAreaViewportElement = HTMLDivElement
export type ScrollAreaScrollbarElement = ScrollAreaScrollbarVisibleElement
export type ScrollAreaScrollbarVisibleElement = ScrollAreaScrollbarAxisElement
export type ScrollAreaScrollbarAxisElement = ScrollAreaScrollbarImplElement
export type ScrollAreaScrollbarImplElement = HTMLDivElement
export type ScrollAreaThumbElement = ScrollAreaThumbImplElement
export type ScrollAreaThumbImplElement = HTMLDivElement

export interface ScrollAreaScopeProps {
  scopeOkuScrollArea?: Scope
}

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
