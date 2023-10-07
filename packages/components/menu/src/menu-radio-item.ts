import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { composeEventHandlers } from '@oku-ui/utils'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { getCheckedState } from './utils'
import { OkuMenuItem } from './menu-item'
import type { MenuRadioItemEmits, MenuRadioItemNativeElement } from './props'
import { MENU_RADIO_ITEM_NAME, itemIndicatorProvider, menuRadioItemProps, scopedMenuProps, useRadioGroupInject } from './props'

const menuRadioItem = defineComponent({
  name: MENU_RADIO_ITEM_NAME,
  components: {
    OkuMenuItem,
  },
  inheritAttrs: false,
  props: {
    ...menuRadioItemProps.props,
    // ...primitiveProps,
    ...scopedMenuProps,
  },
  emits: menuRadioItemProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
      value,
    } = toRefs(props)

    const _reactive = reactive(menuRadioItemProps)
    const reactiveMenuRadioItemProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useRadioGroupInject(MENU_RADIO_ITEM_NAME, scopeOkuMenu.value)
    const checked = computed(() => value.value === inject.value)

    itemIndicatorProvider({
      scope: scopeOkuMenu.value,
      checked,
    })

    return h(OkuMenuItem,
      {
        'role': 'menuitemradio',
        'aria-checked': checked.value,
        ...mergeProps(attrs, reactiveMenuRadioItemProps),
        'ref': forwardedRef,
        'data-state': getCheckedState(checked.value),
        'onSelect': composeEventHandlers<MenuRadioItemEmits['select'][0]>((event) => {
          emit('select', event)
        }, () => inject.onValueChange?.(value.value!), { checkForDefaultPrevented: false }),
      }, slots,
    )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuRadioItem = menuRadioItem as typeof menuRadioItem &
(new () => { $props: MenuRadioItemNativeElement })
