import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuMenuRadioGroup } from '@oku-ui/menu'
import { DROPDOWN_MENU_RADIO_GROUP_NAME, dropdownMenuRadioGroupProps, scopedDropdownMenuProps, useMenuScope } from './props'
import type { DropdownMenuRadioGroupNativeElement } from './props'

const dropdownMenuRadioGroup = defineComponent({
  name: DROPDOWN_MENU_RADIO_GROUP_NAME,
  components: {
    OkuMenuRadioGroup,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuRadioGroupProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuRadioGroupProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuDropdownMenu,
      ...radioGroupProps
    } = toRefs(props)

    const _other = reactive(radioGroupProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)

    return () => h(OkuMenuRadioGroup, {
      ...menuScope,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDropdownMenuRadioGroup = dropdownMenuRadioGroup as typeof dropdownMenuRadioGroup &
(new () => { $props: DropdownMenuRadioGroupNativeElement })
