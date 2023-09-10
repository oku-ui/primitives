import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPopperArrow, type PopperArrowElement, type PopperArrowNaviteElement, type PopperArrowProps, popperAnchorProps } from '@oku-ui/popper'
import { scopePopoverProps } from './utils'
import { usePopperScope } from './popover'

export type PopoverArrowNaviteElement = PopperArrowNaviteElement
export type PopoverArrowElement = PopperArrowElement

export interface PopoverArrowProps extends PopperArrowProps { }

export const popoverArrowProps = {
  props: {
    ...popperAnchorProps.props,
  },
  emits: {
    ...popperAnchorProps.emits,
  },
}

const ARROW_NAME = 'PopoverArrow'

const popoverArrow = defineComponent({
  name: ARROW_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...popoverArrowProps.props,
    ...scopePopoverProps,
  },
  emits: popoverArrowProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuPopover, ...arrowProps } = toRefs(props)
    const _reactive = reactive(arrowProps)
    const reactiveArrowProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const popperScope = usePopperScope(scopeOkuPopover.value)

    return () => h(OkuPopperArrow, {
      ...popperScope,
      ...mergeProps(attrs, reactiveArrowProps),
      ref: forwardedRef,
    }, {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopoverArrow = popoverArrow as typeof popoverArrow &
(new () => {
  $props: PopoverArrowNaviteElement
})
