import type { PrimitiveProps } from '../primitive/index.ts'

export interface DialogTriggerProps {
  as?: PrimitiveProps['as']
}

export type DialogTriggerEmits = {
  click: [event: MouseEvent]
}
