import type { MenuSubContentProps, UseMenuSubContentProps } from '../menu/index.ts'
import type { PrimitiveDefaultProps } from '../shared/index.ts'
import { useMenuSubContent } from '../menu/index.ts'

export interface ContextMenuSubContentProps extends MenuSubContentProps {}

export const DEFAULT_CONTEXT_MENU_SUB_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<ContextMenuSubContentProps>

export interface UseContextMenuSubContentProps extends UseMenuSubContentProps {
}

export const useContextMenuSubContent = useMenuSubContent
