import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useId } from '@oku-ui/use-composable'
import { OkuPopper } from '@oku-ui/popper'
import type { MenuContentElement, MenuSubTriggerElement } from './props'
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
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
      open,
      ...restProps
    } = toRefs(props)

    const _other = reactive(restProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

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
      onOpenChange: handleOpenChange,
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

    return () => h(OkuPopper,
      {
        ...popperScope,
        ...mergeProps(attrs, otherProps),
      },
      slots,
    )
  },
})

export const OkuMenuSub = menuSub
