import { Primitive } from '@oku-ui/primitive'
import type {
  ElementType,
  MergeProps,
  PrimitiveProps,
} from '@oku-ui/primitive'
import { useRef } from '@oku-ui/use-composable'
import type { CSSProperties } from 'vue'
import { defineComponent, h } from 'vue'

const NAME = 'OkuVisuallyHidden'

type VisuallyHiddenElement = ElementType<'button'>

interface VisuallyHiddenProps extends PrimitiveProps {}

const VisuallyHidden = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    asChild: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props, { attrs, expose }) {
    const { ...visuallyHiddenAttrs } = attrs as VisuallyHiddenElement

    const { $el, newRef } = useRef<VisuallyHiddenElement>()

    expose({
      innerRef: $el,
    })

    const originalReturn = () =>
      h(Primitive.span, {
        ref: newRef,
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
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          wordWrap: 'normal',
          ...(visuallyHiddenAttrs.style as CSSProperties),
        },
      })

    return originalReturn as unknown as {
      innerRef: VisuallyHiddenElement
    }
  },
})

type _VisuallyHidden = MergeProps<VisuallyHiddenProps, VisuallyHiddenElement>

const OkuVisuallyHidden = VisuallyHidden as typeof VisuallyHidden &
(new () => { $props: _VisuallyHidden })

export { OkuVisuallyHidden }

export type { VisuallyHiddenProps }
