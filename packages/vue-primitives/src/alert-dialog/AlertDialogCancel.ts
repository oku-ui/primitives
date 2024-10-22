import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared'
import { type DialogCloseProps, useDialogClose } from '../dialog/index.ts'
import { useAlertDialogContentContext } from './AlertDialogContentImpl.ts'

export interface AlertDialogCancelProps extends DialogCloseProps {}

export const DEFAULT_ALERT_DIALOG_CANCEL_PROPS = {
  as: 'button',
} satisfies PrimitiveDefaultProps<AlertDialogCancelProps>

export function useAlretDialogCancel(): RadixPrimitiveReturns {
  const dialogClose = useDialogClose()

  const context = useAlertDialogContentContext('AlertDialogCancel')

  function setTemplateEl(v: HTMLElement | undefined) {
    context.cancelRef.value = v
  }

  const attrs = {
    elRef: setTemplateEl,
  }

  return {
    attrs(extraAttrs = []) {
      return dialogClose.attrs([attrs, ...extraAttrs])
    },
  }
}
