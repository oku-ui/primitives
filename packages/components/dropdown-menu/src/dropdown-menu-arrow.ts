import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuMenuArrow } from '@oku-ui/menu'
import { DROPDOWN_MENU_ARROW_NAME, dropdownMenuArrowProps, scopedDropdownMenuProps, useMenuScope } from './props'
import type { DropdownMenuArrowNativeElement } from './props'

const dropdownMenuArrow = defineComponent({
  name: DROPDOWN_MENU_ARROW_NAME,
  components: {
    OkuMenuArrow,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuArrowProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuArrowProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuDropdownMenu,
      ...arrowProps
    } = toRefs(props)

    const _other = reactive(arrowProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)

    return () => h(OkuMenuArrow, {
      ...menuScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDropdownMenuArrow = dropdownMenuArrow as typeof dropdownMenuArrow &
(new () => { $props: DropdownMenuArrowNativeElement })
