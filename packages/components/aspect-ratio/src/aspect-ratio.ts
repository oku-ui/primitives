import type { ComponentPublicInstance } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

interface AspectRatioProps extends PrimitiveProps {
  ratio?: number
}

type AspectRatioElement = ElementType<'div'>

const NAME = 'AspectRatio'

const AspectRatio = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ratio: {
      type: Number,
      default: 1 / 1,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { style, ...aspectRatioProps } = attrs as AspectRatioElement
    const innerRef = ref<ComponentPublicInstance>()

    expose({
      innerRef: computed(() => innerRef.value?.$el),
    })

    const originalReturn = () => h(
      'div', {
        'style': {
          position: 'relative',
          width: '100%',
          paddingBottom: `${100 / props.ratio}%`,
        },
        'data-radix-aspect-ratio-wrapper': '',
      },
      [
        h(
          Primitive.div,
          {
            ...aspectRatioProps,
            ref: innerRef,
            style: {
              ...(style as any),
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
          {
            default: () => slots.default?.(),
          },
        ),
      ],
    )

    return originalReturn as unknown as {
      innerRef: AspectRatioElement
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _AspectRatioProps = MergeProps<AspectRatioProps, AspectRatioElement>
type AspectRatioRef = RefElement<typeof AspectRatio>

const OkuAspectRatio = AspectRatio as typeof AspectRatio & (new () => { $props: _AspectRatioProps })

export { OkuAspectRatio }
export type { AspectRatioProps, AspectRatioElement, AspectRatioRef }
