import { defineComponent, h } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { useSize } from '@oku-ui/use-composable'
import { useForwardRef } from '@oku-ui/use-composable'
import { SLIDER_NAME, createSliderProvider } from './slider'
import type { SliderImplProps } from './sliderImpl'

export type LabelIntrinsicElement = ElementType<'label'>
export type LabelElement = HTMLLabelElement

export interface LabelProps extends PrimitiveProps {}

const NAME = 'OkuSliderHorizontal'
type Side = 'top' | 'right' | 'bottom' | 'left'

const [sliderOrientationProvider, useSliderOrientationInject] = createSliderProvider<{
  startEdge: Side
  endEdge: Side
  size: keyof NonNullable<ReturnType<typeof useSize>['value']>
  direction: number
}>(SLIDER_NAME, {
  startEdge: 'left',
  endEdge: 'right',
  size: 'width',
  direction: 1,
})
export interface SliderOrientationPrivateProps {
  min: number
  max: number
  inverted: boolean
}
interface SliderOrientationProps
  extends Omit<SliderImplProps, keyof SliderImplPrivateProps>,
  SliderOrientationPrivateProps {}
const sliderHorizontal = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { ...restAttrs } = attrs as LabelIntrinsicElement

    const forwardedRef = useForwardRef()

    const originalReturn = () => h(Primitive.label, {
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
export const OkuSliderHorizontal = sliderHorizontal as typeof sliderHorizontal &
(new () => {
  $props: Partial<LabelElement>
})
