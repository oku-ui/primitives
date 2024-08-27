import type { PrimitiveProps } from '../primitive/index.ts'

export interface DialogCloseProps {
  as?: PrimitiveProps['as']
}

// eslint-disable-next-line ts/consistent-type-definitions
export type DialogCloseEmits = {
  click: [event: MouseEvent]
}
