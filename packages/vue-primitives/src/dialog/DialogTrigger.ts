import type { PrimitiveProps } from '../primitive/index.ts'

export interface DialogTriggerProps {
  as?: PrimitiveProps['as']
}

// eslint-disable-next-line ts/consistent-type-definitions
export type DialogTriggerEmits = {
  click: [event: MouseEvent]
}
