import type { PrimitiveProps } from '@oku-ui/primitive'

export interface ToastCloseProps {
  as?: PrimitiveProps['as']
  altText?: string
}

export type ToastCloseEmits = {
  click: [event: MouseEvent]
}
