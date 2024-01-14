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

    const openProxy = computed(() => {
      if (openProp.value === undefined && modelValue.value === undefined)
        return undefined
      if (openProp.value !== undefined)
        return openProp.value
      if (modelValue.value !== undefined)
        return modelValue.value
    })

    // const [open = ref(false), setOpen] = useControllable({
    const [open, setOpen] = useControllable({
      prop: computed(() => openProxy.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (result) => {
        emit('openChange', result)
        emit('update:modelValue', result)
      },
      initialValue: false,
    })

    popoverProvide({
      scope: scopeOkuPopover.value,
      contentId: computed(() => useId()),
      triggerRef,
      open,
      onOpenChange: setOpen,
      onOpenToggle: () => {
        setOpen(!open.value)
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
