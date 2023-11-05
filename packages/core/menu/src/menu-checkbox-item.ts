import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { getCheckedState, isIndeterminate } from './utils'
import type { MenuCheckboxItemEmits, MenuCheckboxItemNativeElement } from './props'
import { MENU_CHECKBOX_ITEM_NAME, itemIndicatorProvider, menuCheckboxItemProps, scopedMenuProps } from './props'
import { OkuMenuItem } from './menu-item'

const menuCheckboxItem = defineComponent({
  name: MENU_CHECKBOX_ITEM_NAME,
  components: {
    OkuMenuItem,
  },
  inheritAttrs: false,
  props: {
    ...menuCheckboxItemProps.props,
    ...scopedMenuProps,
  },
  emits: menuCheckboxItemProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuMenu,
      checked,
      ...otherPropsRef
    } = toRefs(props)

    const _other = reactive(otherPropsRef)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    // const emits = useListeners()

    itemIndicatorProvider({
      scope: scopeOkuMenu.value,
      checked,
    })

    return () => h(OkuMenuItem, {
      'role': 'menuitemcheckbox',
      'aria-checked': isIndeterminate(checked.value) ? 'mixed' : checked.value,
      ...mergeProps(attrs, otherProps),
      'ref': forwardedRef,
      'data-state': getCheckedState(checked.value),
      'onSelect': composeEventHandlers<MenuCheckboxItemEmits['select'][0]>((event) => {
        emit('select', event)
      }, () => {
        emit('checkedChange', isIndeterminate(checked.value) ? true : !checked.value)
      }, { checkForDefaultPrevented: false }),
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuMenuCheckboxItem = menuCheckboxItem as typeof menuCheckboxItem &
(new () => { $props: MenuCheckboxItemNativeElement })
