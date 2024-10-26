import type { Ref } from 'vue'
import type { EmitsToHookProps, PrimitiveDefaultProps } from '../shared/index.ts'
import { createContext, type MutableRefObject, useControllableStateV2, useId, useRef } from '../hooks/index.ts'
import { usePooperRoot } from '../popper/index.ts'

export interface PopoverRootProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

export const DEFAULT_POPOVER_ROOT_PROPS = {
  open: undefined,
  defaultOpen: undefined,
  modal: undefined,
} satisfies PrimitiveDefaultProps<PopoverRootProps>

export type PopoverRootEmits = {
  /**
   * Event handler called when the open state of the popover changes.
   */
  'update:open': [value: boolean]
}

export interface PopoverContext {
  triggerRef: MutableRefObject<HTMLElement | undefined>
  contentId: string
  open: Ref<boolean>
  onOpenChange: (open: boolean) => void
  onOpenToggle: () => void
  modal: boolean
}

export const [providePopoverContext, usePopoverContext] = createContext<PopoverContext>('Poppover')

export interface UsePopoverRootProps extends EmitsToHookProps<PopoverRootEmits> {
  triggerRef?: MutableRefObject<HTMLElement | undefined>
  open?: () => boolean | undefined
  defaultOpen?: boolean
  modal?: boolean
}

export function usePopoverRoot(props: UsePopoverRootProps = {}) {
  const {
    defaultOpen = false,
    modal = false,
  } = props
  const triggerRef = props.triggerRef ?? useRef<HTMLElement>()

  const open = useControllableStateV2(props.open, props.onUpdateOpen, defaultOpen)

  providePopoverContext({
    triggerRef,
    contentId: useId(),
    open,
    onOpenChange(value) {
      open.value = value
    },
    onOpenToggle() {
      open.value = !open.value
    },
    modal,
  })

  usePooperRoot()
}
