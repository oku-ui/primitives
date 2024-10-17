import type { Ref } from 'vue'
import { createContext, type MutableRefObject } from '@oku-ui/hooks'

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
  triggerRef: MutableRefObject<HTMLButtonElement | undefined>
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
