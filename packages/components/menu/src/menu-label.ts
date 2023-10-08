import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import type { MenuLabelNativeElement } from './props'
import { MENU_LABEL_NAME, menuLabelProps, scopedMenuProps } from './props'

const menuLabel = defineComponent({
  name: MENU_LABEL_NAME,
  inheritAttrs: false,
  props: {
    ...menuLabelProps.props,
    ...scopedMenuProps,
  },
  emits: menuLabelProps.emits,

  setup(props, { attrs, slots }) {
    const {
      scopeOkuMenu: _scopeOkuMenu,
      ...otherPropsRef
    } = toRefs(props)

    const _other = reactive(otherPropsRef)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    return () => h(Primitive.div,
      {
        ...mergeProps(attrs, otherProps),
        ref: forwardedRef,
      }, slots,
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuLabel = menuLabel as typeof menuLabel &
(new () => { $props: MenuLabelNativeElement })
