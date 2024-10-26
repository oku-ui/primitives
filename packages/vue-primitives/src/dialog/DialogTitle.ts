import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { useDialogContext } from './DialogRoot.ts'

export interface DialogTitleProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_DIALOG_TITLE_PROPS = {
  as: 'h2',
} satisfies PrimitiveDefaultProps<DialogTitleProps>

export function useDialogTitle(): RadixPrimitiveReturns {
  const context = useDialogContext('DialogTitle')

  return {
    attrs(extraAttrs) {
      const attrs = {
        id: context.titleId,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
