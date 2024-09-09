import type { PopperAnchorProps } from '../popper/index.ts'
import type { PrimitiveProps } from '../primitive/index.ts'

export interface TooltipTriggerProps extends PopperAnchorProps {
  as?: PrimitiveProps['as']
}

// eslint-disable-next-line ts/consistent-type-definitions
export type TooltipTriggerEmits = {
  pointermove: [event: PointerEvent]
  pointerleave: [event: PointerEvent]
  pointerdown: [event: PointerEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  click: [event: MouseEvent]
}

export type TooltipTriggerElement = HTMLButtonElement
