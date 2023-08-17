import { cloneVNode, defineComponent, h } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'

export type ArrowIntrinsicElement = ElementType<'svg'>
export type ArrowElement = SVGSVGElement

interface ArrowProps extends PrimitiveProps {}

const NAME = 'OkuArrow'

const arrow = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const forwardedRef = useForwardRef()

    const { width = '10px', height = '5px', ...arrowAttrs } = attrs as ArrowIntrinsicElement

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
export const OkuArrow = arrow as typeof arrow
& (new () => {
  $props: Partial<ArrowElement>
})

export type { ArrowProps }
