import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type {
  ElementType,
  PrimitiveProps,

} from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { CSSProperties } from 'vue'
import { defineComponent, h } from 'vue'

const NAME = 'OkuVisuallyHidden'

export type VisuallyHiddenIntrinsicElement = ElementType<'button'>
export type VisuallyHiddenElement = HTMLButtonElement

interface VisuallyHiddenProps extends PrimitiveProps {}

const visuallyHidden = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...visuallyHiddenAttrs } = attrs as VisuallyHiddenIntrinsicElement

    const forwardedRef = useForwardRef()

    const originalReturn = () =>
      h(Primitive.span, {
        ref: forwardedRef,
        asChild: props.asChild,
        ...visuallyHiddenAttrs,
        style: {
          position: 'absolute',
          border: 0,
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0px, 0px, 0px, 0px)',
          whiteSpace: 'nowrap',
          wordWrap: 'normal',
          ...(visuallyHiddenAttrs.style as CSSProperties),
        },
      })

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuVisuallyHidden = visuallyHidden as typeof visuallyHidden &
(new () => {
  $props: Partial<VisuallyHiddenElement>
})

export type {
  VisuallyHiddenProps,
}
