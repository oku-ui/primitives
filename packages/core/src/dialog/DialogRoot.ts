import type { EmitsToHookProps, PrimitiveDefaultProps } from '../shared/index.ts'
import { type Ref, shallowRef } from 'vue'
import { createContext, type MutableRefObject, useControllableStateV2, useId, useRef } from '../hooks/index.ts'

export interface DialogRootProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

export const DEFAULT_DIALOG_ROOT_PROPS = {
  open: undefined,
  defaultOpen: undefined,
  modal: undefined,
} satisfies PrimitiveDefaultProps<DialogRootProps>

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
  const {
    modal = true,
    defaultOpen = false,
  } = props
  const triggerRef = props.content || useRef<HTMLElement>()
  const content = props.content || shallowRef<HTMLElement>()

  const open = useControllableStateV2(props.open, props.onUpdateOpen, defaultOpen)

  provideDialogContext({
    triggerRef,
    content,
    contentId: useId(),
    titleId: useId(),
    descriptionId: useId(),
    open,
    modal,
    onOpenChange(value) {
      open.value = value
    },
    onOpenToggle() {
      open.value = !open.value
    },
  })
}
