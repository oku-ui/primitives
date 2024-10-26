import type { Ref } from 'vue'
import { createContext, useControllableStateV2, useId } from '../hooks/index.ts'
import { type EmitsToHookProps, mergePrimitiveAttrs, type PrimitiveDefaultProps, type RadixPrimitiveReturns } from '../shared/index.ts'

export interface CollapsibleRootProps {
  defaultOpen?: boolean
  open?: boolean
  disabled?: boolean
}

export const DEFAULT_COLLAPSIBLE_ROOT_PROPS = {
  defaultOpen: undefined,
  open: undefined,
  disabled: undefined,
} satisfies PrimitiveDefaultProps<CollapsibleRootProps>

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
  const {
    disabled = () => undefined,
    defaultOpen = false,
  } = props

  const open = useControllableStateV2(props.open, props.onUpdateOpen, defaultOpen)

  provideCollapsibleContext({
    contentId: useId(),
    disabled,
    open,
    onOpenToggle() {
      open.value = !open.value
    },
  })

  return {
    attrs(extraAttrs) {
      const attrs = {
        'data-state': open.value ? 'open' : 'closed',
        'data-disabled': disabled() ? '' : undefined,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
