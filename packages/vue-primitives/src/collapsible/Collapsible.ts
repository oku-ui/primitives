import type { Ref } from 'vue'
import { createContext } from '../hooks/createContext.ts'
import type { PrimitiveProps } from '../primitive'

export interface CollapsibleProps extends PrimitiveProps {
  defaultOpen?: boolean
  open?: boolean
  disabled?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type CollapsibleEmits = {
  'update:open': [value: boolean]
}

export interface CollapsibleContextValue {
  contentId: string
  disabled?: Ref<boolean>
  open: Ref<boolean>
  onOpenToggle: () => void
}

export const [provideCollapsibleContext, useCollapsibleContext] = createContext<CollapsibleContextValue>('Collapsible')
