import type { PrimitiveProps } from '@oku-ui/primitive'
import type { ScrollAreaScopeProps } from './types'

export interface ScrollAreaScrollbarVisibleProps extends PrimitiveProps, ScrollAreaScopeProps {
  orientation?: 'horizontal' | 'vertical'
}
