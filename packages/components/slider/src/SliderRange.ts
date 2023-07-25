import { Primitive } from '@oku-ui/primitive'
import type { ElementType, MergeProps, PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { useRef } from '@oku-ui/use-composable'
import type { CSSProperties, PropType, Ref } from 'vue'
import { defineComponent, h, toRefs, toValue } from 'vue'
import { useSliderContext } from './Slider'

const RANGE_NAME = 'SliderRange'

type SliderRangelement = ElementType<'span'>

type SliderRangeProps = SliderRangelement & PrimitiveProps & {
  scopeSlider?: Scope
}

const SliderRange = defineComponent({
  name: RANGE_NAME,
  inheritAttrs: false,
  props: {
    scopeSlider: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
    asChild: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { attrs, slots, expose }) {
    const { scopeSlider } = toRefs(props)

    const { ...trackAttrs } = attrs as SliderRangeProps

    const { $el, newRef } = useRef<HTMLSpanElement>()

    const context = toValue(useSliderContext(RANGE_NAME, scopeSlider.value))

    expose({
      innerRef: $el,
    })

    const getSliderProgress = () => {
      const { min, max, value } = context
      const percent = ((value.value - min) / (max - min)) * 100
      return percent
    }

    const originalReturn = () => [
      h(
        Primitive.span,
        {
          'data-disabled': context.disabled?.value ? '' : undefined,
          'role': 'sliderRange',
          'min': context.min,
          'max': context.max,
          'value': context.value.value,
          'step': context.step,
          'ref': newRef,
          'asChild': props.asChild,
          'style': {
            ...(trackAttrs.style as CSSProperties),
            left: '0%',
            right: `calc(${100 - getSliderProgress()}%)`,
          },
          ...trackAttrs,
        },
        {
          default: () => slots.default?.(),
        },
      ),
    ]
    return originalReturn as unknown as {
      innerRef: Ref<HTMLSpanElement>
    }
  },
})

type _SliderRange = MergeProps<SliderRangeProps, SliderRangelement>

const OkuSliderRange = SliderRange as typeof SliderRange & (
  new () => { $props: _SliderRange }
)

export { OkuSliderRange }

export type { SliderRangeProps }
