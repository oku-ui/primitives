import type { Direction } from '../direction/index.ts'
import { createContext, type MutableRefObject } from '../hooks/index.ts'

export interface DropdownMenuRootProps {
  dir?: Direction
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
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
