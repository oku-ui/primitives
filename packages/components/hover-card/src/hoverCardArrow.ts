import { defineComponent, h, mergeProps, reactive } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPopperArrow } from '@oku-ui/popper'
import { ARROW_NAME, hoverCardArrowProps, scopeHoverCardProps, usePopperScope } from './props'

import type { HoverCardArrowNaviteElement } from './props'

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
    const { scopeOkuHoverCard, ...arrowProps } = props

    const _reactive = reactive(arrowProps)
    const reactiveArrowProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const popperScope = usePopperScope(scopeOkuHoverCard)

    // if the arrow is inside the `VisuallyHidden`, we don't want to render it all to
    // prevent issues in positioning the arrow due to the duplicate
    return () => h(OkuPopperArrow, {
      ...popperScope,
      ...mergeProps(attrs, reactiveArrowProps),
      ref: forwardedRef,
    }, slots)
  },
})

export const OkuHoverCardArrow = hoverCardArrow as typeof hoverCardArrow &
(new () => {
  $props: HoverCardArrowNaviteElement
})
