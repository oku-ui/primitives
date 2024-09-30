import type { Ref } from 'vue'
import type { EmitsToHookProps, RadixPrimitiveReturns } from '../shared/typeUtils.ts'
import { createContext, type MutableRefObject, useControllableStateV2, useId, useRef } from '../hooks/index.ts'

export interface DialogRootProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

export type DialogRootEmits = {
  'update:open': [open: boolean]
}

export interface DialogContext {
  triggerRef: MutableRefObject<HTMLElement | undefined>
  contentRef: MutableRefObject<HTMLElement | undefined>
  contentId: string
  titleId: string
  descriptionId: string
  open: Ref<boolean>
  onOpenChange: (open: boolean) => void
  onOpenToggle: () => void
  modal: boolean
}

export const [provideDialogContext, useDialogContext] = createContext<DialogContext>('Dialog')

export interface UseDialogRootProps extends EmitsToHookProps<DialogRootEmits> {
  triggerRef?: MutableRefObject<HTMLElement | undefined>
  contentRef?: MutableRefObject<HTMLElement | undefined>

  open?: () => boolean | undefined
  defaultOpen?: boolean
  modal?: boolean
}

export function useDialogRoot(props: UseDialogRootProps) {
  const triggerRef = props.contentRef || useRef<HTMLElement>()
  const contentRef = props.contentRef || useRef<HTMLElement>()

  const open = useControllableStateV2(props.open, props.onUpdateOpen, props.defaultOpen || false)

  provideDialogContext({
    triggerRef,
    contentRef,
    contentId: useId(),
    titleId: useId(),
    descriptionId: useId(),
    open,
    modal: props.modal || true,
    onOpenChange(value) {
      open.value = value
    },
    onOpenToggle() {
      open.value = !open.value
    },
  })
}
