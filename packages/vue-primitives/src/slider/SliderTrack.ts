import type { PrimitiveProps } from '../primitive/index.ts'
import type { RadixPrimitiveReturns } from '../shared/typeUtils.ts'
import { mergePrimitiveAttrs } from '../shared/mergeProps.ts'
import { useSliderContext } from './SliderRoot.ts'

export interface SliderTrackProps {
  as?: PrimitiveProps['as']
}

export function useSliderTrack(): RadixPrimitiveReturns {
  const context = useSliderContext('SliderTrack')

  return {
    attrs(extraAttrs) {
      const attrs = {
        'data-disabled': context.disabled() ? '' : undefined,
        'data-orientation': context.orientation(),
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
