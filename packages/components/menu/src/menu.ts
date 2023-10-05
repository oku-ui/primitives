import { defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { OkuPopper } from '@oku-ui/popper'
import { useDirection } from '@oku-ui/direction'
import { primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit } from '@oku-ui/use-composable'
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
    // ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
      open,
      dir,
      modal,
    } = toRefs(props)

    // const _reactive = reactive(menuProps)
    // const reactiveMenuProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const popperScope = usePopperScope(scopeOkuMenu.value)
    const content = ref<MenuContentElement | null>(null)
    const isUsingKeyboardRef = ref(false)
    const handleOpenChange = (open: boolean) => emit('openChange', open)
    const direction = useDirection(dir.value)

    watchEffect((onInvalidate) => {
      // Capture phase ensures we set the boolean before any side effects execute
      // in response to the key or pointer event as they might depend on this value.
      const handlePointer = () => (isUsingKeyboardRef.value = false)
      const handleKeyDown = () => {
        isUsingKeyboardRef.value = true
        document.addEventListener('pointerdown', handlePointer, { capture: true, once: true })
        document.addEventListener('pointermove', handlePointer, { capture: true, once: true })
      }
      document.addEventListener('keydown', handleKeyDown, { capture: true })

      onInvalidate(() => {
        document.removeEventListener('keydown', handleKeyDown, { capture: true })
        document.removeEventListener('pointerdown', handlePointer, { capture: true })
        document.removeEventListener('pointermove', handlePointer, { capture: true })
      })
    })

    menuProvider({
      scope: scopeOkuMenu.value,
      open,
      onOpenChange: handleOpenChange,
      content,
      onContentChange: (_content: MenuContentElement) => content.value = _content,
    })

    menuRootProvider({
      scope: scopeOkuMenu.value,
      onClose: () => handleOpenChange(false),
      isUsingKeyboardRef,
      dir: direction,
      modal,
    })

    return () => h(OkuPopper,
      {
        ...mergeProps(attrs, popperScope),
        // ...attrs,
        // ...popperScope,
      },
      {
        default: () => slots.default?.(),
      },
    )
  },
})

export const OkuMenu = menu
