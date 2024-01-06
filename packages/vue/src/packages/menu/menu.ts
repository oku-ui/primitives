import { defineComponent, h, onBeforeMount, onMounted, ref, toRefs } from 'vue'
import { OkuPopper } from '@oku-ui/popper'
import { useDirection } from '@oku-ui/direction'
import { MENU_NAME, menuProps, menuProvider, menuRootProvider, scopedMenuProps, usePopperScope } from './props'
import type { MenuContentElement } from './props'

const menu = defineComponent({
  name: MENU_NAME,
  components: {
    OkuPopper,
  },
  inheritAttrs: false,
  props: {
    ...menuProps.props,
    ...scopedMenuProps,
  },
  emits: menuProps.emits,
  setup(props, { emit, slots }) {
    const {
      scopeOkuMenu,
      open,
      dir,
      modal,
    } = toRefs(props)

    const popperScope = usePopperScope(scopeOkuMenu.value)
    const content = ref<MenuContentElement | null>(null)
    const isUsingKeyboardRef = ref(false)
    const handleOpenChange = (open: boolean) => emit('openChange', open)
    const direction = useDirection(dir.value)

    // Capture phase ensures we set the boolean before any side effects execute
    // in response to the key or pointer event as they might depend on this value.
    const handlePointer = () => (isUsingKeyboardRef.value = false)
    const handleKeyDown = () => {
      isUsingKeyboardRef.value = true
      document.addEventListener('pointerdown', handlePointer, { capture: true, once: true })
      document.addEventListener('pointermove', handlePointer, { capture: true, once: true })
    }

    onMounted(() => {
      document.addEventListener('keydown', handleKeyDown, { capture: true })
    })

    onBeforeMount(() => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true })
      document.removeEventListener('pointerdown', handlePointer, { capture: true })
      document.removeEventListener('pointermove', handlePointer, { capture: true })
    })

    menuProvider({
      scope: scopeOkuMenu.value,
      open,
      onOpenChange: _open => handleOpenChange(_open),
      content,
      onContentChange: _content => content.value = _content,
    })

    menuRootProvider({
      scope: scopeOkuMenu.value,
      onClose: () => handleOpenChange(false),
      isUsingKeyboardRef,
      dir: direction,
      modal,
    })

    return () => h(OkuPopper, { ...popperScope }, slots)
  },
})

export const OkuMenu = menu
