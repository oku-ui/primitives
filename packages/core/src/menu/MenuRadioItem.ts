import type { PrimitiveDefaultProps, PrimitiveElAttrs, RadixPrimitiveReturns } from '../shared'
import type { MenuItemEmits, MenuItemProps, UseMenuItemProps } from './MenuItem.ts'
import { useMenuItem } from './MenuItem.ts'
import { provideItemIndicatorContext } from './MenuItemIndicator.ts'
import { useRadioGroupContext } from './MenuRadioGroup.ts'
import { getCheckedState } from './utils.ts'

export interface MenuRadioItemProps extends MenuItemProps {
  value: string
}

export const DEFAULT_MENU_RADIO_ITEM_PROPS = {
  disabled: undefined,
} satisfies PrimitiveDefaultProps<MenuRadioItemProps>

export type MenuRadioItemEmits = MenuItemEmits

export interface UseMenuRadioItemProps {
  value: string
  menuItemProps?: UseMenuItemProps
}

export function useMenuRadioItem(props: UseMenuRadioItemProps): RadixPrimitiveReturns {
  const context = useRadioGroupContext('MenuRadioItem')

  provideItemIndicatorContext({
    checked() {
      return props.value === context.value()
    },
  })

  const menuItem = useMenuItem({
    ...props.menuItemProps,
    onSelect(event) {
      props.menuItemProps?.onSelect?.(event)

      context.onValueChange(props.value)
    },
  })

  return {
    attrs(extraAttrs = []) {
      const _checked = props.value === context.value()

      const menuItemAttrs: PrimitiveElAttrs = {
        'role': 'menuitemradio',
        'aria-checked': _checked,
        'data-state': getCheckedState(_checked),
      }

      return menuItem.attrs([menuItemAttrs, ...extraAttrs])
    },
  }
}
