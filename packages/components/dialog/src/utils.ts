import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvide, createProvideScope } from '@oku-ui/provide'
import { type Ref, ref } from 'vue'

export const CONTENT_NAME = 'OkuDialogContent'
export const TITLE_WARNING_NAME = 'OkuDialogTitleWarning'
export const TITLE_NAME = 'OkuDialogTitle'
export const DIALOG_NAME = 'OkuDialog'
export const OVERLAY_NAME = 'OkuDialogOverlay'

export type ScopeDialog<T> = T & { scopeOkuDialog?: Scope }

export const scopeDialogProps = {
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
  open: Ref<boolean>
  modal: Ref<boolean>
  onOpenToggle(): void
  onOpenChange(open: boolean): void
}

export const [DialogProvider, useDialogInject]
  = createDialogProvider<DialogProvideValue>(DIALOG_NAME)

export function getState(open: boolean) {
  return open ? 'open' : 'closed'
}

type WarningProviderValue = {
  contentName: Ref<string>
  titleName: Ref<string>
  docsSlug: Ref<string>
}

export const [WarningProvider, useWarningInject] = createProvide<WarningProviderValue>(TITLE_WARNING_NAME, {
  contentName: ref(CONTENT_NAME),
  titleName: ref(TITLE_NAME),
  docsSlug: ref('dialog'),
})

export declare type Undo = () => void
export declare const hideOthers: (originalTarget: Element | Element[], parentNode?: HTMLElement, markerName?: string) => Undo

type PortalInjectValue = {
  forceMount?: Ref<true | undefined>
}

export const [DialogPortalProvider, useDialogPortalInject]
  = createDialogProvider<PortalInjectValue>(DIALOG_NAME, {
    forceMount: undefined,
  })
