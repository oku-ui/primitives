import type { Ref } from 'vue'
import type { Direction } from '../direction/index.ts'
import { createContext } from '../hooks/index.ts'

export interface ContextMenuRootProps {
  dir?: Direction
  modal?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type ContextMenuRootEmits = {
  'update:open': [open: boolean]
}

export interface ContextMenuContextValue {
  open: Ref<boolean>
  onOpenChange: (open: boolean) => void
  modal: boolean
}

export const [provideContextMenuContext, useContextMenuContext] = createContext<ContextMenuContextValue>('ContextMenu')
