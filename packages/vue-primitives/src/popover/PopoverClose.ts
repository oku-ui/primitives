import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { usePopoverContext } from './PopoverRoot.ts'

export interface PopoverCloseProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_POPOVER_CLOSE_PROPS = {
  as: 'button',
} satisfies PrimitiveDefaultProps<PopoverCloseProps>

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
