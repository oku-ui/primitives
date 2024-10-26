import type { EmitsToHookProps } from '../shared/index.ts'
import { useControllableStateV2 } from '../hooks/index.ts'
import { useMenuSub } from '../menu/index.ts'

export interface MenubarSubProps {
  open?: boolean
  defaultOpen?: boolean
}

export type MenubarSubEmits = {
  'update:open': [open: boolean]
}

export interface UseMenubarSubProps extends EmitsToHookProps<MenubarSubEmits> {
  open?: () => boolean | undefined
  defaultOpen?: boolean
}

export function useMenubarSub(props: UseMenubarSubProps) {
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
