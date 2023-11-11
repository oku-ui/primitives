import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuMenuCheckboxItem } from '@oku-ui/menu'
import { DROPDOWN_MENU_CHECKBOX_ITEM_NAME, dropdownMenuCheckboxItemProps, scopedDropdownMenuProps, useMenuScope } from './props'
import type { DropdownMenuCheckboxItemNativeElement } from './props'

const dropdownMenuCheckboxItem = defineComponent({
  name: DROPDOWN_MENU_CHECKBOX_ITEM_NAME,
  components: {
    OkuMenuCheckboxItem,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuCheckboxItemProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuCheckboxItemProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuDropdownMenu,
      ...checkboxItemProps
    } = toRefs(props)

    const _other = reactive(checkboxItemProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)

    return () => h(OkuMenuCheckboxItem, {
      ...menuScope,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDropdownMenuCheckboxItem = dropdownMenuCheckboxItem as typeof dropdownMenuCheckboxItem &
(new () => { $props: DropdownMenuCheckboxItemNativeElement })
