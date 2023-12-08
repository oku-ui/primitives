import { defineComponent, h, ref, toRefs } from 'vue'
import { OkuMenu } from '@oku-ui/menu'
import { CONTEXT_MENU_NAME, contextMenuProps, contextMenuProvider, scopedContextMenuProps, useMenuScope } from './props'

const contextMenu = defineComponent({
  name: CONTEXT_MENU_NAME,
  components: {
    OkuMenu,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuContextMenu,
      dir,
      modal,
    } = toRefs(props)

    const open = ref(false)
    const menuScope = useMenuScope(scopeOkuContextMenu.value)
    const handleOpenChangeProp = (open: boolean) => emit('openChange', open)

    const handleOpenChange = (_open: boolean) => {
      open.value = _open
      handleOpenChangeProp(_open)
    }

    contextMenuProvider({
      scope: scopeOkuContextMenu.value,
      open,
      onOpenChange: _open => handleOpenChange(_open),
      modal,
    })

    return () => h(OkuMenu, {
      ...attrs,
      ...menuScope,
      dir: dir.value,
      open: open.value,
      onOpenChange: _open => handleOpenChange(_open),
    }, slots)
  },
})

export const OkuContextMenu = contextMenu
