import type { DialogContentImplEmits } from '../dialog/DialogContentImpl.ts'
import { createContext, type MutableRefObject } from '../hooks/index.ts'

// eslint-disable-next-line ts/consistent-type-definitions
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
