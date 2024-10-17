import type { PrimitiveProps } from '@oku-ui/primitive'

export interface SliderThumbProps {
  as?: PrimitiveProps['as']
  name?: string
}

export type SliderThumbEmits = {
  focus: [event: FocusEvent]
}
