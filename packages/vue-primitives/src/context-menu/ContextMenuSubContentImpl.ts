import {
  type MenuSubContentImplEmits,
  type MenuSubContentImplProps,
  type UseMenuContentImplSharedPeturns,
  useMenuSubContentImpl,
  type UseMenuSubContentImplProps,
} from '../menu/index.ts'

export interface ContextMenuSubContentImplProps extends MenuSubContentImplProps {

}

export type ContextMenuSubContentImplEmits = MenuSubContentImplEmits

export interface UseContextMenuSubContentImplProps extends UseMenuSubContentImplProps {}

export function useContextMenuSubContentImpl(props: UseContextMenuSubContentImplProps = {}): UseMenuContentImplSharedPeturns {
  const menuSubContentImpl = useMenuSubContentImpl(props)

  const attrs = {
    style: {
      '--radix-context-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
      '--radix-context-menu-content-available-width': 'var(--radix-popper-available-width)',
      '--radix-context-menu-content-available-height': 'var(--radix-popper-available-height)',
      '--radix-context-menu-trigger-width': 'var(--radix-popper-anchor-width)',
      '--radix-context-menu-trigger-height': 'var(--radix-popper-anchor-height)',
    },
  }

  return {
    wrapperAttrs: menuSubContentImpl.wrapperAttrs,
    attrs(extraAttrs = []) {
      return menuSubContentImpl.attrs([attrs, ...extraAttrs])
    },
  }
}
