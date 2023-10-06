import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'
import type { MenuRadioGroupNativeElement } from './props'
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
    // ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuRadioGroupProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
      value,
    } = toRefs(props)

    const _reactive = reactive(menuRadioGroupProps)
    const reactiveMenuRadioGroupProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const handleValueChange = (value: string) => emit('valueChange', value)

    radioGroupProvider(
      {
        scope: scopeOkuMenu.value,
        value,
        onValueChange: () => handleValueChange,
      },
    )

    return () => h(OkuMenuGroup,
      {
        ...mergeProps(attrs, reactiveMenuRadioGroupProps),
        ref: forwardedRef,
      }, slots,
    )
  },
})

export const OkuMenuRadioGroup = menuRadioGroup as typeof menuRadioGroup &
(new () => { $props: MenuRadioGroupNativeElement })
