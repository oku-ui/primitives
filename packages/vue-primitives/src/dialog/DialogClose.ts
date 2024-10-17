import type { PrimitiveProps } from '@oku-ui/primitive'

export interface DialogCloseProps {
  as?: PrimitiveProps['as']
}

export type DialogCloseEmits = {
  click: [event: MouseEvent]
}
