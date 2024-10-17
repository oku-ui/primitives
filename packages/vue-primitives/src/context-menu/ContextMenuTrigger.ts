import type { PrimitiveProps } from '@oku-ui/primitive'

export interface ContextMenuTriggerProps {
  as?: PrimitiveProps['as']
  disabled?: boolean
}

export type ContextMenuTriggerEmits = {
  contextmenu: [event: MouseEvent]
  pointerdown: [event: MouseEvent]
  pointermove: [event: MouseEvent]
  pointercancel: [event: MouseEvent]
  pointerup: [event: MouseEvent]
}
