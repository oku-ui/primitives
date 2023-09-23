import { defineComponent, h, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { itemIndicatorProvider } from './menu-item-indicator'
import { getCheckedState, isIndeterminate } from './utils'
import type { MenuCheckboxItemEmits, MenuCheckboxItemNaviteElement } from './props'
import { MENU_CHECKBOX_ITEM_NAME, menuCheckboxItemProps, scopedMenuProps } from './props'
import { OkuMenuItem } from './menu-item'

const menuCheckboxItem = defineComponent({
  name: MENU_CHECKBOX_ITEM_NAME,
  components: {
    OkuMenuItem,
  },
  inheritAttrs: false,
  props: {
    ...menuCheckboxItemProps.props,
    ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuCheckboxItemProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
      checked,
    } = toRefs(props)

    const forwardedRef = useForwardRef()

    itemIndicatorProvider(
      {
        scope: scopeOkuMenu.value,
        checked,
      },
    )

    return () => h(OkuMenuItem,
      {
        'role': 'menuitemcheckbox',
        'aria-checked': isIndeterminate(checked) ? 'mixed' : checked,
        ...attrs,
        'ref': forwardedRef,
        'data-state': getCheckedState(checked),
        'onSelect': composeEventHandlers<MenuCheckboxItemEmits['select'][0]>(() => {
          emit('checkedChange', isIndeterminate(checked) ? true : !checked.value)
        }, (event) => {
        }, { checkForDefaultPrevented: false }),
      }, slots,
    )
  },
})

export const OkuMenuCheckboxItem = menuCheckboxItem as typeof menuCheckboxItem &
(new () => { $props: MenuCheckboxItemNaviteElement })
