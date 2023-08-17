import type { CSSProperties } from 'vue'
import { defineComponent, h, toRef } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'

export type AspectRatioIntrinsicElement = ElementType<'div'>
export type AspectRatioElement = HTMLDivElement

const NAME = 'OkuAspectRatio'

interface AspectRatioProps extends PrimitiveProps {
  ratio?: number
}

const AspectRatio = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ratio: {
      type: Number,
      default: 1 / 1,
    },
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const ratio = toRef(props, 'ratio')
    const { style, ...aspectRatioAttrs } = attrs as AspectRatioIntrinsicElement

    const forwardedRef = useForwardRef()
    const originalReturn = () => h(
      'div', {
        'style': {
          position: 'relative',
          width: '100%',
          paddingBottom: `${100 / ratio.value}%`,
        } as CSSProperties,
        'data-oku-aspect-ratio-wrapper': '',
      },
      [
        h(
          Primitive.div,
          {
            asChild: props.asChild,
            ...aspectRatioAttrs,
            ref: forwardedRef,
            style: {
              ...(style as any),
              position: 'absolute',
              top: '0px',
              right: '0px',
              left: '0px',
              bottom: '0px',
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
export const OkuAspectRatio = AspectRatio as typeof AspectRatio &
(new () => {
  $props: Partial<AspectRatioElement>
})

export type { AspectRatioProps }
