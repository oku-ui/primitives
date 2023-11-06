import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuMenuArrow } from '@oku-ui/menu'
import { CONTEXT_MENU_ARROW_NAME, contextMenuArrowProps, scopedContextMenuProps, useMenuScope } from './props'
import type { ContextMenuArrowNativeElement } from './props'

const contextMenuArrow = defineComponent({
  name: CONTEXT_MENU_ARROW_NAME,
  components: {
    OkuMenuArrow,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuArrowProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuArrowProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuContextMenu,
      ...arrowProps
    } = toRefs(props)

    const _other = reactive(arrowProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const menuScope = useMenuScope(scopeOkuContextMenu.value)

    return () => h(OkuMenuArrow, {
      ...menuScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuContextMenuArrow = contextMenuArrow as typeof contextMenuArrow &
(new () => { $props: ContextMenuArrowNativeElement })
