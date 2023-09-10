import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPopperArrow, type PopperArrowElement, type PopperArrowNaviteElement, type PopperArrowProps, popperArrowProps } from '@oku-ui/popper'
import { scopeTooltipProps } from './types'
import { usePopperScope } from './utils'
import { useVisuallyHiddenContentInject } from './tooltipContentImpl'

export type TooltipArrowNaviteElement = PopperArrowNaviteElement
export type TooltipArrowElement = PopperArrowElement

export interface TooltipArrowProps extends PopperArrowProps { }

export const tooltipArrowProps = {
  props: {
    ...popperArrowProps.props,
  },
  emits: {
    ...popperArrowProps.emits,
  },
}

const ARROW_NAME = 'OkuTooltipArrow'

const tooltipArrow = defineComponent({
  name: ARROW_NAME,
  components: {
    OkuPopperArrow,
  },
  inheritAttrs: false,
  props: {
    ...tooltipArrowProps.props,
    ...scopeTooltipProps,
  },
  emits: tooltipArrowProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuTooltip, ...arrowProps } = toRefs(props)

    const _reactive = reactive(arrowProps)
    const reactiveArrowProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const popperScope = usePopperScope(scopeOkuTooltip.value)

    const visuallyHiddenContentInject = useVisuallyHiddenContentInject(ARROW_NAME, scopeOkuTooltip.value)

    // if the arrow is inside the `VisuallyHidden`, we don't want to render it all to
    // prevent issues in positioning the arrow due to the duplicate
    return () => visuallyHiddenContentInject.isInside.value
      ? null
      : h(OkuPopperArrow, {
        ...popperScope,
        ...mergeProps(attrs, reactiveArrowProps),
        ref: forwardedRef,
      }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuTooltipArrow = tooltipArrow as typeof tooltipArrow &
(new () => {
  $props: TooltipArrowNaviteElement
})
