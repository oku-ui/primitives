import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuMenuSeparator } from '@oku-ui/menu'
import { CONTEXT_MENU_SEPARATOR_NAME, contextMenuSeparatorProps, scopedContextMenuProps, useMenuScope } from './props'
import type { ContextMenuSeparatorNativeElement } from './props'

const contextMenuSeparator = defineComponent({
  name: CONTEXT_MENU_SEPARATOR_NAME,
  components: {
    OkuMenuSeparator,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuSeparatorProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuSeparatorProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuContextMenu,
      ...separatorProps
    } = toRefs(props)

    const _other = reactive(separatorProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const menuScope = useMenuScope(scopeOkuContextMenu.value)

    return () => h(OkuMenuSeparator, {
      ...menuScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuContextMenuSeparator = contextMenuSeparator as typeof contextMenuSeparator &
(new () => { $props: ContextMenuSeparatorNativeElement })
