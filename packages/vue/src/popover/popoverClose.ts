import type { PopoverCloseEmits, PopoverCloseNaviteElement } from './props'
import { Primitive } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { CLOSE_NAME, popoverCloseProps, scopePopoverProps, usePopoverInject } from './props'

const popoverClose = defineComponent({
  name: CLOSE_NAME,
  inheritAttrs: false,
  props: {
    ...scopePopoverProps,
    ...popoverCloseProps.props,
  },
  setup(props, { attrs, slots, emit }) {
    const { scopeOkuPopover, ...closeProps } = toRefs(props)

    const _reactive = reactive(closeProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = usePopoverInject(CLOSE_NAME, scopeOkuPopover?.value)

    return () => h(Primitive.button, {
      type: 'button',
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
      onClick: composeEventHandlers<PopoverCloseEmits['click'][0]>((event) => {
        emit('click', event)
      }, () => inject.onOpenChange(false)),
    }, () => slots.default?.())
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverClose = popoverClose as typeof popoverClose & (new () => { $props: PopoverCloseNaviteElement })
