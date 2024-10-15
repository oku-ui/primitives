import type { PopperAnchorProps } from '../popper/index.ts'
import type { PrimitiveProps } from '../primitive/index.ts'

export interface TooltipTriggerProps extends PopperAnchorProps {
  as?: PrimitiveProps['as']
}

export type TooltipTriggerEmits = {
  pointermove: [event: PointerEvent]
  pointerleave: [event: PointerEvent]
  pointerdown: [event: PointerEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  click: [event: MouseEvent]
}

export type TooltipTriggerElement = HTMLButtonElement
