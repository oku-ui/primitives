import {
  type IAttrsData,
  mergePrimitiveAttrs,
  type PrimitiveDefaultProps,
  type PrimitiveElAttrs,
  type RadixPrimitiveGetAttrs,
  type RadixPrimitiveReturns,
} from '../shared/index.ts'

export interface AspectRatioProps {
  ratio?: number
}

export const DEFAULT_ASPECT_RATIO_PROPS = {
} satisfies PrimitiveDefaultProps<AspectRatioProps>

export interface UseAspectRatioProps {
  ratio?: () => number | undefined
}

export function useAspectRatio(props: UseAspectRatioProps = {}): RadixPrimitiveReturns<
  {
    wrapperAttrs: () => IAttrsData
    attrs: RadixPrimitiveGetAttrs
  }
> {
  return {
    wrapperAttrs() {
      const attrs = {
        'style': {
        // ensures inner element is contained
          position: 'relative',
          // ensures padding bottom trick maths works
          width: '100%',
          paddingBottom: `${100 / (props.ratio?.() || 1)}%`,
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
