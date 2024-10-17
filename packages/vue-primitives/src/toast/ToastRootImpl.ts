import type { DismissableLayerEmits } from '../dismissable-layer/index.ts'
import type { PrimitiveProps } from '@oku-ui/primitive'
import type { SwipeEvent } from './ToastRoot.ts'

export interface ToastRootImplProps {
  as?: PrimitiveProps['as']
  type?: 'foreground' | 'background'
  /**
   * Time in milliseconds that toast should remain visible for. Overrides value
   * given to `ToastProvider`.
   */
  duration?: number
  open: boolean
}

export type ToastRootImplEmits = {
  close: []

  escapeKeydown: DismissableLayerEmits['escapeKeydown']
  pause: []
  resume: []
  swipeStart: [event: SwipeEvent]
  swipeMove: [event: SwipeEvent]
  swipeEnd: [event: SwipeEvent]
  swipeCancel: [event: SwipeEvent]

  keydown: [event: KeyboardEvent]
  pointerdown: [event: PointerEvent]
  pointermove: [event: PointerEvent]
  pointerup: [event: PointerEvent]
}
