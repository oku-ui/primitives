import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuMenuLabel } from '@oku-ui/menu'
import { DROPDOWN_MENU_LABEL_NAME, dropdownMenuLabelProps, scopedDropdownMenuProps, useMenuScope } from './props'
import type { DropdownMenuLabelNativeElement } from './props'

const dropdownMenuLabel = defineComponent({
  name: DROPDOWN_MENU_LABEL_NAME,
  components: {
    OkuMenuLabel,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuLabelProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuLabelProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuDropdownMenu,
      ...labelProps
    } = toRefs(props)

    const _other = reactive(labelProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)

    return () => h(OkuMenuLabel, {
      ...menuScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDropdownMenuLabel = dropdownMenuLabel as typeof dropdownMenuLabel &
(new () => { $props: DropdownMenuLabelNativeElement })
