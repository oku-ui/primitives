import { type MenuSubContentProps, useMenuSubContent, type UseMenuSubContentProps } from '../menu/index.ts'

export interface DropdownMenuSubContentProps extends MenuSubContentProps {}

export interface UseDropdownMenuSubContentProps extends UseMenuSubContentProps {
}

export const useDropdownMenuSubContent = useMenuSubContent
