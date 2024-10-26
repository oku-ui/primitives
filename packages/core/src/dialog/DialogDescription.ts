import type { PrimitiveProps } from '../primitive/index.ts'
import { mergePrimitiveAttrs, type PrimitiveDefaultProps, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useDialogContext } from './DialogRoot.ts'

export interface DialogDescriptionProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_DIALOG_DESCRIPTION_PROPS = {
  as: 'p',
} satisfies PrimitiveDefaultProps<DialogDescriptionProps>

export function useDialogDescription(): RadixPrimitiveReturns {
  const context = useDialogContext('DialogDescription')

  return {
    attrs(extraAttrs) {
      const attrs = {
        id: context.descriptionId,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
