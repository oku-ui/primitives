import type { PrimitiveDefaultProps } from '../shared/index.ts'
import { type DialogRootEmits, type DialogRootProps, useDialogRoot, type UseDialogRootProps } from '../dialog/index.ts'

export {
  type DialogContext as AlertDialogContext,
  provideDialogContext as provideAlertDialogContext,
  useDialogContext as useAlertDialogContext,
} from '../dialog/index.ts'

export interface AlertDialogRootProps extends Omit<DialogRootProps, 'modal'> {
}

export const DEFAULT_ALERT_DIALOG_ROOT_PROPS = {
  open: undefined,
  defaultOpen: undefined,
} satisfies PrimitiveDefaultProps<AlertDialogRootProps>

export type AlertDialogRootEmits = DialogRootEmits

export interface UseAlertDialogRootProps extends Omit<UseDialogRootProps, 'modal'> {
}

export function useAlertDialogRoot(props: UseAlertDialogRootProps = {}) {
  return useDialogRoot(props)
}
