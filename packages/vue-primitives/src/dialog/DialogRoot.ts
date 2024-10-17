import type { EmitsToHookProps } from '../shared/typeUtils.ts'
import { type Ref, shallowRef } from 'vue'
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
  content: Ref<HTMLElement | undefined>
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
  content?: Ref<HTMLElement | undefined>

  open?: () => boolean | undefined
  defaultOpen?: boolean
  modal?: boolean
}

export function useDialogRoot(props: UseDialogRootProps) {
  const triggerRef = props.content || useRef<HTMLElement>()
  const content = props.content || shallowRef<HTMLElement>()

  const open = useControllableStateV2(props.open, props.onUpdateOpen, props.defaultOpen || false)

  provideDialogContext({
    triggerRef,
    content,
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
