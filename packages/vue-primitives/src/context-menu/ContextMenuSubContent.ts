import { type MenuSubContentProps, useMenuSubContent, type UseMenuSubContentProps } from '../menu/index.ts'

export interface ContextMenuSubContentProps extends MenuSubContentProps {}

export interface UseContextMenuSubContentProps extends UseMenuSubContentProps {
}

export const useContextMenuSubContent = useMenuSubContent
