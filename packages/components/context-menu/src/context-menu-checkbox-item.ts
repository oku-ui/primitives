import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuMenuCheckboxItem } from '@oku-ui/menu'
import { CONTEXT_MENU_CHECKBOX_ITEM_NAME, contextMenuCheckboxItemProps, scopedContextMenuProps, useMenuScope } from './props'
import type { ContextMenuCheckboxItemNativeElement } from './props'

const contextMenuCheckboxItem = defineComponent({
  name: CONTEXT_MENU_CHECKBOX_ITEM_NAME,
  components: {
    OkuMenuCheckboxItem,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuCheckboxItemProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuCheckboxItemProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuContextMenu,
      ...checkboxItemProps
    } = toRefs(props)

    const _other = reactive(checkboxItemProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const menuScope = useMenuScope(scopeOkuContextMenu.value)

    return () => h(OkuMenuCheckboxItem, {
      ...menuScope,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuContextMenuCheckboxItem = contextMenuCheckboxItem as typeof contextMenuCheckboxItem &
  (new () => { $props: ContextMenuCheckboxItemNativeElement })
