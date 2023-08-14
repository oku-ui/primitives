import { Primitive } from '@oku-ui/primitive'
import type {
  ElementType,
  IPrimitiveProps,
  InstanceTypeRef,
  MergeProps,
} from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { CSSProperties } from 'vue'
import { defineComponent, h } from 'vue'

const NAME = 'OkuVisuallyHidden'

type VisuallyHiddenElement = ElementType<'button'>
export type _VisuallyHiddenEl = HTMLButtonElement

interface VisuallyHiddenProps extends IPrimitiveProps {}

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
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          wordWrap: 'normal',
          ...(visuallyHiddenAttrs.style as CSSProperties),
        },
      })

    return originalReturn
  },
})

type _VisuallyHidden = MergeProps<VisuallyHiddenProps, VisuallyHiddenElement>
type InnerVisuallyHidden = InstanceTypeRef<typeof VisuallyHidden, _VisuallyHiddenEl>

const OkuVisuallyHidden = VisuallyHidden as typeof VisuallyHidden &
(new () => { $props: _VisuallyHidden })

export { OkuVisuallyHidden }

export type { VisuallyHiddenProps, InnerVisuallyHidden, _VisuallyHidden }
