import { defineComponent, h, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { useForwardRef } from '@oku-ui/use-composable'
import { itemIndicatorProvider } from './menu-item-indicator'
import { getCheckedState } from './utils'
import { OkuMenuItem } from './menu-item'
import type { MenuRadioItemEmits, MenuRadioItemNaviteElement } from './props'
import { MENU_RADIO_ITEM_NAME, menuRadioItemProps, scopedMenuProps, useRadioGroupInject } from './props'

const menuRadioItem = defineComponent({
  name: MENU_RADIO_ITEM_NAME,
  components: {
    OkuMenuItem,
  },
  inheritAttrs: false,
  props: {
    ...menuRadioItemProps.props,
    ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuRadioItemProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
      value,
    } = toRefs(props)

    const forwardedRef = useForwardRef()

    const inject = useRadioGroupInject(MENU_RADIO_ITEM_NAME, scopeOkuMenu.value)
    const checked = value.value === inject.value

    itemIndicatorProvider({
      scope: scopeOkuMenu.value,
      checked,
    })

    return h(OkuMenuItem,
      {
        'role': 'menuitemradio',
        'aria-checked': checked,
        ...attrs,
        'ref': forwardedRef,
        'data-state': getCheckedState(checked),
        'onSelect': composeEventHandlers<MenuRadioItemEmits['select'][0]>((event) => {
          emit('select', event)
        }, () => {
          inject.onValueChange?.(value.value)
        }, { checkForDefaultPrevented: false }),
      }, slots,
    )
  },
})

export const OkuMenuRadioItemProps = menuRadioItem as typeof menuRadioItem &
(new () => { $props: MenuRadioItemNaviteElement })
