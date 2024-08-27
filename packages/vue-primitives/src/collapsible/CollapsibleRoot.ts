import type { Ref } from 'vue'
import { createContext } from '../hooks/index.ts'

export interface CollapsibleRootProps {
  defaultOpen?: boolean
  open?: boolean
  disabled?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type CollapsibleRootEmits = {
  'update:open': [value: boolean]
}

export interface CollapsibleContext {
  contentId: string
  disabled: () => boolean
  open: Ref<boolean>
  onOpenToggle: () => void
}

export const [provideCollapsibleContext, useCollapsibleContext] = createContext<CollapsibleContext>('Collapsible')
