import type { MenuContentElement, MenuSubTriggerElement } from './props'
import { OkuPopper } from '@oku-ui/popper'
import { useId } from '@oku-ui/use-composable'
import { computed, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { MENU_SUB_NAME, menuProvider, menuSubProps, menuSubProvider, scopedMenuProps, useMenuInject, usePopperScope } from './props'

const menuSub = defineComponent({
  name: MENU_SUB_NAME,
  components: {
    OkuPopper,
  },
  inheritAttrs: false,
  props: {
    ...menuSubProps.props,
    ...scopedMenuProps,
  },
  emits: menuSubProps.emits,
  setup(props, { emit, slots }) {
    const {
      scopeOkuMenu,
      open,
    } = toRefs(props)

    const parentMenuInject = useMenuInject(MENU_SUB_NAME, scopeOkuMenu.value)
    const popperScope = usePopperScope(scopeOkuMenu.value)
    const trigger = ref<MenuSubTriggerElement | null>(null)
    const content = ref<MenuContentElement | null>(null)
    const handleOpenChange = (open: boolean) => emit('openChange', open)

    // Prevent the parent menu from reopening with open submenus.
    watchEffect((onInvalidate) => {
      if (parentMenuInject.open.value === false)
        handleOpenChange(false)

      onInvalidate(() => handleOpenChange(false))
    })

    menuProvider({
      scope: scopeOkuMenu.value,
      open,
      onOpenChange: _open => handleOpenChange(_open),
      content,
      onContentChange: _content => content.value = _content,
    })

    menuSubProvider({
      scope: scopeOkuMenu.value,
      contentId: computed(() => useId()),
      triggerId: computed(() => useId()),
      trigger,
      onTriggerChange: _trigger => trigger.value = _trigger,
    })

    return () => h(OkuPopper, { ...popperScope }, slots)
  },
})

export const OkuMenuSub = menuSub
