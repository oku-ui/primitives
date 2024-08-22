import type { PrimitiveProps } from '../primitive/index.ts'

export interface LabelProps extends PrimitiveProps {}

// eslint-disable-next-line ts/consistent-type-definitions
export type LabelEmits = {
  mousedown: [event: MouseEvent]
}
