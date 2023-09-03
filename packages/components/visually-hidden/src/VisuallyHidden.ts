import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type {
  OkuElement,
  PrimitiveProps,

} from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h } from 'vue'

const NAME = 'OkuVisuallyHidden'

export type VisuallyHiddenNaviteElement = OkuElement<'button'>
export type VisuallyHiddenElement = HTMLButtonElement

export interface VisuallyHiddenProps extends PrimitiveProps {}

const visuallyHidden = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const forwardedRef = useForwardRef()

    const originalReturn = () =>
      h(Primitive.span, {
        ref: forwardedRef,
        asChild: props.asChild,
        ...attrs,
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
          ...attrs.style as any,
        },
      }, slots)

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuVisuallyHidden = visuallyHidden as typeof visuallyHidden &
(new () => {
  $props: VisuallyHiddenNaviteElement
})
