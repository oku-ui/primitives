import type { PrimitiveProps } from '../primitive/index.ts'
import type { RadixPrimitiveReturns } from '../shared/typeUtils.ts'
import { mergeHooksAttrs } from '../shared/mergeProps.ts'
import { useDialogContext } from './DialogRoot.ts'

export interface DialogCloseProps {
  as?: PrimitiveProps['as']
}

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

      if (extraAttrs) {
        mergeHooksAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
