import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPopperArrow } from '@oku-ui/popper'
import type { PopoverArrowNaviteElement } from './props'
import { ARROW_NAME, popoverArrowProps, scopePopoverProps, usePopperScope } from './props'

const popoverArrow = defineComponent({
  name: ARROW_NAME,
  inheritAttrs: false,
  props: {
    ...popoverArrowProps.props,
    ...scopePopoverProps,
  },
  emits: popoverArrowProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuPopover, ...arrowProps } = toRefs(props)

    const _reactive = reactive(arrowProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const popperScope = usePopperScope(scopeOkuPopover.value)

    return () => h(OkuPopperArrow, {
      ...popperScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    }, () => slots.default?.())
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverArrow = popoverArrow as typeof popoverArrow & (new () => { $props: PopoverArrowNaviteElement })
