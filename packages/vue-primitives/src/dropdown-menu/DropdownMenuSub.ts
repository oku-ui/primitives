import type { EmitsToHookProps } from '../shared/index.ts'
import { useControllableStateV2 } from '../hooks/index.ts'
import { useMenuSub } from '../menu/index.ts'

export interface DropdownMenuSubProps {
  open?: boolean
  defaultOpen?: boolean
}

export type DropdownMenuSubEmits = {
  'update:open': [open: boolean]
}

export interface UseDropdownMenuSubProps extends EmitsToHookProps<DropdownMenuSubEmits> {
  open?: () => boolean | undefined
  defaultOpen?: boolean
}

export function useDropdownMenuSub(props: UseDropdownMenuSubProps = {}) {
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
