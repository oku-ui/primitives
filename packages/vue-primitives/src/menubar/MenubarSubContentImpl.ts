import type { PrimitiveDefaultProps } from '../shared'
import {
  type MenuSubContentImplEmits,
  type MenuSubContentImplProps,
  type UseMenuContentImplSharedPeturns,
  useMenuSubContentImpl,
  type UseMenuSubContentImplProps,
} from '../menu/index.ts'

export interface MenubarSubContentImplProps extends MenuSubContentImplProps { }

export const DEFAULT_MENUBAR_SUB_CONTENT_IMPL_PROPS = {
  avoidCollisions: undefined,
  hideWhenDetached: undefined,
  loop: undefined,
} satisfies PrimitiveDefaultProps<MenubarSubContentImplProps>

export type MenubarSubContentImplEmits = MenuSubContentImplEmits

export interface UseMenubarSubContentImplProps extends UseMenuSubContentImplProps { }

export function useMenubarSubContentImpl(props: UseMenubarSubContentImplProps = {}): UseMenuContentImplSharedPeturns {
  const menuSubContentImpl = useMenuSubContentImpl(props)

  const attrs = {
    'data-radix-menubar-content': '',
    'style': {
      '--radix-menubar-content-transform-origin': 'var(--radix-popper-transform-origin)',
      '--radix-menubar-content-available-width': 'var(--radix-popper-available-width)',
      '--radix-menubar-content-available-height': 'var(--radix-popper-available-height)',
      '--radix-menubar-trigger-width': 'var(--radix-popper-anchor-width)',
      '--radix-menubar-trigger-height': 'var(--radix-popper-anchor-height)',
    },
  }

  return {
    wrapperAttrs: menuSubContentImpl.wrapperAttrs,
    attrs(extraAttrs = []) {
      return menuSubContentImpl.attrs([attrs, ...extraAttrs])
    },
  }
}
