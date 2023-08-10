import { cloneVNode, defineComponent, h } from 'vue'
import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'

type ArrowElement = ElementType<'svg'>
export type _ArrowEl = SVGSVGElement

interface ArrowProps extends IPrimitiveProps {}

const NAME = 'Arrow'

const arrow = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    asChild: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { attrs, slots }) {
    const forwardedRef = useForwardRef()

    const { width = '10px', height = '5px', ...arrowAttrs } = attrs as ArrowElement

    const originalReturn = () => {
      const defaultSlot = typeof slots.default === 'function' ? slots.default()[0] : slots.default ?? null
      return props.asChild
        ? defaultSlot
          ? cloneVNode(defaultSlot, {
            ...arrowAttrs,
            width,
            height,
            viewBox: '0 0 30 10',
            preserveAspectRatio: 'none',
          })
          : null
        : h(Primitive.svg, {
          ...arrowAttrs,
          ref: forwardedRef,
          width,
          height,
          viewBox: '0 0 30 10',
          preserveAspectRatio: 'none',
        },
        {
          default: () => h('polygon', {
            points: '0,0 30,0 15,10',
          }),
        })
    }

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _ArrowProps = MergeProps<ArrowProps, ArrowElement>
type InstanceArrowType = InstanceTypeRef<typeof arrow, _ArrowEl>

const OkuArrow = arrow as typeof arrow & (new () => { $props: _ArrowProps })

export { OkuArrow }
export type { ArrowProps, ArrowElement, InstanceArrowType }
