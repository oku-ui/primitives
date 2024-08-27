import type { Ref } from 'vue'
import { type MutableRefObject, createContext } from '../hooks/index.ts'

export interface DialogRootProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type DialogRootEmits = {
  'update:open': [open: boolean]
}

export type DialogContentElement = HTMLDivElement

interface DialogContextValue {
  triggerRef: MutableRefObject<HTMLButtonElement | undefined>
  contentRef: MutableRefObject<DialogContentElement | undefined>
  contentId?: string
  titleId?: string
  descriptionId?: string
  open: Ref<boolean>
  onOpenChange: (open: boolean) => void
  onOpenToggle: () => void
  modal: boolean
}

export const [provideDialogContext, useDialogContext] = createContext<DialogContextValue>('Dialog')
