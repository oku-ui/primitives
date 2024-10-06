import type { PrimitiveProps } from '../primitive/index.ts'
import type { RadixPrimitiveReturns } from '../shared/typeUtils.ts'
import { mergePrimitiveAttrs } from '../shared/mergeProps.ts'
import { usePopoverContext } from './PopoverRoot.ts'

export interface PopoverCloseProps {
  as?: PrimitiveProps['as']
}

export function usePopoverClose(): RadixPrimitiveReturns {
  const context = usePopoverContext('PopoverClose')

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented) {
      return
    }
    context.onOpenChange(false)
  }

  return {
    attrs(extraAttrs) {
      const attrs = {
        type: 'button',
        onClick,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
