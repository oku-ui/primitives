import type { Ref } from 'vue'
import { type MutableRefObject, createContext } from '../hooks/index.ts'

export interface HoverCardRootProps {
  open?: boolean
  defaultOpen?: boolean
  openDelay?: number
  closeDelay?: number
}

// eslint-disable-next-line ts/consistent-type-definitions
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
