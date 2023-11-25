import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuMenuSubContent } from '@oku-ui/menu'
import { DROPDOWN_MENU_SUB_CONTENT_NAME, dropdownMenuSubContentProps, scopedDropdownMenuProps, useMenuScope } from './props'
import type { DropdownMenuSubContentNativeElement } from './props'

const dropdownMenuSubContent = defineComponent({
  name: DROPDOWN_MENU_SUB_CONTENT_NAME,
  components: {
    OkuMenuSubContent,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuSubContentProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuSubContentProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuDropdownMenu,
      ...subContentProps
    } = toRefs(props)

    const _other = reactive(subContentProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)

    return () => h(OkuMenuSubContent, {
      ...menuScope,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
      style: {
        ...attrs.style as any,
        // re-namespace exposed content custom properties
        ...{
          '--oku-dropdown-menu-content-transform-origin': 'var(--oku-popper-transform-origin)',
          '--oku-dropdown-menu-content-available-width': 'var(--oku-popper-available-width)',
          '--oku-dropdown-menu-content-available-height': 'var(--oku-popper-available-height)',
          '--oku-dropdown-menu-trigger-width': 'var(--oku-popper-anchor-width)',
          '--oku-dropdown-menu-trigger-height': 'var(--oku-popper-anchor-height)',
        },
      },
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuDropdownMenuSubContent = dropdownMenuSubContent as typeof dropdownMenuSubContent &
(new () => { $props: DropdownMenuSubContentNativeElement })
