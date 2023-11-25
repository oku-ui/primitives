import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit } from '@oku-ui/use-composable'
import { OkuMenuPortal } from '@oku-ui/menu'
import { DROPDOWN_MENU_PORTAL_NAME, dropdownMenuPortalProps, scopedDropdownMenuProps, useMenuScope } from './props'

const dropdownMenuPortal = defineComponent({
  name: DROPDOWN_MENU_PORTAL_NAME,
  components: {
    OkuMenuPortal,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuPortalProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuPortalProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuDropdownMenu,
      ...portalProps
    } = toRefs(props)

    const _other = reactive(portalProps)
    const otherProps = reactiveOmit(_other, (key, _value) => key === undefined)

    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)

    return () => h(OkuMenuPortal, {
      ...menuScope,
      ...mergeProps(attrs, otherProps),
    }, slots)
  },
})

export const OkuDropdownMenuPortal = dropdownMenuPortal
