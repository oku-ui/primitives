import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuMenuRadioItem } from '@oku-ui/menu'
import { CONTEXT_MENU_RADIO_ITEM_NAME, contextMenuRadioItemProps, scopedContextMenuProps, useMenuScope } from './props'
import type { ContextMenuRadioItemNativeElement } from './props'

const contextMenuRadioItem = defineComponent({
  name: CONTEXT_MENU_RADIO_ITEM_NAME,
  components: {
    OkuMenuRadioItem,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuRadioItemProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuRadioItemProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuContextMenu,
      ...radioItemProps
    } = toRefs(props)

    const _other = reactive(radioItemProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const menuScope = useMenuScope(scopeOkuContextMenu.value)

    return () => h(OkuMenuRadioItem, {
      ...menuScope,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuContextMenuRadioItem = contextMenuRadioItem as typeof contextMenuRadioItem &
(new () => { $props: ContextMenuRadioItemNativeElement })
