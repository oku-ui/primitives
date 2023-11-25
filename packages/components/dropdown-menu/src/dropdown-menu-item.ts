import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuMenuItem } from '@oku-ui/menu'
import { DROPDOWN_MENU_ITEM_NAME, dropdownMenuItemProps, scopedDropdownMenuProps, useMenuScope } from './props'
import type { DropdownMenuItemNativeElement } from './props'

const dropdownMenuItem = defineComponent({
  name: DROPDOWN_MENU_ITEM_NAME,
  components: {
    OkuMenuItem,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuItemProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuItemProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuDropdownMenu,
      ...itemProps
    } = toRefs(props)

    const _other = reactive(itemProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)

    return () => h(OkuMenuItem, {
      ...menuScope,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDropdownMenuItem = dropdownMenuItem as typeof dropdownMenuItem &
(new () => { $props: DropdownMenuItemNativeElement })
