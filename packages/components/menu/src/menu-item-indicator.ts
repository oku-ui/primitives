import { OkuPresence } from '@oku-ui/presence'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { getCheckedState, isIndeterminate } from './utils'
import type { MenuItemIndicatorNativeElement } from './props'
import { MENU_ITEM_INDICATOR_NAME, menuItemIndicatorProps, scopedMenuProps, useItemIndicatorInject } from './props'

const menuItemIndicator = defineComponent({
  name: MENU_ITEM_INDICATOR_NAME,
  components: {
    OkuPresence,
  },
  inheritAttrs: false,
  props: {
    ...menuItemIndicatorProps.props,
    // ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuItemIndicatorProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuMenu,
      forceMount,
    } = toRefs(props)

    const _reactive = reactive(menuItemIndicatorProps)
    const reactiveMenuItemIndicatorProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const indicatorInject = useItemIndicatorInject(MENU_ITEM_INDICATOR_NAME, scopeOkuMenu.value)

    return () => h(OkuPresence,
      {
        present: computed(() => forceMount.value || isIndeterminate(indicatorInject.checked.value) || indicatorInject.checked.value === true).value,
      },
      {
        default: () => h(Primitive.span,
          {
            ...mergeProps(attrs, reactiveMenuItemIndicatorProps),
            'ref': forwardedRef,
            'data-state': getCheckedState(indicatorInject.checked.value),
          }, slots,
        ),
      },
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuItemIndicator = menuItemIndicator as typeof menuItemIndicator &
(new () => { $props: MenuItemIndicatorNativeElement })
