import { Primitive } from '@oku-ui/primitive'
import type { ElementType, MergeProps, PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { useRef } from '@oku-ui/use-composable'
import type { CSSProperties, PropType } from 'vue'
import { defineComponent, h, toRefs, toValue } from 'vue'
import { useSliderContext } from './Slider'

const THUMB_NAME = 'SliderThumb'

type SliderThumbElement = ElementType<'span'>

type SliderThumbProps = SliderThumbElement & PrimitiveProps & {
  scopeSlider?: Scope
}

const SliderThumb = defineComponent({
  name: THUMB_NAME,
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

    const { ...thumbAttrs } = attrs as SliderThumbProps

    const { $el, newRef } = useRef<HTMLSpanElement>()

    const context = toValue(useSliderContext(THUMB_NAME, scopeSlider.value))

    const getSliderProgress = () => {
      const { min, max, value } = context
      const percent = ((value.value - min) / (max - min)) * 100
      return percent
    }

    expose({
      innerRef: $el,
    })
    const originalReturn = () => [
      h(
        Primitive.span,
        {
          'role': 'sliderThumb',
          'data-disabled': context.disabled?.value ? '' : undefined,
          'ref': newRef,
          'asChild': props.asChild,
          'tabindex': context.disabled?.value ? undefined : 0,
          'style': {
            ...(thumbAttrs.style as CSSProperties),
            left: `calc(${getSliderProgress()}% - 10px)`,
            position: 'absolute',
          },
          ...thumbAttrs,
        },
        {
          default: () => slots.default?.(),
        },
      ),
    ]
    return originalReturn as unknown as {
      innerRef: SliderThumbElement
    }
  },
})

type _SliderThumb = MergeProps<SliderThumbProps, SliderThumbElement>

const OkuSliderThumb = SliderThumb as typeof SliderThumb & (new () => { $props: _SliderThumb })

export { OkuSliderThumb }

export type { SliderThumbProps }
