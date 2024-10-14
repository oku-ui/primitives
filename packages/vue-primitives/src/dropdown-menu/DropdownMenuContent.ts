import { type MenuContentProps, useMenuContent, type UseMenuContentProps } from '../menu/index.ts'

export interface DropdownMenuContentProps extends MenuContentProps {}

export interface UseDropdownMenuContentProps extends UseMenuContentProps {}

export const useDropdownMenuContent = useMenuContent
