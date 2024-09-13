import type { PrimitiveProps } from '../primitive/index.ts'

export interface ContextMenuTriggerProps {
  as?: PrimitiveProps['as']
  disabled?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type ContextMenuTriggerEmits = {
  contextmenu: [event: MouseEvent]
  pointerdown: [event: MouseEvent]
  pointermove: [event: MouseEvent]
  pointercancel: [event: MouseEvent]
  pointerup: [event: MouseEvent]
}
