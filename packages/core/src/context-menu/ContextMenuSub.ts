import type { EmitsToHookProps, PrimitiveDefaultProps } from '../shared'
import { useControllableStateV2 } from '../hooks/index.ts'
import { useMenuSub } from '../menu/index.ts'

export interface ContextMenuSubProps {
  open?: boolean
  defaultOpen?: boolean
}

export const DEFAULT_CONTEXT_MENU_SUB_PROPS = {
  open: undefined,
  defaultOpen: undefined,
} satisfies PrimitiveDefaultProps<ContextMenuSubProps>

export type ContextMenuSubEmits = {
  'update:open': [isOpen: boolean]
}

export interface UseContextMenuSubProps extends EmitsToHookProps<ContextMenuSubEmits> {
  open?: () => boolean | undefined
  defaultOpen?: boolean
}

export function useContextMenuSub(props: UseContextMenuSubProps = {}): void {
  const { defaultOpen = false } = props
  const open = useControllableStateV2(props.open, props.onUpdateOpen, defaultOpen)

  useMenuSub({
    open() {
      return open.value
    },
    onUpdateOpen(v) {
      open.value = v
    },
  })
}
