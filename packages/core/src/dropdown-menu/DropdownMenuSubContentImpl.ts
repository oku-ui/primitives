import type { MenuSubContentImplEmits, MenuSubContentImplProps, UseMenuContentImplSharedPeturns, UseMenuSubContentImplProps } from '../menu/index.ts'
import type { PrimitiveDefaultProps } from '../shared/index.ts'
import {

  useMenuSubContentImpl,

} from '../menu/index.ts'

export interface DropdownMenuSubContentImplProps extends MenuSubContentImplProps {

}

export const DEFAULT_DROPDOWN_MENU_SUB_CONTENT_IMPL_PROPS = {
  avoidCollisions: undefined,
  hideWhenDetached: undefined,
  loop: undefined,
} satisfies PrimitiveDefaultProps<DropdownMenuSubContentImplProps>

export type DropdownMenuSubContentImplEmits = MenuSubContentImplEmits

export interface UseDropdownMenuSubContentImplProps extends UseMenuSubContentImplProps {}

export function useDropdownMenuSubContentImpl(props: UseDropdownMenuSubContentImplProps = {}): UseMenuContentImplSharedPeturns {
  const menuSubContentImpl = useMenuSubContentImpl(props)

  const attrs = {
    style: {
      '--radix-dropdown-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
      '--radix-dropdown-menu-content-available-width': 'var(--radix-popper-available-width)',
      '--radix-dropdown-menu-content-available-height': 'var(--radix-popper-available-height)',
      '--radix-dropdown-menu-trigger-width': 'var(--radix-popper-anchor-width)',
      '--radix-dropdown-menu-trigger-height': 'var(--radix-popper-anchor-height)',
    },
  }

  return {
    wrapperAttrs: menuSubContentImpl.wrapperAttrs,
    attrs(extraAttrs = []) {
      return menuSubContentImpl.attrs([attrs, ...extraAttrs])
    },
  }
}
