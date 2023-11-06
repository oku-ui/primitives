import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuMenuItem } from '@oku-ui/menu'
import { CONTEXT_MENU_ITEM_NAME, contextMenuItemProps, scopedContextMenuProps, useMenuScope } from './props'
import type { ContextMenuItemNativeElement } from './props'

const contextMenuItem = defineComponent({
  name: CONTEXT_MENU_ITEM_NAME,
  components: {
    OkuMenuItem,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuItemProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuItemProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuContextMenu,
      ...itemProps
    } = toRefs(props)

    const _other = reactive(itemProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const menuScope = useMenuScope(scopeOkuContextMenu.value)

    return () => h(OkuMenuItem, {
      ...menuScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuContextMenuItem = contextMenuItem as typeof contextMenuItem &
(new () => { $props: ContextMenuItemNativeElement })
