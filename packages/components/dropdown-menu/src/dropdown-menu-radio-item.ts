import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuMenuRadioItem } from '@oku-ui/menu'
import { DROPDOWN_MENU_RADIO_ITEM_NAME, dropdownMenuRadioItemProps, scopedDropdownMenuProps, useMenuScope } from './props'
import type { DropdownMenuRadioItemNativeElement } from './props'

const dropdownMenuRadioItem = defineComponent({
  name: DROPDOWN_MENU_RADIO_ITEM_NAME,
  components: {
    OkuMenuRadioItem,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuRadioItemProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuRadioItemProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuDropdownMenu,
      ...radioItemProps
    } = toRefs(props)

    const _other = reactive(radioItemProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)

    return () => h(OkuMenuRadioItem, {
      ...menuScope,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDropdownMenuRadioItem = dropdownMenuRadioItem as typeof dropdownMenuRadioItem &
(new () => { $props: DropdownMenuRadioItemNativeElement })
