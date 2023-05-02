import { defineComponent, h, ref } from 'vue'
import type { ComponentPropsWithoutRef, ElementRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

type PrimitiveAspectRatioProps = ComponentPropsWithoutRef<typeof Primitive.div>
type AspectRatioElement = ElementRef<typeof Primitive.div>

interface AspectRatioProps extends PrimitiveAspectRatioProps {
  ratio?: number
}
const NAME = 'AspectRatio'

const AspectRatio = defineComponent<AspectRatioProps>({
  name: NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    // TODO: as any how to fix?
    const { ratio = 1 / 1, style, ...aspectRatioProps } = attrs as any
    const forwardedRef = ref<AspectRatioElement>()
    return () => h(
      'div', {
        'style': {
          position: 'relative',
          width: '100%',
          paddingBottom: `${100 / ratio}%`,
        },
        'data-radix-aspect-ratio-wrapper': '',
      },
      [
        h(
          Primitive.div,
          {
            ...aspectRatioProps,
            ref: forwardedRef,
            style: {
              ...style,
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
          slots.default && slots.default(),
        ),
      ],
    )
  },
})

const OkuAspectRatio = AspectRatio

export { OkuAspectRatio, AspectRatio }
export type { AspectRatioProps }
