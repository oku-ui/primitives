import type { PrimitiveProps } from '@oku-ui/primitive'

export interface LabelProps {
  as?: PrimitiveProps['as']
}

export type LabelEmits = {
  mousedown: [event: MouseEvent]
}
