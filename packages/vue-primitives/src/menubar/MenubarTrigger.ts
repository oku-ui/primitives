import type { PrimitiveProps } from '@oku-ui/primitive'

export interface MenubarTriggerProps {
  as?: PrimitiveProps['as']
  disabled?: boolean
}

export type MenubarTriggerEmits = {
  pointerdown: [event: PointerEvent]
  pointerenter: [event: PointerEvent]
  keydown: [event: KeyboardEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]

  mousedown: [event: MouseEvent]
}
