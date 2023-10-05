import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import type { MenuSeparatorNaviteElement } from './props'
import { MENU_SEPARATOR_NAME, menuSeparatorProps, scopedMenuProps } from './props'

const menuSeparator = defineComponent({
  name: MENU_SEPARATOR_NAME,
  inheritAttrs: false,
  props: {
    ...menuSeparatorProps.props,
    // ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuSeparatorProps.emits,
  setup(props, { attrs, slots }) {
    // const { scopeOkuMenu } = toRefs(props)

    const _reactive = reactive(menuSeparatorProps)
    const reactiveMenuSeparatorProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    return () => h(Primitive.div,
      {
        'role': 'separator',
        'aria-orientation': 'horizontal',
        ...mergeProps(attrs, reactiveMenuSeparatorProps),
        'ref': forwardedRef,
      }, slots,
    )
  },
})

export const OkuMenuSeparator = menuSeparator as typeof menuSeparator &
(new () => { $props: MenuSeparatorNaviteElement })
