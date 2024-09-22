import type { PrimitiveProps } from '../primitive/index.ts'
import type { RadixPrimitiveReturns } from '../shared/index.ts'
import { NOOP } from '@vue/shared'
import { mergeHooksAttrs } from '../shared/index.ts'
import { useCollapsibleContext } from './CollapsibleRoot.ts'

export interface CollapsibleTriggerProps {
  as?: PrimitiveProps['as']
}

export function useCollapsibleTrigger(): RadixPrimitiveReturns {
  const context = useCollapsibleContext('CollapsibleTrigger')

  const onClick = function (event: MouseEvent) {
    if (event.defaultPrevented)
      return
    context.onOpenToggle()
  }

  return {
    attrs(extraAttrs) {
      const isDisabled = context.disabled()
      const attrs = {
        'type': 'button',
        'aria-controls': context.contentId,
        'aria-expanded': context.open.value || false,
        'data-state': context.open.value ? 'open' : 'closed',
        'data-disabled': isDisabled ? '' : undefined,
        'disabled': isDisabled,
        'onClick': isDisabled ? NOOP : onClick,
      }

      if (extraAttrs)
        mergeHooksAttrs(attrs, extraAttrs)

      return attrs
    },
  }
}
