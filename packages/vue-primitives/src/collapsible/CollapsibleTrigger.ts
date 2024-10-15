import type { PrimitiveProps } from '../primitive/index.ts'

export interface CollapsibleTriggerProps {
  as?: PrimitiveProps['as']
}

export type CollapsibleTriggerEmits = {
  click: [event: MouseEvent]
}
