import type { PrimitiveProps } from '../primitive/index.ts'

export interface SliderThumbProps {
  as?: PrimitiveProps['as']
  name?: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type SliderThumbEmits = {
  focus: [event: FocusEvent]
}
