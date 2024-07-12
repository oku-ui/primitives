import type { PrimitiveProps } from '../primitive/index.ts'

export interface ScrollAreaScrollbarVisibleProps extends PrimitiveProps {
  orientation?: 'horizontal' | 'vertical'
}

export interface Sizes {
  content: number
  viewport: number
  scrollbar: {
    size: number
    paddingStart: number
    paddingEnd: number
  }
}
