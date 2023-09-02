import { defineComponent, h, toRefs } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { scopeSliderProps, useSliderInject } from './utils'

const TRACK_NAME = 'OkuSliderTrack'

export type SliderTrackIntrinsicElement = ElementType<'span'>

export type SliderTrackElement = HTMLSpanElement

export interface SpanProps extends PrimitiveProps {
  slot?: string | undefined
  title?: string | undefined
  key?: string | number | null | undefined
}
export interface SliderTrackProps extends SpanProps {}
export const sliderTrackProps = {
  props: {
    ...primitiveProps,
  },
}
const sliderTrack = defineComponent({
  name: TRACK_NAME,
  inheritAttrs: false,
  props: {
    ...sliderTrackProps.props,
    ...scopeSliderProps,
  },
  setup(props, { attrs, slots }) {
    const {
      scopeOkuSlider,
    } = toRefs(props)
    const inject = useSliderInject(TRACK_NAME, scopeOkuSlider.value)
    const forwardedRef = useForwardRef()
    const originalReturn = () => h(Primitive.span, {
      'data-disabled': inject.disabled?.value ? '' : undefined,
      'data-orientation': inject.orientation.value,
      ...attrs,
      'asChild': props.asChild,
      'ref': forwardedRef,
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSliderTrack = sliderTrack as typeof sliderTrack &
(new () => {
  $props: Partial<SliderTrackElement>
})
