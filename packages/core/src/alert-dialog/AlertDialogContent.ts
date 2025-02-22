import type { DialogContentProps, UseDialogContent } from '../dialog/index.ts'
import type { PrimitiveDefaultProps } from '../shared/index.ts'
import { useDialogContent } from '../dialog/index.ts'

export interface AlertDialogContentProps extends DialogContentProps {}

export const DEFAULT_ALERT_DIALOG_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<AlertDialogContentProps>

export interface UseAlertDialogContent extends UseDialogContent {
}

export const useAlertDialogContent = useDialogContent
