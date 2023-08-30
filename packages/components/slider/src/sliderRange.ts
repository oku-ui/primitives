import type { PropType } from 'vue'
import { defineComponent, h, ref, toRefs } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { useSliderInject } from './slider'
import { convertValueToPercentage, scopeSliderProps } from './utils'
import { useSliderOrientationInject } from './sliderHorizontal'

const RANGE_NAME = 'OkuSliderRange'

export type SliderRangeIntrinsicElement = ElementType<'span'>

export type SliderRangeElement = HTMLSpanElement

export interface SpanProps extends PrimitiveProps {
  slot?: string | undefined
  title?: string | undefined
  key?: string | number | null | undefined
}
export interface SliderTrackProps extends SpanProps {}
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

  },
}
const sliderRange = defineComponent({
  name: RANGE_NAME,
  inheritAttrs: false,
  props: {
    ...sliderThumbProps.props,
    ...scopeSliderProps,
  },
  setup(props, { attrs, slots }) {
    const { ...restAttrs } = attrs as SliderRangeIntrinsicElement
    const {
      scopeOkuSlider,
    } = toRefs(props)
    const inject = useSliderInject(RANGE_NAME, scopeOkuSlider.value)
    const orientation = useSliderOrientationInject(RANGE_NAME, scopeOkuSlider.value)
    const forwardedRef = useForwardRef()
    const rangeRef = ref<HTMLSpanElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, rangeRef)
    const valuesCount = (inject.values.value || []).length
    const percentages = inject.values.value?.map(value =>
      convertValueToPercentage(value, inject.min.value, inject.max.value),
    )
    const offsetStart = valuesCount > 1 ? Math.min(...percentages!) : 0
    const offsetEnd = 100 - Math.max(...percentages!)

    const originalReturn = () => h(Primitive.span, {
      ...restAttrs,
      'data-disabled': inject.disabled ? '' : undefined,
      'data-orientation': inject.orientation,
      'ref': composedRefs,
      'style': {
        ...attrs.style as any,
        [orientation.startEdge.value]: `${offsetStart}%`,
        [orientation.endEdge.value]: `${offsetEnd}%`,
      },
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSliderRange = sliderRange as typeof sliderRange &
(new () => {
  $props: Partial<SliderRangeElement>
})
