import type { PrimitiveProps } from '../primitive/index.ts'

export interface DialogCloseProps extends PrimitiveProps {}

// eslint-disable-next-line ts/consistent-type-definitions
export type DialogCloseEmits = {
  click: [event: Event]
}
