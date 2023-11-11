import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuMenuItemIndicator } from '@oku-ui/menu'
import { DROPDOWN_MENU_ITEM_INDICATOR_NAME, dropdownMenuItemIndicatorProps, scopedDropdownMenuProps, useMenuScope } from './props'
import type { DropdownMenuItemIndicatorNativeElement } from './props'

const dropdownMenuItemIndicator = defineComponent({
  name: DROPDOWN_MENU_ITEM_INDICATOR_NAME,
  components: {
    OkuMenuItemIndicator,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuItemIndicatorProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuItemIndicatorProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuDropdownMenu,
      ...itemIndicatorProps
    } = toRefs(props)

    const _other = reactive(itemIndicatorProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)

    return () => h(OkuMenuItemIndicator, {
      ...menuScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDropdownMenuItemIndicator = dropdownMenuItemIndicator as typeof dropdownMenuItemIndicator &
(new () => { $props: DropdownMenuItemIndicatorNativeElement })
