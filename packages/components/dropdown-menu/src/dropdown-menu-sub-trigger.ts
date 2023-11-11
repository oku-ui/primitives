import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuMenuSubTrigger } from '@oku-ui/menu'
import { DROPDOWN_MENU_SUB_TRIGGER_NAME, dropdownMenuSubTriggerProps, scopedDropdownMenuProps, useMenuScope } from './props'
import type { DropdownMenuSubTriggerNativeElement } from './props'

const dropdownMenuSubTrigger = defineComponent({
  name: DROPDOWN_MENU_SUB_TRIGGER_NAME,
  components: {
    OkuMenuSubTrigger,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuSubTriggerProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuSubTriggerProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuDropdownMenu,
      ...triggerItemProps
    } = toRefs(props)

    const _other = reactive(triggerItemProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)

    return () => h(OkuMenuSubTrigger, {
      ...menuScope,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDropdownMenuSubTrigger = dropdownMenuSubTrigger as typeof dropdownMenuSubTrigger &
(new () => { $props: DropdownMenuSubTriggerNativeElement })
