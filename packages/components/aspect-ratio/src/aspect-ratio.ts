import { defineComponent, h } from 'vue'
import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'

interface AspectRatioProps extends IPrimitiveProps {
  ratio?: number
}

type AspectRatioElement = ElementType<'div'>
export type _AspectRatioEl = HTMLDivElement

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
  setup(props, { attrs, slots }) {
    const { style, ...aspectRatioProps } = attrs as AspectRatioElement

    const forwardedRef = useForwardRef()

    const originalReturn = () => h(
      'div', {
        'style': {
          position: 'relative',
          width: '100%',
          paddingBottom: `${100 / props.ratio}%`,
        },
        'data-oku-aspect-ratio-wrapper': '',
      },
      [
        h(
          Primitive.div,
          {
            ...aspectRatioProps,
            ref: forwardedRef,
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

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _AspectRatioProps = MergeProps<AspectRatioProps, AspectRatioElement>
type InstanceAspectRatioType = InstanceTypeRef<typeof AspectRatio, _AspectRatioEl>

const OkuAspectRatio = AspectRatio as typeof AspectRatio & (new () => { $props: _AspectRatioProps })

export { OkuAspectRatio }
export type { AspectRatioProps, AspectRatioElement, InstanceAspectRatioType }
