import { computed, defineComponent, h, ref, toRefs, useModel } from 'vue'
import { useControllable, useId } from '@oku-ui/use-composable'
import { OkuPopper } from '@oku-ui/popper'
import { POPOVER_NAME, popoverProps, popoverProvide, scopePopoverProps, usePopperScope } from './props'

const popover = defineComponent({
  name: POPOVER_NAME,
  inheritAttrs: false,
  props: {
    ...popoverProps.props,
    ...scopePopoverProps,
  },
  emits: popoverProps.emits,
  setup(props, { slots, emit }) {
    const {
      modelValue: _modelValue,
      open: openProp,
      defaultOpen,
      modal,
      scopeOkuPopover,
    } = toRefs(props)

    const popperScope = usePopperScope(scopeOkuPopover.value)

    const triggerRef = ref<HTMLButtonElement | null>(null)
    const hasCustomAnchor = ref(false)

    const modelValue = useModel(props, 'modelValue')

    const proxyChecked = computed(() => {
      if (modelValue.value !== undefined)
        return modelValue.value

      else if (openProp.value !== undefined)
        return openProp.value

      else
        return undefined
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (result: any) => {
        modelValue.value = result
        emit('openChange', result)
      },
      initialValue: false,
    })

    popoverProvide({
      scope: scopeOkuPopover.value,
      contentId: computed(() => useId()),
      triggerRef,
      open: state,
      onOpenChange: updateValue,
      onOpenToggle: () => {
        updateValue(!state.value)
      },
      hasCustomAnchor,
      onCustomAnchorAdd: () => {
        hasCustomAnchor.value = true
      },
      onCustomAnchorRemove: () => {
        hasCustomAnchor.value = false
      },
      modal,
    })

    return () => h(OkuPopper, {
      ...popperScope,
    }, () => slots.default?.())
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopover = popover
