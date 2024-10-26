import type { PrimitiveDefaultProps } from '../shared/index.ts'
import { type MenuSubContentProps, useMenuSubContent, type UseMenuSubContentProps } from '../menu/index.ts'

export interface ContextMenuSubContentProps extends MenuSubContentProps {}

export const DEFAULT_CONTEXT_MENU_SUB_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<ContextMenuSubContentProps>

export interface UseContextMenuSubContentProps extends UseMenuSubContentProps {
}

export const useContextMenuSubContent = useMenuSubContent
