import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { useSliderContext } from './SliderRoot.ts'

export interface SliderTrackProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_SLIDER_TRACK_PROPS = {
  as: 'span',
} satisfies PrimitiveDefaultProps<SliderTrackProps>

export function useSliderTrack(): RadixPrimitiveReturns {
  const context = useSliderContext('SliderTrack')

  return {
    attrs(extraAttrs) {
      const attrs = {
        'data-disabled': context.disabled() ? '' : undefined,
        'data-orientation': context.orientation,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
