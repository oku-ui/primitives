import type { EmitsToHookProps, PrimitiveDefaultProps, PrimitiveElAttrs, RadixPrimitiveReturns } from '../shared/index.ts'
import { type CheckedState, isIndeterminate } from '../checkbox/index.ts'
import { type MenuItemEmits, type MenuItemProps, useMenuItem, type UseMenuItemProps } from './MenuItem.ts'
import { provideItemIndicatorContext } from './MenuItemIndicator.ts'
import { getCheckedState } from './utils.ts'

export interface MenuCheckboxItemProps extends MenuItemProps {
  checked?: CheckedState
}

export const DEFAULT_MENU_CHECKBOX_ITEM_PROPS = {
  disabled: undefined,
  checked: false,
} satisfies PrimitiveDefaultProps<MenuCheckboxItemProps>

export type MenuCheckboxItemEmits = {
  'update:checked': [event: boolean]
} & MenuItemEmits

export interface UseMenuCheckboxItemProps extends EmitsToHookProps<MenuCheckboxItemEmits>, UseMenuItemProps {
  checked?: () => CheckedState
}

export function useMenuCheckboxItem(props: UseMenuCheckboxItemProps): RadixPrimitiveReturns {
  const { checked = () => false } = props

  provideItemIndicatorContext({
    checked,
  })

  const menuItem = useMenuItem({
    ...props,
    onSelect(event) {
      props?.onSelect?.(event)

      if (props.onUpdateChecked) {
        const _checked = checked()
        props.onUpdateChecked(isIndeterminate(_checked) ? true : !_checked)
      }
    },
  })

  return {
    attrs(extraAttrs = []) {
      const _checked = checked()
      const menuItemAttrs: PrimitiveElAttrs = {
        'role': 'menuitemcheckbox',
        'aria-checked': isIndeterminate(_checked) ? 'mixed' : _checked,
        'data-state': getCheckedState(_checked),
      }

      return menuItem.attrs([menuItemAttrs, ...extraAttrs])
    },
  }
}
