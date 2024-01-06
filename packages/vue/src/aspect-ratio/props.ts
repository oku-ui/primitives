import type { PropType } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'

export const ASPECT_RATIO_NAME = 'OkuAspectRatio'

/* -------------------------------------------------------------------------------------------------
 * AspectRatio - aspect-ratio.ts
 * ----------------------------------------------------------------------------------------------- */

export type AspectRatioNativeElement = OkuElement<'div'>
export type AspectRatioElement = HTMLDivElement

export interface AspectRatioProps extends PrimitiveProps {
  ratio: number
}

export const aspectRatioProps = {
  props: {
    ratio: {
      type: Number as PropType<AspectRatioProps['ratio']>,
      default: 1 / 1,
    },
    ...primitiveProps,
  },
  emits: { },
}
