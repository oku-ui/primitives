import type { PropType } from 'vue'

import { primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'

/* -------------------------------------------------------------------------------------------------
 * CheckboxIndicator - checkbox-indicator.ts
 * ----------------------------------------------------------------------------------------------- */

export type CheckboxIndicatorNativeElement = OkuElement<'span'>
export type CheckboxIndicatorElement = HTMLSpanElement

export interface CheckboxIndicatorProps extends PrimitiveProps {
  forceMount?: true
}

export const checkboxIndicatorProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
    ...primitiveProps,
  },
  emits: {},
}
