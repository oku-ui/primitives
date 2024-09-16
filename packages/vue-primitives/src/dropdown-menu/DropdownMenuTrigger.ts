import type { PrimitiveProps } from '../primitive'

export interface DropdownMenuTriggerProps {
  as?: PrimitiveProps['as']
  disabled?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type DropdownMenuTriggerEmits = {
  pointerdown: [event: PointerEvent]
  keydown: [event: KeyboardEvent]
}
