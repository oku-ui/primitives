import type { PrimitiveElAttrs, RadixPrimitiveReturns } from '../shared'
import { type MenuItemEmits, type MenuItemProps, useMenuItem, type UseMenuItemProps } from './MenuItem.ts'
import { provideItemIndicatorContext } from './MenuItemIndicator.ts'
import { useRadioGroupContext } from './MenuRadioGroup.ts'
import { getCheckedState } from './utils.ts'

export interface MenuRadioItemProps extends MenuItemProps {
  value: string
}

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
