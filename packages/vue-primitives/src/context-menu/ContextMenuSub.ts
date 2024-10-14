import type { EmitsToHookProps } from '../shared'
import { useControllableStateV2 } from '../hooks/index.ts'
import { useMenuSub } from '../menu/index.ts'

export interface ContextMenuSubProps {
  open?: boolean
  defaultOpen?: boolean
}

export type ContextMenuSubEmits = {
  'update:open': [isOpen: boolean]
}

export interface UseContextMenuSubProps extends EmitsToHookProps<ContextMenuSubEmits> {
  open?: () => boolean | undefined
  defaultOpen?: boolean
}

export function useContextMenuSub(props: UseContextMenuSubProps = {}): void {
  const open = useControllableStateV2(props.open, props.onUpdateOpen, props.defaultOpen ?? false)

  useMenuSub({
    open() {
      return open.value
    },
    onUpdateOpen(v) {
      open.value = v
    },
  })
}
