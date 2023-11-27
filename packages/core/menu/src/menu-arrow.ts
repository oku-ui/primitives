import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { OkuPopperArrow } from '@oku-ui/popper'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import type { MenuArrowNativeElement } from './props'
import { MENU_ARROW_NAME, menuArrowProps, scopedMenuProps, usePopperScope } from './props'

const menuArrow = defineComponent({
  name: MENU_ARROW_NAME,
  inheritAttrs: false,
  props: {
    ...menuArrowProps.props,
    ...scopedMenuProps,
  },
  emits: menuArrowProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuMenu, ...otherPropsRef } = toRefs(props)

    const _other = reactive(otherPropsRef)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    // const listeners = useListeners()

    const popperScope = usePopperScope(scopeOkuMenu.value)

    return () => h(OkuPopperArrow, {
      ...popperScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuArrow = menuArrow as typeof menuArrow &
  (new () => { $props: MenuArrowNativeElement })
