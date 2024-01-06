import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { scopeSliderProps, useSliderInject } from './utils'

const TRACK_NAME = 'OkuSliderTrack'

export type SliderTrackNaviteElement = OkuElement<'span'>

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
      ...trackProps
    } = toRefs(props)
    const _reactive = reactive(trackProps)
    const reactiveTrackProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useSliderInject(TRACK_NAME, scopeOkuSlider.value)
    const forwardedRef = useForwardRef()
    const originalReturn = () => h(Primitive.span, {
      'data-disabled': inject.disabled?.value ? '' : undefined,
      'data-orientation': inject.orientation.value,
      ...mergeProps(attrs, reactiveTrackProps),
      'ref': forwardedRef,
    }, {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSliderTrack = sliderTrack as typeof sliderTrack &
  (new () => {
    $props: SliderTrackNaviteElement
  })
