import { computed, defineComponent, h, onBeforeUnmount, ref, toRefs, useModel } from 'vue'
import { useControllable } from '@oku-ui/use-composable'
import { OkuPopper } from '@oku-ui/popper'
import { scopeHoverCardProps } from './utils'

import { HOVERCARD_NAME, createHoverCardScope, hoverCardProps, hoverCardProvide, usePopperScope } from './props'

export { usePopperScope }

const hoverCard = defineComponent({
  name: HOVERCARD_NAME,
  inheritAttrs: false,
  props: {
    ...hoverCardProps.props,
    ...scopeHoverCardProps,
  },
  setup(props, { slots, emit }) {
    const {
      scopeOkuHoverCard,
      open: openProp,
      defaultOpen,
      openDelay: openDelayProp,
      closeDelay: closeDelayProp,
    } = toRefs(props)

    const popperScope = usePopperScope(scopeOkuHoverCard.value)
    const openTimerRef = ref(0)
    const closeTimerRef = ref(0)
    const hasSelectionRef = ref(false)
    const isPointerDownOnContentRef = ref(false)

    const modelValue = useModel(props, 'modelValue')
    const proxyChecked = computed(() => modelValue.value !== undefined ? modelValue.value : openProp.value !== undefined ? openProp.value : undefined)

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (value) => {
        emit('openChange', value)
        modelValue.value = value
      },
      initialValue: false,
    })

    const handleOpen = () => {
      clearTimeout(closeTimerRef.value)
      openTimerRef.value = window.setTimeout(() => {
        updateValue(true)
      }, openDelayProp.value)
    }

    const handleClose = () => {
      clearTimeout(openTimerRef.value)
      if (!hasSelectionRef.value && !isPointerDownOnContentRef.value) {
        closeTimerRef.value = window.setTimeout(() => {
          updateValue(false)
        }, closeDelayProp.value)
      }
    }

    const handleDismiss = () => {
      updateValue(false)
    }

    onBeforeUnmount(() => {
      clearTimeout(openTimerRef.value)
      clearTimeout(closeTimerRef.value)
    })

    hoverCardProvide({
      scope: scopeOkuHoverCard.value,
      open: computed(() => state.value || false),
      onOpenChange: open => updateValue(open),
      onOpen: () => handleOpen(),
      onClose: () => handleClose(),
      onDismiss: () => handleDismiss(),
      hasSelectionRef,
      isPointerDownOnContentRef,
    })

    return () => h(OkuPopper, {
      ...popperScope,
    }, slots)
  },
})

export const OkuHoverCard = hoverCard

export {
  createHoverCardScope,
}
