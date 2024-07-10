import type { Ref } from 'vue'
import { createContext } from '../hooks/index.ts'
import type { PrimitiveProps } from '../primitive/index.ts'

export interface CollapsibleProps extends PrimitiveProps {
  defaultOpen?: boolean
  open?: boolean
  disabled?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type CollapsibleEmits = {
  'update:open': [value: boolean]
}

export interface CollapsibleContext {
  contentId: string
  disabled?: Ref<boolean>
  open: Ref<boolean>
  onOpenToggle: () => void
}

export const [provideCollapsibleContext, useCollapsibleContext] = createContext<CollapsibleContext>('Collapsible')
