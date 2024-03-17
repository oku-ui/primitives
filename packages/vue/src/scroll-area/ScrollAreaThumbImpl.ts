import type { PrimitiveProps } from '@oku-ui/primitive'
import type { ScrollAreaScopeProps } from './types'

// Props

export interface ScrollAreaThumbImplProps extends PrimitiveProps, ScrollAreaScopeProps { }

// Emits

export type ScrollAreaThumbImplEmits = {
  pointerdownCapture: [event: PointerEvent]
  pointerup: [event: PointerEvent]
}
