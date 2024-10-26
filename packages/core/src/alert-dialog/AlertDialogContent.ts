import type { PrimitiveDefaultProps } from '../shared/index.ts'
import { type DialogContentProps, useDialogContent, type UseDialogContent } from '../dialog/index.ts'

export interface AlertDialogContentProps extends DialogContentProps {}

export const DEFAULT_ALERT_DIALOG_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<AlertDialogContentProps>

export interface UseAlertDialogContent extends UseDialogContent {
}

export const useAlertDialogContent = useDialogContent
