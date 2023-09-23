import { defineComponent, h, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'
import type { MenuRadioGroupNaviteElement } from './props'
import { MENU_RADIO_GROUP_NAME, menuRadioGroupProps, radioGroupProvider, scopedMenuProps } from './props'
import { OkuMenuGroup } from './menu-group'

const menuRadioGroup = defineComponent({
  name: MENU_RADIO_GROUP_NAME,
  components: {
    OkuMenuGroup,
  },
  inheritAttrs: false,
  props: {
    ...menuRadioGroupProps.props,
    ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuRadioGroupProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
      value,
    } = toRefs(props)

    const forwardedRef = useForwardRef()

    const handleValueChange = value => emit('valueChange', value)

    radioGroupProvider(
      {
        scope: scopeOkuMenu.value,
        value,
        onValueChange: () => handleValueChange,
      },
    )

    return () => h(OkuMenuGroup,
      {
        ...attrs,
        ref: forwardedRef,
      }, slots,
    )
  },
})

export const OkuMenuRadioGroup = menuRadioGroup as typeof menuRadioGroup &
(new () => { $props: MenuRadioGroupNaviteElement })
