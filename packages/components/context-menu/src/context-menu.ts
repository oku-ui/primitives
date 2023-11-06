import { defineComponent, h, onMounted, ref, toRefs } from 'vue'
import { OkuMenu } from '@oku-ui/menu'
import { CONTEXT_MENU_NAME, ContextMenuProvider, contextMenuProps, scopedContextMenuProps, useMenuScope } from './props'

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

    ContextMenuProvider({
      scope: scopeOkuContextMenu.value,
      open,
      onOpenChange: open => handleOpenChange(open),
      modal,
    })

    return () => h(OkuMenu, {
      ...attrs,
      ...menuScope,
      dir: dir.value,
      open: open.value,
      onOpenChange: open => handleOpenChange(open),
    }, slots)
  },
})

export const OkuContextMenu = contextMenu
