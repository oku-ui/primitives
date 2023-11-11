import { computed, defineComponent, h, toRefs, useModel } from 'vue'
import { useControllable } from '@oku-ui/use-composable'
import { OkuMenuSub } from '@oku-ui/menu'
import { DROPDOWN_MENU_RADIO_ITEM_NAME, dropdownMenuSubProps, scopedDropdownMenuProps, useMenuScope } from './props'

const dropdownMenuSub = defineComponent({
  name: DROPDOWN_MENU_RADIO_ITEM_NAME,
  components: {
    OkuMenuSub,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuSubProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuSubProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuDropdownMenu,
      open: openProp,
      defaultOpen,
    } = toRefs(props)

    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)

    const modelValue = useModel(props, 'modelValue')
    const proxyChecked = computed({
      get: () => modelValue.value !== undefined ? modelValue.value : openProp.value !== undefined ? openProp.value : undefined,
      set: () => {
      },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (result: any) => {
        modelValue.value = result
        emit('openChange', result)
        emit('update:modelValue', result)
      },
    })

    return () => h(OkuMenuSub, {
      ...attrs,
      ...menuScope,
      open: state.value,
      onOpenChange: _open => updateValue(_open),
    }, slots)
  },
})

export const OkuDropdownMenuSub = dropdownMenuSub
