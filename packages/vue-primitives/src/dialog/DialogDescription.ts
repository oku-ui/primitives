import type { PrimitiveProps } from '../primitive/index.ts'
import { mergeHooksAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useDialogContext } from './DialogRoot.ts'

export interface DialogDescriptionProps {
  as?: PrimitiveProps['as']
}

export function useDialogDescription(): RadixPrimitiveReturns {
  const context = useDialogContext('DialogDescription')

  return {
    attrs(extraAttrs) {
      const attrs = {
        id: context.descriptionId,
      }

      if (extraAttrs) {
        mergeHooksAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
