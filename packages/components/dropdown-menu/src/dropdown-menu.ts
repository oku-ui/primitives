import { computed, defineComponent, h, ref, toRefs, useModel } from 'vue'
import { useControllable, useId } from '@oku-ui/use-composable'
import { OkuMenu } from '@oku-ui/menu'
import { DROPDOWN_MENU_NAME, dropdownMenuProps, dropdownMenuProvider, scopedDropdownMenuProps, useMenuScope } from './props'

const dropdownMenu = defineComponent({
  name: DROPDOWN_MENU_NAME,
  components: {
    OkuMenu,
  },
  inheritAttrs: false,
  props: {
    ...dropdownMenuProps.props,
    ...scopedDropdownMenuProps,
  },
  emits: dropdownMenuProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuDropdownMenu,
      dir,
      open: openProp,
      defaultOpen,
      modal,
    } = toRefs(props)

    const menuScope = useMenuScope(scopeOkuDropdownMenu.value)
    const triggerRef = ref<HTMLButtonElement | null>(null)

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
      initialValue: false,
    })

    dropdownMenuProvider({
      scope: scopeOkuDropdownMenu.value,
      triggerId: computed(() => useId()),
      triggerRef,
      contentId: computed(() => useId()),
      open: computed(() => state.value),
      onOpenChange: _open => updateValue(_open),
      onOpenToggle: () => updateValue(!state.value),
      modal,
    })

    return () => h(OkuMenu, {
      ...attrs,
      ...menuScope,
      open: state.value,
      onOpenChange: _open => updateValue(_open),
      dir: dir.value,
      modal: modal.value,
    }, slots)
  },
})

export const OkuDropdownMenu = dropdownMenu
