import type { MenuSubContentProps, UseMenuSubContentProps } from '../menu/index.ts'
import type { PrimitiveDefaultProps } from '../shared'
import { useMenuSubContent } from '../menu/index.ts'

export interface MenubarSubContentProps extends MenuSubContentProps {}

export const DEFAULT_MENUBAR_SUB_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<MenubarSubContentProps>

export interface UseMenubarSubContentProps extends UseMenuSubContentProps {}

export const useMenubarSubContent = useMenuSubContent
