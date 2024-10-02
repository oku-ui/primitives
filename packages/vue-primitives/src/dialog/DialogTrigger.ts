import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveElAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { mergeHooksAttrs } from '../shared/index.ts'
import { useDialogContext } from './DialogRoot.ts'

export interface DialogTriggerProps {
  as?: PrimitiveProps['as']
}

export function useDialogTrigger(): RadixPrimitiveReturns {
  const context = useDialogContext('DialogTrigger')

  const setTemplateEl = (value: HTMLElement | undefined) => context.triggerRef.value = value

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented)
      return
    context.onOpenToggle()
  }

  return {
    attrs(extraAttrs) {
      const attrs: PrimitiveElAttrs = {
        'ref': setTemplateEl,
        'type': 'button',
        'aria-haspopup': 'dialog',
        'aria-expanded': context.open.value || false,
        'aria-controls': context.open.value ? context.contentId : undefined,
        'data-state': context.open.value ? 'open' : 'closed',
        onClick,
      }

      if (extraAttrs) {
        mergeHooksAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
