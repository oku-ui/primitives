import { defineComponent, h } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { MenuGroupNaviteElement } from './props'
import { MENU_GROUP_NAME, menuGroupProps, scopedMenuProps } from './props'

const menuGroup = defineComponent({
  name: MENU_GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...menuGroupProps.props,
    ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuGroupProps.emits,

  setup(props, { attrs, slots }) {
    // const { scopeOkuMenu } = toRefs(props)

    const forwardedRef = useForwardRef()

    return () => h(Primitive.div,
      {
        ...attrs,
        role: 'group',
        ref: forwardedRef,
      }, slots,
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuGroup = menuGroup as typeof menuGroup &
(new () => { $props: MenuGroupNaviteElement })
