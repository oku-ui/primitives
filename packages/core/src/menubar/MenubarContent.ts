import type { PrimitiveDefaultProps } from '../shared/index.ts'
import { type MenuContentProps, useMenuContent, type UseMenuContentProps } from '../menu/index.ts'

export interface MenubarContentProps extends MenuContentProps {}

export const DEFAULT_MENUBAR_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<MenubarContentProps>

export interface UseMenubarContentProps extends UseMenuContentProps {
}

export const useMenubarContent = useMenuContent
