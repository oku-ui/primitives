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

export interface VisuallyHiddenProps extends PrimitiveProps {}

export const visuallyHiddenProps = {
  props: {
    ...primitiveProps,
  },
  emits: {},
}

const visuallyHidden = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...visuallyHiddenProps.props,
  },
  emits: visuallyHiddenProps.emits,
  setup(props, { attrs, slots }) {
    const { ...visuallyHiddenAttrs } = attrs as VisuallyHiddenIntrinsicElement

    const forwardedRef = useForwardRef()

    const originalReturn = () =>
      h(Primitive.span, {
        ref: forwardedRef,
        asChild: props.asChild,
        ...visuallyHiddenAttrs,
        style: {
          position: 'absolute',
          border: '0px',
          width: '1px',
          height: '1px',
          padding: '0px',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0px, 0px, 0px, 0px)',
          whiteSpace: 'nowrap',
          wordWrap: 'normal',
          ...(visuallyHiddenAttrs.style as CSSProperties),
        },
      }, slots)

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuVisuallyHidden = visuallyHidden as typeof visuallyHidden &
(new () => {
  $props: Partial<VisuallyHiddenElement>
})
