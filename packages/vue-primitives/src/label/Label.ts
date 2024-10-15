import type { PrimitiveProps } from '../primitive/index.ts'

export interface LabelProps {
  as?: PrimitiveProps['as']
}

export type LabelEmits = {
  mousedown: [event: MouseEvent]
}
