import type { PrimitiveProps } from '../primitive/index.ts'
import { usePopperContext } from '../popper/index.ts'
import { mergePrimitiveAttrs, type PrimitiveElAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { usePopoverContext } from './PopoverRoot.ts'

export interface PopoverTriggerProps {
  as?: PrimitiveProps['as']
}

export function usePopoverTrigger(): RadixPrimitiveReturns {
  const context = usePopoverContext('PopoverTrigger')
  const popperContext = usePopperContext('PopoverTrigger')

  function setTemplateEl(v: HTMLElement | undefined) {
    context.triggerRef.value = v
    popperContext.onAnchorChange(v)
  }

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented) {
      return
    }
    context.onOpenToggle()
  }

  return {
    attrs(extraAttrs) {
      const attrs: PrimitiveElAttrs = {
        'elRef': setTemplateEl,
        'type': 'button',
        'aria-haspopup': 'dialog',
        'aria-expanded': context.open.value,
        'aria-controls': context.contentId,
        'data-state': context.open.value ? 'open' : 'closed',
        onClick,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
