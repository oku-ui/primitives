import type { PrimitiveProps } from '@oku-ui/primitive'

export interface CollapsibleTriggerProps {
  as?: PrimitiveProps['as']
}

export type CollapsibleTriggerEmits = {
  click: [event: MouseEvent]
}
