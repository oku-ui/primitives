import type { RovingFocusGroupItemEmits } from '../roving-focus/index.ts'

export interface MenuItemImplProps {
  disabled?: boolean
  textValue?: string
}

export type MenuItemImplEmits = {
  pointerleave: [event: PointerEvent]
  pointermove: [event: PointerEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
} & Pick<RovingFocusGroupItemEmits, 'mousedown' | 'keydown'>
