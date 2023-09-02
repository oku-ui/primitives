import type { PropType } from 'vue'
import { cloneVNode, defineComponent, h, toRefs } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'

export type ArrowIntrinsicElement = ElementType<'svg'>
export type ArrowElement = Omit<SVGSVGElement, 'width' | 'height'> & {
  width: number
  height: number
}

export interface ArrowProps extends PrimitiveProps {
  width?: number
  height?: number
}

export const arrowProps = {
  props: {
    width: {
      type: Number as PropType<number>,
      default: 10,
    },
    height: {
      type: Number as PropType<number>,
      default: 5,
    },
    ...primitiveProps,
  },
  emits: {},
}

const NAME = 'OkuArrow'

const arrow = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...arrowProps.props,
  },
  setup(props, { attrs, slots }) {
    const forwardedRef = useForwardRef()

    const { width, height } = toRefs(props)

    const originalReturn = () => {
      const defaultSlot = typeof slots.default === 'function' ? slots.default()[0] : slots.default ?? null
      return props.asChild
        ? defaultSlot
          ? cloneVNode(defaultSlot, {
            ...attrs,
            width: `${width.value}px`,
            height: `${height.value}px`,
            viewBox: '0 0 30 10',
            preserveAspectRatio: 'none',
          })
          : null
        : h(Primitive.svg, {
          ...attrs,
          ref: forwardedRef,
          width: width.value,
          height: height.value,
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
  $props: Partial<ArrowIntrinsicElement>
})
