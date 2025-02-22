import type { MenuSubTriggerProps, UseMenuSubTriggerProps } from '../menu/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared'
import { useMenuSubTrigger } from '../menu/index.ts'

export interface MenubarSubTriggerProps extends MenuSubTriggerProps {}

export const DEFAULT_MENUBAR_SUB_TRIGGER_PROPS = {
  disabled: undefined,
} satisfies PrimitiveDefaultProps<MenubarSubTriggerProps>

export interface UseMenubarSubTriggerProps extends UseMenuSubTriggerProps {

}

export function useMenubarSubTrigger(props: UseMenubarSubTriggerProps = {}): RadixPrimitiveReturns {
  const menuSubTrigger = useMenuSubTrigger(props)

  const attrs = {
    'data-radix-menubar-subtrigger': '',
  }

  return {
    attrs(extraAttrs = []) {
      return menuSubTrigger.attrs([attrs, ...extraAttrs])
    },
  }
}
