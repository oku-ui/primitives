import { defineComponent, h } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'

export type SliderThumbImplIntrinsicElement = ElementType<'span'>
export type SliderThumbImplElement = HTMLSpanElement

export interface SliderThumbImplProps extends PrimitiveProps {
  index: number
}

export const sliderThumbImplProps = {
  props: {
    ...primitiveProps,
  },
}

const THUMBIMPL_NAME = 'OkuSliderThumbImpl'
const sliderThumbImpl = defineComponent({
  name: THUMBIMPL_NAME,
  inheritAttrs: false,
  props: {
    ...sliderThumbImplProps.props,
  },
  setup(props, { attrs, slots }) {
    const { ...restAttrs } = attrs as SliderThumbImplIntrinsicElement

    const forwardedRef = useForwardRef()
    const originalReturn = () => h(Primitive.span, {
      ...restAttrs,
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
export const OkuSliderThumbImpl = sliderThumbImpl as typeof sliderThumbImpl &
(new () => {
  $props: Partial<SliderThumbImplElement>
})
