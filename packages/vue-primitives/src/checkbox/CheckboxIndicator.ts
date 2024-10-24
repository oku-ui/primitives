import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, PrimitiveElAttrs, RadixPrimitiveGetAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { type Ref, shallowRef } from 'vue'
import { usePresence } from '../presence/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { useCheckboxContext } from './CheckboxRoot.ts'
import { getState, isIndeterminate } from './utils.ts'

export interface CheckboxIndicatorProps {
  as?: PrimitiveProps['as']
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean
}

export const DEFAULT_CHECKBOX_INDICATOR_PROPS = {
  as: 'span',
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<CheckboxIndicatorProps>

export interface UseCheckboxIndicatorProps {
  el?: Ref<HTMLElement | undefined>
  forceMount?: boolean
}

export function useCheckboxIndicator(props: UseCheckboxIndicatorProps): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
  attrs: RadixPrimitiveGetAttrs
}> {
  const el = props.el || shallowRef<HTMLElement>()
  const setElRef = props.el ? undefined : (value: HTMLElement | undefined) => el.value = value

  const context = useCheckboxContext('CheckboxIndicator')

  const isPresent = usePresence(el, () => props.forceMount || isIndeterminate(context.checked.value) || context.checked.value === true)

  return {
    isPresent,
    attrs(extraAttrs) {
      const attrs: PrimitiveElAttrs = {
        'elRef': setElRef,
        'data-state': getState(context.checked.value),
        'data-disabled': context.disabled() ? '' : undefined,
        'style': {
          pointerEvents: 'none',
        },
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
