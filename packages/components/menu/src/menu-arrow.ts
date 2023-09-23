import { defineComponent, h, toRefs } from 'vue'
import { OkuPopperArrow } from '@oku-ui/popper'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { MenuArrowNaviteElement } from './props'
import { MENU_ARROW_NAME, menuArrowProps, scopedMenuProps, usePopperScope } from './props'

const menuArrow = defineComponent({
  name: MENU_ARROW_NAME,
  inheritAttrs: false,
  props: {
    ...menuArrowProps.props,
    ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuArrowProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuMenu } = toRefs(props)

    const forwardedRef = useForwardRef()

    const popperScope = usePopperScope(scopeOkuMenu.value)

    return () => h(OkuPopperArrow,
      {
        ...popperScope,
        ...attrs,
        ref: forwardedRef,
      }, slots,
    )
  },
})

export const OkuMenuArrow = menuArrow as typeof menuArrow &
(new () => { $props: MenuArrowNaviteElement })
