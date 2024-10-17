import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'

export const LABEL_NAME = 'OkuLabel'

/* -------------------------------------------------------------------------------------------------
 * Label - label.ts
 * ----------------------------------------------------------------------------------------------- */

export type LabelNativeElement = OkuElement<'label'>
export type LabelElement = HTMLLabelElement

export interface LabelProps extends PrimitiveProps { }

export interface LabelEmits {
  mousedown: [event: MouseEvent]
}

export const labelProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    mousedown: (event: LabelEmits['mousedown'][0]) => true,
  },
}
