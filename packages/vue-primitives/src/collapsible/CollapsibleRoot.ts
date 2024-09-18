import type { Ref } from 'vue'
import type { ConvertEmitsToUseEmits } from '../utils/vue.ts'
import { createContext, useControllableStateV2, useId } from '../hooks/index.ts'

export interface CollapsibleRootProps {
  defaultOpen?: boolean
  open?: boolean
  disabled?: boolean
}

export type CollapsibleRootEmits = {
  'update:open': [value: boolean]
}

export interface CollapsibleContext {
  contentId: string
  disabled: () => boolean | undefined
  open: Ref<boolean>
  onOpenToggle: () => void
}

export const [provideCollapsibleContext, useCollapsibleContext] = createContext<CollapsibleContext>('Collapsible')

export interface UseCollapsibleRootProps {
  open?: () => boolean | undefined
  defaultOpen?: boolean
  disabled?: () => boolean
}

export type UseCollapsibleRootEmits = ConvertEmitsToUseEmits<CollapsibleRootEmits>

export interface UseCollapsibleRootReturns {
  'data-state': 'open' | 'closed'
  'data-disabled'?: boolean
}

export function useCollapsibleRoot(props: UseCollapsibleRootProps, emits: UseCollapsibleRootEmits): () => UseCollapsibleRootReturns {
  const open = useControllableStateV2(props.open, emits.onUpdateOpen, props.defaultOpen)

  provideCollapsibleContext({
    contentId: useId(),
    disabled() {
      return props.disabled?.()
    },
    open,
    onOpenToggle() {
      open.value = !open.value
    },
  })

  return (): UseCollapsibleRootReturns => ({
    'data-state': open.value ? 'open' : 'closed',
    'data-disabled': props.disabled?.() ? true : undefined,
  })
}
