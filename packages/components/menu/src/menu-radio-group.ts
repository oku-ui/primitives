import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
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
    ...scopedMenuProps,
  },
  emits: menuRadioGroupProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
      value,
      ...restProps
    } = toRefs(props)

    const _other = reactive(restProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const handleValueChange = (value: string) => emit('valueChange', value)

    radioGroupProvider(
      {
        scope: scopeOkuMenu.value,
        value,
        onValueChange: handleValueChange,
      },
    )

    return () => h(OkuMenuGroup,
      {
        ...mergeProps(attrs, otherProps),
        ref: forwardedRef,
      }, slots,
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuRadioGroup = menuRadioGroup as typeof menuRadioGroup &
(new () => { $props: MenuRadioGroupNativeElement })
