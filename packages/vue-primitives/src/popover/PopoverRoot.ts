import type { Ref } from 'vue'
import { type MutableRefObject, createContext } from '../hooks/index.ts'

export interface PopoverRootProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
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
