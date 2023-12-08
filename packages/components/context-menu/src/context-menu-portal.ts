import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit } from '@oku-ui/use-composable'
import { OkuMenuPortal } from '@oku-ui/menu'
import { CONTEXT_MENU_PORTAL_NAME, contextMenuPortalProps, scopedContextMenuProps, useMenuScope } from './props'

const contextMenuPortal = defineComponent({
  name: CONTEXT_MENU_PORTAL_NAME,
  components: {
    OkuMenuPortal,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuPortalProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuPortalProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuContextMenu,
      ...portalProps
    } = toRefs(props)

    const _other = reactive(portalProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const menuScope = useMenuScope(scopeOkuContextMenu.value)

    return () => h(OkuMenuPortal, {
      ...menuScope,
      ...mergeProps(attrs, otherProps),
    }, slots)
  },
})

export const OkuContextMenuPortal = contextMenuPortal
