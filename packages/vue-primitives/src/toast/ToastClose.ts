import type { PrimitiveProps } from '../primitive/index.ts'

export interface ToastCloseProps {
  as?: PrimitiveProps['as']
  altText?: string
}

export type ToastCloseEmits = {
  click: [event: MouseEvent]
}
