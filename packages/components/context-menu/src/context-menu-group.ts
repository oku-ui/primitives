import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuMenuGroup } from '@oku-ui/menu'
import { CONTEXT_MENU_GROUP_NAME, contextMenuGroupProps, scopedContextMenuProps, useMenuScope } from './props'
import type { ContextMenuGroupNativeElement } from './props'

const contextMenuGroup = defineComponent({
  name: CONTEXT_MENU_GROUP_NAME,
  components: {
    OkuMenuGroup,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuGroupProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuGroupProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuContextMenu,
      ...groupProps
    } = toRefs(props)

    const _other = reactive(groupProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const menuScope = useMenuScope(scopeOkuContextMenu.value)

    return () => h(OkuMenuGroup, {
      ...menuScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuContextMenuGroup = contextMenuGroup as typeof contextMenuGroup &
(new () => { $props: ContextMenuGroupNativeElement })
