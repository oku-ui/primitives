import type { DialogRootEmits } from '../dialog'

export {
  type DialogContext as AlertDialogContext,
  provideDialogContext as provideAlertDialogContext,
  useDialogContext as useAlertDialogContext,
} from '../dialog/index.ts'

export interface AlertDialogRootProps {
  open?: boolean
  defaultOpen?: boolean
}

export type AlertDialogRootEmits = DialogRootEmits
