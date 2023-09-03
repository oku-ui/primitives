import { defineComponent, h, mergeProps } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuPopperArrow, type PopperArrowElement, type PopperArrowNaviteElement, type PopperArrowProps, popperArrowProps } from '@oku-ui/popper'
import { usePopperScope } from './hoverCard'
import { scopeHoverCardProps } from './utils'

const ARROW_NAME = 'OkuHoverCardArrow'

export type HoverCardArrowNaviteElement = PopperArrowNaviteElement
export type HoverCardArrowElement = PopperArrowElement
export interface HoverCardArrowProps extends PopperArrowProps { }

export const hoverCardArrowProps = {
  props: {
    ...popperArrowProps.props,
  },
  emits: {
    ...popperArrowProps.emits,
  },
}

const hoverCardArrow = defineComponent({
  name: ARROW_NAME,
  components: {
    OkuPopperArrow,
  },
  inheritAttrs: false,
  props: {
    ...hoverCardArrowProps.props,
    ...scopeHoverCardProps,
  },
  emits: hoverCardArrowProps.emits,
  setup(props, { attrs, slots }) {
    const forwardedRef = useForwardRef()
    const popperScope = usePopperScope(props.scopeOkuHoverCard)

    // if the arrow is inside the `VisuallyHidden`, we don't want to render it all to
    // prevent issues in positioning the arrow due to the duplicate
    return () => h(OkuPopperArrow, {
      ...popperScope,
      ...mergeProps(attrs, props),
      ref: forwardedRef,
    }, slots)
  },
})

export const OkuHoverCardArrow = hoverCardArrow as typeof hoverCardArrow &
(new () => {
  $props: HoverCardArrowNaviteElement
})
