import { defineComponent, h } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { PopperArrowElement, PopperArrowIntrinsicElement } from '@oku-ui/popper'

export type TooltipArrowIntrinsicElement = PopperArrowIntrinsicElement
export type TooltipArrowElement = PopperArrowElement

interface TooltipArrowProps { }
const NAME = 'OkuTooltipArrow'

const tooltipArrow = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const forwardedRef = useForwardRef()

    const originalReturn = () => h(Primitive.label, {
      ...attrs,
      ref: forwardedRef,
      asChild: props.asChild,
      onMousedown: (event: MouseEvent) => {
        restAttrs.onMousedown?.(event)
        // prevent text selection when double clicking label
        if (!event.defaultPrevented && event.detail > 1)
          event.preventDefault()
      },
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuTooltipArrow = tooltipArrow as typeof tooltipArrow &
(new () => {
  $props: Partial<LabelElement>
})

export type {
  TooltipArrowProps,
}
