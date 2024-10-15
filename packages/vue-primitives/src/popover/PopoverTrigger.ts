import type { PrimitiveProps } from '../primitive/index.ts'

export interface PopoverTriggerProps {
  as?: PrimitiveProps['as']
}

export type PopoverTriggerEmits = {
  click: [event: MouseEvent]
}
