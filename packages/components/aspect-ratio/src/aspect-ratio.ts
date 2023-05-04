import { defineComponent, h, onMounted, ref } from 'vue'
import type { ComponentPropsWithoutRef, ElementRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

type PrimitiveAspectRatioProps = ComponentPropsWithoutRef<typeof Primitive.div>
type AspectRatioElement = ElementRef<typeof Primitive.div> & { innerRef: AspectRatioElement }

interface AspectRatioProps extends PrimitiveAspectRatioProps {
  ratio?: number
}
const NAME = 'AspectRatio'

const AspectRatio = defineComponent<AspectRatioProps, { hello: string }>({
  name: NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    // TODO: as any how to fix?
    const { ratio = 1 / 1, style, ...aspectRatioProps } = attrs as any
    const innerRef = ref<AspectRatioElement>()

    onMounted(() => {
      innerRef.value = innerRef.value?.innerRef
    })

    expose({
      innerRef,
    })

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
            ref: innerRef,
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
