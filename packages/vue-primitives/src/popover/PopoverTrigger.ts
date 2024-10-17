import type { PrimitiveProps } from '@oku-ui/primitive'

export interface PopoverTriggerProps {
  as?: PrimitiveProps['as']
}

export type PopoverTriggerEmits = {
  click: [event: MouseEvent]
}
