import type { PrimitiveProps } from '../primitive/index.ts'
import type { RadixPrimitiveReturns } from '../shared/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { useCollapsibleContext } from './CollapsibleRoot.ts'

export interface CollapsibleTriggerProps {
  as?: PrimitiveProps['as']
}

export function useCollapsibleTrigger(): RadixPrimitiveReturns {
  const context = useCollapsibleContext('CollapsibleTrigger')

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented)
      return
    context.onOpenToggle()
  }

  return {
    attrs(extraAttrs) {
      const _disabled = context.disabled()
      const _open = context.open.value
      const attrs = {
        'type': 'button',
        'aria-controls': context.contentId,
        'aria-expanded': _open,
        'data-state': _open ? 'open' : 'closed',
        'data-disabled': _disabled ? '' : undefined,
        'disabled': _disabled,
        'onClick': onClick,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
