import type { EmitsToHookProps } from '../shared/index.ts'
import { type Ref, shallowRef } from 'vue'
import { createContext, type MutableRefObject, useControllableStateV2, useId, useRef } from '../hooks/index.ts'
import { usePooperRoot } from '../popper/index.ts'

export interface PopoverRootProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

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
  hasCustomAnchor: Ref<boolean>
  onCustomAnchorAdd: () => void
  onCustomAnchorRemove: () => void
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
  const triggerRef = props.triggerRef ?? useRef<HTMLElement>()
  const hasCustomAnchor = shallowRef(false)

  const open = useControllableStateV2(props.open, props.onUpdateOpen, props.defaultOpen ?? false)

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
    hasCustomAnchor,
    onCustomAnchorAdd() {
      hasCustomAnchor.value = true
    },
    onCustomAnchorRemove() {
      hasCustomAnchor.value = false
    },
    modal: props.modal ?? false,
  })

  usePooperRoot()
}
