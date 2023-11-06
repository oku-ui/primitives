import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuMenuItemIndicator } from '@oku-ui/menu'
import { CONTEXT_MENU_ITEM_INDICATOR_NAME, contextMenuItemIndicatorProps, scopedContextMenuProps, useMenuScope } from './props'
import type { ContextMenuItemIndicatorNativeElement } from './props'

const contextMenuItemIndicator = defineComponent({
  name: CONTEXT_MENU_ITEM_INDICATOR_NAME,
  components: {
    OkuMenuItemIndicator,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuItemIndicatorProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuItemIndicatorProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuContextMenu,
      ...itemIndicatorProps
    } = toRefs(props)

    const _other = reactive(itemIndicatorProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const menuScope = useMenuScope(scopeOkuContextMenu.value)

    return () => h(OkuMenuItemIndicator, {
      ...menuScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuContextMenuItemIndicator = contextMenuItemIndicator as typeof contextMenuItemIndicator &
(new () => { $props: ContextMenuItemIndicatorNativeElement })
