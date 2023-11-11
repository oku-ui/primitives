import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuMenuSeparator } from '@oku-ui/menu'
import { DROPDOWN_MENU_SEPARATOR_NAME, dropdownMenuSeparatorProps, scopedDropdownMenuProps, useMenuScope } from './props'
import type { DropdownMenuSeparatorNativeElement } from './props'

const dropdownMenuSeparator = defineComponent({
  name: DROPDOWN_MENU_SEPARATOR_NAME,
  components: {
    OkuMenuSeparator,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuSeparatorProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuSeparatorProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuDropdownMenu,
      ...separatorProps
    } = toRefs(props)

    const _other = reactive(separatorProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)

    return () => h(OkuMenuSeparator, {
      ...menuScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDropdownMenuSeparator = dropdownMenuSeparator as typeof dropdownMenuSeparator &
(new () => { $props: DropdownMenuSeparatorNativeElement })
