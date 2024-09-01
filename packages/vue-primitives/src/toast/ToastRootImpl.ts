import type { DismissableLayerEmits } from '../dismissable-layer/index.ts'
import type { PrimitiveProps } from '../primitive/Primitive.ts'
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

// eslint-disable-next-line ts/consistent-type-definitions
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
