import type { Ref } from 'vue'
import { createContext, useControllableStateV2, useId } from '../hooks/index.ts'
import { type ConvertEmitsToUseEmits, type Data, mergeAttrs } from '../shared/index.ts'

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

export interface UseCollapsibleRootProps extends ConvertEmitsToUseEmits<CollapsibleRootEmits> {
  open?: () => boolean | undefined
  defaultOpen?: boolean
  disabled?: () => boolean | undefined
}

export interface UseCollapsibleRootReturns {
  'data-state': 'open' | 'closed'
  'data-disabled': '' | undefined
  [key: string]: any
}

export function useCollapsibleRoot(
  props: UseCollapsibleRootProps,
): (extraAttrs?: Data) => UseCollapsibleRootReturns {
  const open = useControllableStateV2(props.open, props.onUpdateOpen, props.defaultOpen ?? false)

  provideCollapsibleContext({
    contentId: useId(),
    disabled: props.disabled ?? (() => false),
    open,
    onOpenToggle() {
      open.value = !open.value
    },
  })

  return (extraAttrs?: Data): UseCollapsibleRootReturns => {
    const attrs = {
      'data-state': open.value ? 'open' : 'closed',
      'data-disabled': props.disabled?.() ? '' : undefined,
    } as const

    if (extraAttrs)
      mergeAttrs(attrs, extraAttrs)

    return attrs
  }
}
