import { toValue } from 'vue'
import { mergePrimitiveAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useProgressContext } from './ProgressRoot.ts'
import { getProgressState } from './utils.ts'

export function useProgressIndicator(): RadixPrimitiveReturns {
  const context = useProgressContext('ProgressIndicator')

  return {
    attrs(extraAttrs) {
      const _value = context.value?.()
      const _max = toValue(context.max)

      const attrs = {
        'data-state': getProgressState(_value, _max),
        'data-value': _value ?? undefined,
        'data-max': _max,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
