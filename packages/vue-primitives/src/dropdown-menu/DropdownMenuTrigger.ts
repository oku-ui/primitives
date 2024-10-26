import type { PrimitiveProps } from '@oku-ui/primitive'

export interface DropdownMenuTriggerProps {
  as?: PrimitiveProps['as']
  disabled?: boolean
}

export type DropdownMenuTriggerEmits = {
  pointerdown: [event: PointerEvent]
  keydown: [event: KeyboardEvent]
}
