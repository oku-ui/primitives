import type { Ref } from 'vue'
import type { MutableRefObject } from '../hooks/index.ts'
import type { EmitsToHookProps, PrimitiveDefaultProps } from '../shared/index.ts'
import { onBeforeUnmount } from 'vue'
import { createContext, useControllableStateV2, useRef } from '../hooks/index.ts'
import { usePooperRoot } from '../popper/index.ts'

export interface HoverCardRootProps {
  open?: boolean
  defaultOpen?: boolean
  openDelay?: number
  closeDelay?: number
}

export const DEFAULT_HOVER_CARD_ROOT_PROPS = {
  open: undefined,
  defaultOpen: undefined,
} satisfies PrimitiveDefaultProps<HoverCardRootProps>

export type HoverCardRootEmits = {
  'update:open': [open: boolean]
}

export interface HoverCardContext {
  open: Ref<boolean>
  onOpenChange: (open: boolean) => void
  onOpen: () => void
  onClose: () => void
  onDismiss: () => void
  hasSelectionRef: MutableRefObject<boolean>
  isPointerDownOnContentRef: MutableRefObject<boolean>
}

export const [provideHoverCardContext, useHoverCardContext] = createContext<HoverCardContext>('HoverCard')

export interface UseHoverCardRootProps extends EmitsToHookProps<HoverCardRootEmits> {
  open?: () => boolean | undefined
  defaultOpen?: boolean
  openDelay?: number
  closeDelay?: number
}

export function useHoverCardRoot(props: UseHoverCardRootProps = {}) {
  const {
    openDelay = 700,
    closeDelay = 300,
  } = props
  const open = useControllableStateV2(props.open, props.onUpdateOpen, props.defaultOpen ?? false)

  let openTimerRef = 0
  let closeTimerRef = 0
  const hasSelectionRef = useRef(false)
  const isPointerDownOnContentRef = useRef(false)

  // cleanup any queued state updates on unmount
  onBeforeUnmount(() => {
    if (openTimerRef)
      clearTimeout(openTimerRef)
    if (closeTimerRef)
      clearTimeout(closeTimerRef)
  })

  provideHoverCardContext({
    open,
    onOpenChange(v) {
      open.value = v
    },
    onOpen() {
      if (closeTimerRef)
        clearTimeout(closeTimerRef)
      openTimerRef = window.setTimeout(() => {
        open.value = true
        openTimerRef = 0
      }, openDelay)
    },
    onClose() {
      if (openTimerRef)
        clearTimeout(openTimerRef)

      if (hasSelectionRef.value || isPointerDownOnContentRef.value)
        return

      closeTimerRef = window.setTimeout(() => {
        open.value = false
        closeTimerRef = 0
      }, closeDelay)
    },
    onDismiss() {
      open.value = false
    },
    hasSelectionRef,
    isPointerDownOnContentRef,
  })

  usePooperRoot()
}
