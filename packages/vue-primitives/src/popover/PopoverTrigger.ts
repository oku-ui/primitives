import type { PrimitiveProps } from '../primitive/index.ts'

export interface PopoverTriggerProps {
  as?: PrimitiveProps['as']
}

// eslint-disable-next-line ts/consistent-type-definitions
export type PopoverTriggerEmits = {
  click: [event: MouseEvent]
}
