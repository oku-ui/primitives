import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import { type Ref } from 'vue'
import { createDialogScope } from '@oku-ui/dialog'

export const ROOT_NAME = 'OkuAlertDialog'
export const TITLE_NAME = 'OkuAlertDialogTitle'
export type ScopeDialog<T> = T & { scopeOkuAlertDialog?: Scope }

export const CONTENT_NAME = 'OkuAlertDialogContent'
export const DESCRIPTION_NAME = 'OkuAlertDialogDescription'

export const scopeAlertDialogProps = {
  scopeOkuAlertDialog: {
    ...ScopePropObject,
  },
}

export const [createAlertDialogProvider, createAlertDialogScope] = createProvideScope(ROOT_NAME, [createDialogScope])
export const useAlertDialogScope = createDialogScope()

type AlertDialogContentContextValue = {
  cancelRef: Ref<HTMLButtonElement | null>

}

export const [AlertDialogContentProvider, useAlertDialogContentInject]
  = createAlertDialogProvider<AlertDialogContentContextValue>(ROOT_NAME)
