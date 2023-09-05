import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvide, createProvideScope } from '@oku-ui/provide'
import { type Ref } from 'vue'
import { CONTENT_NAME } from './dialogContent'
import { TITLE_NAME } from './dialogTitle'
import { TITLE_WARNING_NAME } from './dialogTitleWarning'

export const DIALOG_NAME = 'OkuDialog'

export type ScopeDialog<T> = T & { scopeOkuDialog?: Scope }

export const scopeDialogrops = {
  scopeOkuDialog: {
    ...ScopePropObject,
  },
}

export const [createDialogProvider, createDialogScope] = createProvideScope(DIALOG_NAME)

type DialogProvideValue = {
  triggerRef: Ref<HTMLButtonElement | null>
  contentRef: Ref<HTMLDivElement | null>
  contentId: Ref<string>
  titleId: Ref<string>
  descriptionId: Ref<string>
  open: Ref<boolean | undefined>
  modal: Ref<boolean>
  onOpenToggle(): void
  onOpenChange(open: boolean): void
}

export const [DialogProvider, useDialogInject]
  = createDialogProvider<DialogProvideValue>(DIALOG_NAME)

export function getState(open: boolean) {
  return open ? 'open' : 'closed'
}

export const [WarningProvider, useWarningInject] = createProvide(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: 'dialog',
})

export declare type Undo = () => void
export declare const hideOthers: (originalTarget: Element | Element[], parentNode?: HTMLElement, markerName?: string) => Undo
