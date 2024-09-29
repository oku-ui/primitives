import type { Ref } from 'vue'
import { createContext, useControllableStateV2, useId } from '../hooks/index.ts'
import { type EmitsToHookProps, mergeHooksAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'

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

export interface UseCollapsibleRootProps extends EmitsToHookProps<CollapsibleRootEmits> {
  open?: () => boolean | undefined
  defaultOpen?: boolean
  disabled?: () => boolean | undefined
}

export function useCollapsibleRoot(props: UseCollapsibleRootProps): RadixPrimitiveReturns {
  const open = useControllableStateV2(props.open, props.onUpdateOpen, props.defaultOpen ?? false)

  provideCollapsibleContext({
    contentId: useId(),
    disabled: props.disabled ?? (() => false),
    open,
    onOpenToggle() {
      open.value = !open.value
    },
  })

  return {
    attrs(extraAttrs) {
      const attrs = {
        'data-state': open.value ? 'open' : 'closed',
        'data-disabled': props.disabled?.() ? '' : undefined,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergeHooksAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
