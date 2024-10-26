import type { EmitsToHookProps, PrimitiveDefaultProps } from '../shared/index.ts'
import { useControllableStateV2 } from '../hooks/index.ts'
import { useMenuSub } from '../menu/index.ts'

export interface DropdownMenuSubProps {
  open?: boolean
  defaultOpen?: boolean
}

export const DEFAULT_DROPDOWN_MENU_SUB_PROPS = {
  open: undefined,
  defaultOpen: undefined,
} satisfies PrimitiveDefaultProps<DropdownMenuSubProps>

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
