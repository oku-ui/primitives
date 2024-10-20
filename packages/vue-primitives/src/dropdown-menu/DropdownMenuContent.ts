import type { PrimitiveDefaultProps } from '../shared/index.ts'
import { type MenuContentProps, useMenuContent, type UseMenuContentProps } from '../menu/index.ts'

export interface DropdownMenuContentProps extends MenuContentProps {}

export const DEFAULT_DROPDOWN_MENU_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<DropdownMenuContentProps>

export interface UseDropdownMenuContentProps extends UseMenuContentProps {}

export const useDropdownMenuContent = useMenuContent
