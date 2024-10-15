import type { PrimitiveProps } from '../primitive/index.ts'

export interface SliderThumbProps {
  as?: PrimitiveProps['as']
  name?: string
}

export type SliderThumbEmits = {
  focus: [event: FocusEvent]
}
