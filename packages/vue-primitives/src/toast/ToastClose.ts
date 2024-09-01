import type { PrimitiveProps } from '../primitive/index.ts'

export interface ToastCloseProps {
  as?: PrimitiveProps['as']
  altText?: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type ToastCloseEmits = {
  click: [event: MouseEvent]
}
