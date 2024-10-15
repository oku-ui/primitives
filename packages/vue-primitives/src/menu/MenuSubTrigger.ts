import type { PopperAnchorProps } from '../popper/index.ts'

export interface MenuSubTriggerProps extends PopperAnchorProps {
  disabled?: boolean
}

export type MenuSubTriggerEmits = {
  pointermove: [event: PointerEvent]
  pointerleave: [event: PointerEvent]
  keydown: [event: KeyboardEvent]
}
