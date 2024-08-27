import type { PrimitiveProps } from '../primitive/index.ts'

export interface CollapsibleTriggerProps {
  as?: PrimitiveProps['as']
}

// eslint-disable-next-line ts/consistent-type-definitions
export type CollapsibleTriggerEmits = {
  click: [event: MouseEvent]
}
