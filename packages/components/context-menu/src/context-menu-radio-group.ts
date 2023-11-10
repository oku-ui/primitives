import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuMenuRadioGroup } from '@oku-ui/menu'
import { CONTEXT_MENU_RADIO_GROUP_NAME, contextMenuRadioGroupProps, scopedContextMenuProps, useMenuScope } from './props'
import type { ContextMenuRadioGroupNativeElement } from './props'

const contextMenuRadioGroup = defineComponent({
  name: CONTEXT_MENU_RADIO_GROUP_NAME,
  components: {
    OkuMenuRadioGroup,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuRadioGroupProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuRadioGroupProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuContextMenu,
      ...radioGroupProps
    } = toRefs(props)

    const _other = reactive(radioGroupProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const menuScope = useMenuScope(scopeOkuContextMenu.value)

    return () => h(OkuMenuRadioGroup, {
      ...menuScope,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuContextMenuRadioGroup = contextMenuRadioGroup as typeof contextMenuRadioGroup &
(new () => { $props: ContextMenuRadioGroupNativeElement })
