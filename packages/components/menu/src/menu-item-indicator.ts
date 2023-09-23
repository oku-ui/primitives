import { OkuPresence } from '@oku-ui/presence'
import { computed, defineComponent, h, toRefs } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { getCheckedState, isIndeterminate } from './utils'
import type { MenuItemIndicatorNaviteElement } from './props'
import { MENU_ITEM_INDICATOR_NAME, menuItemIndicatorProps, scopedMenuProps, useItemIndicatorInject } from './props'

const menuItemIndicator = defineComponent({
  name: MENU_ITEM_INDICATOR_NAME,
  components: {
    OkuPresence,
  },
  inheritAttrs: false,
  props: {
    ...menuItemIndicatorProps.props,
    ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuItemIndicatorProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuMenu,
      forceMount,
    } = toRefs(props)

    const forwardedRef = useForwardRef()

    const indicatorInject = useItemIndicatorInject(MENU_ITEM_INDICATOR_NAME, scopeOkuMenu.value)

    return () => h(OkuPresence,
      {
        present: computed(() => forceMount.value || isIndeterminate(indicatorInject.checked) || indicatorInject.checked === true).value,
      },
      {
        default: () => h(Primitive.span,
          {
            ...attrs,
            'ref': forwardedRef,
            'data-state': getCheckedState(indicatorInject.checked),
          }, slots,
        ),
      },
    )
  },
})

export const OkuMenuItemIndicator = menuItemIndicator as typeof menuItemIndicator &
(new () => { $props: MenuItemIndicatorNaviteElement })
