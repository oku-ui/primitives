import type { PrimitiveDefaultProps } from '../shared/index.ts'
import { type MenuSubContentProps, useMenuSubContent, type UseMenuSubContentProps } from '../menu/index.ts'

export interface DropdownMenuSubContentProps extends MenuSubContentProps {}

export const DEFAULT_DROPDOWN_MENU_SUB_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<DropdownMenuSubContentProps>

export interface UseDropdownMenuSubContentProps extends UseMenuSubContentProps {
}

export const useDropdownMenuSubContent = useMenuSubContent
