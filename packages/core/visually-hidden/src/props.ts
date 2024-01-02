import { primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'

export const VISUALLY_HIDDEN_NAME = 'OkuVisuallyHidden'

/* -------------------------------------------------------------------------------------------------
 * VisuallyHidden - visually-hidden.ts
 * ----------------------------------------------------------------------------------------------- */

export type VisuallyHiddenNativeElement = OkuElement<'span'>
export type VisuallyHiddenElement = HTMLSpanElement

export interface VisuallyHiddenProps extends PrimitiveProps { }

export const visuallyHiddenProps = {
  props: {
    ...primitiveProps,
  },
  emits: { },
}
