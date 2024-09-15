import type { PrimitiveProps } from '../primitive/index.ts'

export interface MenubarTriggerProps {
  as?: PrimitiveProps['as']
  disabled?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type MenubarTriggerEmits = {
  pointerdown: [event: PointerEvent]
  pointerenter: [event: PointerEvent]
  keydown: [event: KeyboardEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]

  mousedown: [event: MouseEvent]
}
