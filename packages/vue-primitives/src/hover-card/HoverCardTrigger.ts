import type { PopperAnchorProps } from '../popper'
import type { PrimitiveProps } from '../primitive'

export interface HoverCardTriggerProps extends PopperAnchorProps {
  as?: PrimitiveProps['as']
}

// eslint-disable-next-line ts/consistent-type-definitions
export type HoverCardTriggerEmits = {
  pointerenter: [event: PointerEvent]
  pointerleave: [event: PointerEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  touchstart: [event: TouchEvent]
}
