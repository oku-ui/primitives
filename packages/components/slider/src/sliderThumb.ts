import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { SliderThumbImplElement, SliderThumbImplProps } from './sliderThumbImpl'

const THUMB_NAME = 'OkuSliderThumb'

export type SliderThumbIntrinsicElement = ElementType<'span'>

export type SliderThumbElement = SliderThumbImplElement

export interface SliderThumbProps extends Omit<SliderThumbImplProps, 'index'> {}

export interface SpanProps extends PrimitiveProps {
  slot?: string | undefined
  title?: string | undefined
  key?: string | number | null | undefined
  defaultChecked?: boolean | undefined
}

export const sliderThumbProps = {
  props: {
    ...primitiveProps,
    slot: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    title: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    key: {
      type: [String, Number, null, undefined] as PropType<string | number | null | undefined>,
      default: undefined,
    },
    modelValue: {
      type: [Boolean, String, Number, undefined] as PropType<boolean | string | number | undefined | 'indeterminate'>,
      default: undefined,
    },
    required: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    name: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    disabled: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    value: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
  },
}

const sliderThumb = defineComponent({
  name: THUMB_NAME,
  inheritAttrs: false,
  props: { ...sliderThumbProps.props },
  setup(props, { attrs, slots }) {
    const { ...restAttrs } = attrs as SliderThumbIntrinsicElement

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
export const OkuSliderThumb = sliderThumb as typeof sliderThumb &
(new () => {
  $props: Partial<SliderThumbElement>
})
