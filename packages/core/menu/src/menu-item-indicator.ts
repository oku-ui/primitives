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
    ...scopedMenuProps,
  },
  setup(props, { attrs, slots }) {
    const {
      scopeOkuMenu,
      forceMount,
      ...restProps
    } = toRefs(props)

    const _other = reactive(restProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const indicatorInject = useItemIndicatorInject(MENU_ITEM_INDICATOR_NAME, scopeOkuMenu.value)

    return () => h(OkuPresence, { present: computed(() => forceMount.value || isIndeterminate(indicatorInject.checked.value) || indicatorInject.checked.value === true).value }, {
      default: () => h(Primitive.span, {
        ...mergeProps(attrs, otherProps),
        'ref': forwardedRef,
        'data-state': getCheckedState(indicatorInject.checked.value),
      }, slots.default?.()),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuItemIndicator = menuItemIndicator as typeof menuItemIndicator &
(new () => { $props: MenuItemIndicatorNativeElement })
