import type { PropType } from 'vue'
import { defineComponent, h, toRef } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'

export type AspectRatioNaviteElement = OkuElement<'div'>
export type AspectRatioElement = HTMLDivElement

const NAME = 'OkuAspectRatio'

export interface AspectRatioProps extends PrimitiveProps {
  ratio?: number
}

export const aspectRatioProps = {
  props: {
    ratio: {
      type: Number as PropType<number>,
      default: 1 / 1,
    },
  },
  emits: {},
}

const aspectRatio = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...aspectRatioProps.props,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const ratio = toRef(props, 'ratio')

    const forwardedRef = useForwardRef()
    const originalReturn = () => h(
      'div',
      {
        'style': {
          position: 'relative',
          width: '100%',
          paddingBottom: `${100 / ratio.value}%`,
        },
        'data-oku-aspect-ratio-wrapper': '',
      },
      [
        h(
          Primitive.div,
          {
            asChild: props.asChild,
            ...attrs,
            ref: forwardedRef,
            style: {
              ...attrs.style as any,
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
export const OkuAspectRatio = aspectRatio as typeof aspectRatio &
(new () => {
  $props: AspectRatioNaviteElement
})
