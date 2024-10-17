import type { PrimitiveProps } from '@oku-ui/primitive'

export interface TabsTriggerProps {
  as?: PrimitiveProps['as']
  value: string
  disabled?: boolean
}

export type TabsTriggerEmits = {
  mousedown: [event: MouseEvent]
  keydown: [event: KeyboardEvent]
  focus: [event: FocusEvent]
}
