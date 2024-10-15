import type { PrimitiveProps } from '../primitive/index.ts'

export interface DialogCloseProps {
  as?: PrimitiveProps['as']
}

export type DialogCloseEmits = {
  click: [event: MouseEvent]
}
