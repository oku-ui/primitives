import type { DialogCloseProps } from '../dialog/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared'
import { useDialogClose } from '../dialog/index.ts'
import { useAlertDialogContentContext } from './AlertDialogContentImpl.ts'

export interface AlertDialogCancelProps extends DialogCloseProps {}

export const DEFAULT_ALERT_DIALOG_CANCEL_PROPS = {
  as: 'button',
} satisfies PrimitiveDefaultProps<AlertDialogCancelProps>

export function useAlretDialogCancel(): RadixPrimitiveReturns {
  const dialogClose = useDialogClose()

  const context = useAlertDialogContentContext('AlertDialogCancel')

  function setElRef(v: HTMLElement | undefined) {
    context.cancelRef.value = v
  }

  const attrs = {
    elRef: setElRef,
  }

  return {
    attrs(extraAttrs = []) {
      return dialogClose.attrs([attrs, ...extraAttrs])
    },
  }
}
