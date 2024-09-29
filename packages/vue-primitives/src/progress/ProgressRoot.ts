import { computed, toValue } from 'vue'
import { createContext } from '../hooks/index.ts'
import { isNumber, mergeHooksAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { DEFAULT_MAX, defaultGetValueLabel, getProgressState } from './utils.ts'

export interface ProgressRootProps {
  value?: number | undefined
  max?: number
  getValueLabel?: (value: number, max: number) => string
}

export interface ProgressContext {
  value?: () => number | undefined
  max: (() => number) | number
}

export const [provideProgressContext, useProgressContext] = createContext<ProgressContext>('Progress')

export interface UseProgressRootProps {
  value?: () => number | undefined
  max?: (() => number) | number
  getValueLabel?: (value: number, max: number) => string
}

export function useProgressRoot(props: UseProgressRootProps): RadixPrimitiveReturns {
  const { max = DEFAULT_MAX, getValueLabel = defaultGetValueLabel } = props

  const valueLabel = computed(() => {
    const _value = props.value?.()
    return isNumber(_value) ? getValueLabel(_value, toValue(max)) : undefined
  })

  provideProgressContext({
    value: props.value,
    max,
  })

  return {
    attrs(extraAttrs) {
      const value = props.value?.()
      const _max = toValue(max)

      const attrs = {
        'aria-valuemax': _max,
        'aria-valuemin': 0,
        'aria-valuenow': isNumber(value) ? value : undefined,
        'aria-valuetext': valueLabel.value,
        'role': 'progressbar',
        'data-state': getProgressState(value, _max),
        'data-value': value ?? undefined,
        'data-max': max,
      }

      if (extraAttrs) {
        mergeHooksAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
