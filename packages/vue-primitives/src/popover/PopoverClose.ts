import type { PrimitiveProps } from '../primitive/index.ts'

export interface PopoverCloseProps {
  as?: PrimitiveProps['as']
}

// eslint-disable-next-line ts/consistent-type-definitions
export type PopoverCloseEmits = {
  click: [event: MouseEvent]
}
