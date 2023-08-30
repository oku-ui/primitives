import { defineComponent, h, mergeProps } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuPopperArrow, type PopperArrowElement, type PopperArrowIntrinsicElement, type PopperArrowProps, popperArrowProps } from '@oku-ui/popper'
import { type ScopeTooltip, scopeTooltipProps } from './types'
import { usePopperScope } from './utils'
import { useVisuallyHiddenContentInject } from './tooltipContentImpl'

export type TooltipArrowIntrinsicElement = PopperArrowIntrinsicElement
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
  inheritAttrs: false,
  props: {
    ...tooltipArrowProps.props,
    ...scopeTooltipProps,
  },
  emits: tooltipArrowProps.emits,
  setup(props, { attrs, slots }) {
    const forwardedRef = useForwardRef()
    const popperScope = usePopperScope(props.scopeOkuTooltip)

    const visuallyHiddenContentInject = useVisuallyHiddenContentInject(ARROW_NAME, props.scopeOkuTooltip)

    // if the arrow is inside the `VisuallyHidden`, we don't want to render it all to
    // prevent issues in positioning the arrow due to the duplicate
    return () => visuallyHiddenContentInject.isInside
      ? null
      : h(OkuPopperArrow, {
        ...popperScope,
        ...mergeProps(attrs, props),
        ref: forwardedRef,
      }, {
        default: () => slots.default?.(),
      })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuTooltipArrow = tooltipArrow as typeof tooltipArrow &
(new () => {
  $props: ScopeTooltip<Partial<PopperArrowElement>>
})
