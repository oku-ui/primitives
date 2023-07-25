import { Primitive } from '@oku-ui/primitive'
import type { ElementType, MergeProps, PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { useRef } from '@oku-ui/use-composable'
import type { PropType, Ref } from 'vue'
import { defineComponent, h, toRefs, toValue } from 'vue'
import { useSliderContext } from './Slider'

const TRACK_NAME = 'SliderTrack'

type SliderTracklement = ElementType<'span'>

type SliderTrackProps = SliderTracklement & PrimitiveProps & {
  scopeSlider?: Scope
}

const SliderTrack = defineComponent({
  name: TRACK_NAME,
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

    const { ...trackAttrs } = attrs as SliderTrackProps

    const { $el, newRef } = useRef<HTMLSpanElement>()

    const context = toValue(useSliderContext(TRACK_NAME, scopeSlider.value))
    expose({
      innerRef: $el,
    })
    const originalReturn = () => [
      h(
        Primitive.span,
        {
          'data-disabled': context.disabled?.value ? '' : undefined,
          'ref': newRef,
          'asChild': props.asChild,
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

type _SliderTrack = MergeProps<SliderTrackProps, SliderTracklement>

const OkuSliderTrack = SliderTrack as typeof SliderTrack & (
  new () => { $props: _SliderTrack }
)

export { OkuSliderTrack }

export type { SliderTrackProps }
