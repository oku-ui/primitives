import type { PrimitiveProps } from '@oku-ui/primitive'

export interface PopoverCloseProps {
  as?: PrimitiveProps['as']
}

export type PopoverCloseEmits = {
  click: [event: MouseEvent]
}
