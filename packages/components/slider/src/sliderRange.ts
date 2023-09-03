import { computed, defineComponent, h, ref, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { convertValueToPercentage, scopeSliderProps, useSliderInject, useSliderOrientationInject } from './utils'

const RANGE_NAME = 'OkuSliderRange'

export type SliderRangeNaviteElement = OkuElement<'span'>

export type SliderRangeElement = HTMLSpanElement

export interface SpanProps extends PrimitiveProps {
  slot?: string | undefined
  title?: string | undefined
  key?: string | number | null | undefined
}
export interface SliderRangeProps extends SpanProps {}
export const sliderRangeProps = {
  props: {
    ...primitiveProps,
  },
}
const sliderRange = defineComponent({
  name: RANGE_NAME,
  inheritAttrs: false,
  props: {
    ...sliderRangeProps.props,
    ...scopeSliderProps,
  },
  setup(props, { attrs, slots }) {
    const {
      scopeOkuSlider,
    } = toRefs(props)
    const inject = useSliderInject(RANGE_NAME, scopeOkuSlider.value)
    const orientation = useSliderOrientationInject(RANGE_NAME, scopeOkuSlider.value)
    const forwardedRef = useForwardRef()
    const rangeRef = ref<HTMLSpanElement | null>(null)
    const composedRefs = useComposedRefs(forwardedRef, rangeRef)

    const valuesCount = computed(() => (inject.values.value || []).length)
    const percentages = computed(() => inject.values.value?.map(value =>
      convertValueToPercentage(value, inject.min.value, inject.max.value),
    ))
    const offsetStart = computed(() => valuesCount.value > 1 ? Math.min(...percentages.value!) : 0)
    const offsetEnd = computed(() => 100 - Math.max(...percentages.value!))

    const originalReturn = () => h(Primitive.span, {
      'data-disabled': inject.disabled?.value ? '' : undefined,
      'data-orientation': inject.orientation.value,
      ...attrs,
      'ref': composedRefs,
      'style': {
        ...attrs.style as any,
        [orientation.startEdge.value]: `${offsetStart.value}%`,
        [orientation.endEdge.value]: `${offsetEnd.value}%`,
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
  $props: SliderRangeNaviteElement
})
