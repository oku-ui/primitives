import { defineComponent, h } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { MenuLabelNaviteElement } from './props'
import { MENU_LABEL_NAME, menuLabelProps, scopedMenuProps } from './props'

const menuLabel = defineComponent({
  name: MENU_LABEL_NAME,
  inheritAttrs: false,
  props: {
    ...menuLabelProps.props,
    ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuLabelProps.emits,

  setup(props, { attrs, slots }) {
    // const { scopeOkuMenu } = toRefs(props)

    const forwardedRef = useForwardRef()

    return () => h(Primitive.div,
      {
        ...attrs,
        ref: forwardedRef,
      }, slots,
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuLabel = menuLabel as typeof menuLabel &
(new () => { $props: MenuLabelNaviteElement })
