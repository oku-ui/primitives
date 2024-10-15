import type { PrimitiveProps } from '../primitive/index.ts'

export interface PopoverCloseProps {
  as?: PrimitiveProps['as']
}

export type PopoverCloseEmits = {
  click: [event: MouseEvent]
}
