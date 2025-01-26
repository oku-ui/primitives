import type { IAttrsData, PrimitiveDefaultProps, PrimitiveElAttrs, RadixPrimitiveGetAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import {

  mergePrimitiveAttrs,

} from '../shared/index.ts'

export interface AspectRatioProps {
  ratio?: number
}

export const DEFAULT_ASPECT_RATIO_PROPS = {
  ratio: 1,
} satisfies PrimitiveDefaultProps<AspectRatioProps>

export interface UseAspectRatioProps {
  ratio?: () => number
}

export function useAspectRatio(props: UseAspectRatioProps = {}): RadixPrimitiveReturns<
  {
    wrapperAttrs: () => IAttrsData
    attrs: RadixPrimitiveGetAttrs
  }
> {
  const { ratio = () => 1 } = props

  return {
    wrapperAttrs() {
      const attrs = {
        'style': {
        // ensures inner element is contained
          position: 'relative',
          // ensures padding bottom trick maths works
          width: '100%',
          paddingBottom: `${100 / (ratio())}%`,
        },
        'data-radix-aspect-ratio-wrapper': '',
      }

      return attrs
    },
    attrs(extraAttrs) {
      const attrs: PrimitiveElAttrs = {
        style: {
          // ensures children expand in ratio
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
