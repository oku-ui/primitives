import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { useDialogContext } from './DialogRoot.ts'

export interface DialogCloseProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_DIALOG_CLOSE_PROPS = {
  as: 'button',
} satisfies PrimitiveDefaultProps<DialogCloseProps>

export function useDialogClose(): RadixPrimitiveReturns {
  const context = useDialogContext('DialogClose')

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented)
      return
    context.onOpenChange(false)
  }

  return {
    attrs(extraAttrs) {
      const attrs = {
        onClick,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
