import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuMenuSubTrigger } from '@oku-ui/menu'
import { CONTEXT_MENU_SUB_TRIGGER_NAME, contextMenuSubTriggerProps, scopedContextMenuProps, useMenuScope } from './props'
import type { ContextMenuSubTriggerNativeElement } from './props'

const contextMenuSubTrigger = defineComponent({
  name: CONTEXT_MENU_SUB_TRIGGER_NAME,
  components: {
    OkuMenuSubTrigger,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuSubTriggerProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuSubTriggerProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuContextMenu,
      ...triggerItemProps
    } = toRefs(props)

    const _other = reactive(triggerItemProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const menuScope = useMenuScope(scopeOkuContextMenu.value)

    return () => h(OkuMenuSubTrigger, {
      ...menuScope,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuContextMenuSubTrigger = contextMenuSubTrigger as typeof contextMenuSubTrigger &
(new () => { $props: ContextMenuSubTriggerNativeElement })
