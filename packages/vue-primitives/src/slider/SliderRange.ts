import type { PrimitiveProps } from '../primitive'
import { computed } from 'vue'
import { mergePrimitiveAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useSliderOrientationContext } from './SliderOrientation.ts'
import { useSliderContext } from './SliderRoot.ts'
import { convertValueToPercentage } from './utils.ts'

export interface SliderRangeProps {
  as?: PrimitiveProps['as']
}

export function useSliderRange(): RadixPrimitiveReturns {
  const context = useSliderContext('SliderRange')
  const orientation = useSliderOrientationContext('SliderRange')
  console.error('context', context.values.value)

  const percentages = computed(() => context.values.value.map(value => convertValueToPercentage(value, context.min(), context.max())))

  const offsetStart = computed(() => context.values.value.length > 1 ? Math.min(...percentages.value) : 0)
  const offsetEnd = computed(() => 100 - Math.max(...percentages.value))

  return {
    attrs(extraAttrs) {
      const attrs = {
        'data-disabled': context.disabled() ? '' : undefined,
        'data-orientation': context.orientation(),
        'style': {
          [orientation.value.startEdge]: `${offsetStart.value}%`,
          [orientation.value.endEdge]: `${offsetEnd.value}%`,
        },
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
