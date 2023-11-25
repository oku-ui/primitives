import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuMenuGroup } from '@oku-ui/menu'
import { DROPDOWN_MENU_GROUP_NAME, dropdownMenuGroupProps, scopedDropdownMenuProps, useMenuScope } from './props'
import type { DropdownMenuGroupNativeElement } from './props'

const dropdownMenuGroup = defineComponent({
  name: DROPDOWN_MENU_GROUP_NAME,
  components: {
    OkuMenuGroup,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuGroupProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuGroupProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuDropdownMenu,
      ...groupProps
    } = toRefs(props)

    const _other = reactive(groupProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)

    return () => h(OkuMenuGroup, {
      ...menuScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDropdownMenuGroup = dropdownMenuGroup as typeof dropdownMenuGroup &
(new () => { $props: DropdownMenuGroupNativeElement })
