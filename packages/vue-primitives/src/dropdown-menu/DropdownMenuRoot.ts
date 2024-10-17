import type { Direction } from '../direction/index.ts'
import { type MutableRefObject, createContext } from '@oku-ui/hooks'

export interface DropdownMenuRootProps {
  dir?: Direction
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

export type DropdownMenuRootEmits = {
  'update:open': [open: boolean]
}

export interface DropdownMenuContextValue {
  triggerId: string
  triggerRef: MutableRefObject<HTMLButtonElement | undefined>
  contentId: string
  open: () => boolean
  onOpenChange: (open: boolean) => void
  onOpenToggle: () => void
  modal: boolean
}

export const [provideDropdownMenuContext, useDropdownMenuContext] = createContext<DropdownMenuContextValue>('DropdownMenu')
