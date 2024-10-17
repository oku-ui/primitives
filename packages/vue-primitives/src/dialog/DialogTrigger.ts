import type { PrimitiveProps } from '@oku-ui/primitive'

export interface DialogTriggerProps {
  as?: PrimitiveProps['as']
}

export type DialogTriggerEmits = {
  click: [event: MouseEvent]
}
