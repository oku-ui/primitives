import { computed, defineComponent, h, toRefs, useModel } from 'vue'
import { useControllable } from '@oku-ui/use-composable'
import { OkuMenuSub } from '@oku-ui/menu'
import { CONTEXT_MENU_RADIO_ITEM_NAME, contextMenuSubProps, scopedContextMenuProps, useMenuScope } from './props'

const contextMenuSub = defineComponent({
  name: CONTEXT_MENU_RADIO_ITEM_NAME,
  components: {
    OkuMenuSub,
  },
  inheritAttrs: false,
  props: {
    ...contextMenuSubProps.props,
    ...scopedContextMenuProps,
  },
  emits: contextMenuSubProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuContextMenu,
      open: openProp,
      defaultOpen,
    } = toRefs(props)

    const menuScope = useMenuScope(scopeOkuContextMenu.value)

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

export const OkuContextMenuSub = contextMenuSub
