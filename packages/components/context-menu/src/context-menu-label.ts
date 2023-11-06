import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuMenuLabel } from '@oku-ui/menu'
import { CONTEXT_MENU_LABEL_NAME, contextMenuLabelProps, scopedContextMenuProps, useMenuScope } from './props'
import type { ContextMenuLabelNativeElement } from './props'

const contextMenuLabel = defineComponent({
  name: CONTEXT_MENU_LABEL_NAME,
  components: {
    OkuMenuLabel,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuLabelProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuLabelProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuContextMenu,
      ...labelProps
    } = toRefs(props)

    const _other = reactive(labelProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const menuScope = useMenuScope(scopeOkuContextMenu.value)

    return () => h(OkuMenuLabel, {
      ...menuScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuContextMenuLabel = contextMenuLabel as typeof contextMenuLabel &
(new () => { $props: ContextMenuLabelNativeElement })
