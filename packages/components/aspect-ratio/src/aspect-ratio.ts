import type { ComponentPublicInstance } from 'vue'
import { computed, defineComponent, h, ref } from 'vue'
import type { ComponentPropsWithoutRef, ElementRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

type PrimitiveAspectRatioProps = ComponentPropsWithoutRef<typeof Primitive.div>
type AspectRatioElement = ElementRef<typeof Primitive.div>

interface AspectRatioProps extends PrimitiveAspectRatioProps {
  ratio?: number
}
const NAME = 'AspectRatio'

const AspectRatio = defineComponent({
  name: NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots, expose }) {
    // TODO: as any how to fix?
    const { ratio = 1 / 1, style, ...aspectRatioProps } = attrs as AspectRatioProps
    const innerRef = ref<ComponentPublicInstance>()

    expose({
      innerRef: computed(() => innerRef.value?.$el),
    })

    const originalReturn = () => h(
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
              ...(style as any),
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

    return originalReturn as unknown as {
      innerRef: AspectRatioElement
    }
  },
})

const OkuAspectRatio = AspectRatio as typeof AspectRatio & (new () => { $props: AspectRatioProps })

type OkuAspectRatioElement = Omit<InstanceType<typeof AspectRatio>, keyof ComponentPublicInstance>

export { OkuAspectRatio }
export type { AspectRatioProps, OkuAspectRatioElement }
