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
    ...scopedMenuProps,
  },
  emits: menuRadioItemProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
      value,
      ...restProps
    } = toRefs(props)

    const _other = reactive(restProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    // const emits = useListeners()

    const inject = useRadioGroupInject(MENU_RADIO_ITEM_NAME, scopeOkuMenu.value)
    const checked = computed(() => value.value === inject.value?.value)

    itemIndicatorProvider({
      scope: scopeOkuMenu.value,
      checked,
    })

    return () => h(OkuMenuItem, {
      'role': 'menuitemradio',
      'aria-checked': checked.value,
      ...mergeProps(attrs, otherProps),
      'ref': forwardedRef,
      'data-state': getCheckedState(checked.value),
      'onSelect': composeEventHandlers<MenuRadioItemEmits['select'][0]>((event) => {
        emit('select', event)
      }, () => inject.onValueChange?.(value.value!), { checkForDefaultPrevented: false }),
    }, () => slots.default?.())
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuRadioItem = menuRadioItem as typeof menuRadioItem & (new () => { $props: MenuRadioItemNativeElement })
