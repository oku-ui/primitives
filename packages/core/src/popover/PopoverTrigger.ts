import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, PrimitiveElAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { usePopperContext } from '../popper/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { usePopoverContext } from './PopoverRoot.ts'

export interface PopoverTriggerProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_POPOVER_TRIGGER_PROPS = {
  as: 'button',
} satisfies PrimitiveDefaultProps<PopoverTriggerProps>

export function usePopoverTrigger(): RadixPrimitiveReturns {
  const context = usePopoverContext('PopoverTrigger')
  const popperContext = usePopperContext('PopoverTrigger')

  function setElRef(v: HTMLElement | undefined) {
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
        'elRef': setElRef,
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
