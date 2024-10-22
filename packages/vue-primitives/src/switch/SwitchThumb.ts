import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { useSwitchContext } from './SwitchRoot.ts'

export interface SwitchThumbProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_SWITCH_THUMB_PROPS = {
  as: 'span',
} satisfies PrimitiveDefaultProps<SwitchThumbProps>

export function useSwitchThumb(): RadixPrimitiveReturns {
  const context = useSwitchContext('SwitchThumb')

  return {
    attrs(extraAttrs) {
      const attrs = {
        'data-state': context.checked.value ? 'checked' : 'unchecked',
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
