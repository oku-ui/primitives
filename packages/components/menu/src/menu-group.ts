import { defineComponent, h, mergeProps } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { MenuGroupNativeElement } from './props'
import { MENU_GROUP_NAME, menuGroupProps, scopedMenuProps } from './props'

const menuGroup = defineComponent({
  name: MENU_GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...menuGroupProps.props,
    ...scopedMenuProps,
  },
  emits: menuGroupProps.emits,

  setup(props, { attrs, slots }) {
    // const { scopeOkuMenu } = toRefs(props)

    // const _reactive = reactive(menuGroupProps)
    // const reactiveMenuGroupProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    return () => h(Primitive.div,
      {
        ...mergeProps(attrs, props),
        role: 'group',
        ref: forwardedRef,
      }, slots,
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuGroup = menuGroup as typeof menuGroup &
(new () => { $props: MenuGroupNativeElement })
