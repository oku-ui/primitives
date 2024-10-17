import type { DialogContentImplEmits } from '../dialog/DialogContentImpl.ts'
import { createContext, type MutableRefObject } from '@oku-ui/hooks'

export type AlertDialogContentEmits = {
  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  openAutoFocus: DialogContentImplEmits['openAutoFocus']
}

export type AlertDialogContentElement = HTMLDivElement

export type AlertDialogCancelElement = HTMLButtonElement

export interface AlertDialogContentContext {
  cancelRef: MutableRefObject<AlertDialogCancelElement | undefined>
}

export const [provideAlertDialogContentContext, useAlertDialogContentContext] = createContext<AlertDialogContentContext>('AlertDialogContent')
