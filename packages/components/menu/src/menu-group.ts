import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import type { MenuGroupNativeElement } from './props'
import { MENU_GROUP_NAME, menuGroupProps, scopedMenuProps } from './props'

const menuGroup = defineComponent({
  name: MENU_GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...menuGroupProps.props,
    ...scopedMenuProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuMenu: _sc, ...restProps } = toRefs(props)
    const _other = reactive(restProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    return () => h(Primitive.div,
      {
        ...mergeProps(attrs, otherProps),
        role: 'group',
        ref: forwardedRef,
      }, slots,
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuGroup = menuGroup as typeof menuGroup &
(new () => { $props: MenuGroupNativeElement })
