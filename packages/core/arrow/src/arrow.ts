import type { PropType } from 'vue'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'

export type ArrowNaviteElement = Omit<OkuElement<'svg'>, 'width' | 'height'> & {
  width?: number
  height?: number
}

export type ArrowElement = Omit<SVGSVGElement, 'width' | 'height'> & {
  width?: number
  height?: number
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

    const { width, height, ...arrowProps } = toRefs(props)

    const _reactive = reactive(arrowProps)
    const reactiveProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    return () => h(Primitive.svg, {
      ...mergeProps(reactiveProps, attrs),
      ref: forwardedRef,
      width: width.value,
      height: height.value,
      viewBox: '0 0 30 10',
      preserveAspectRatio: 'none',
    },
    {
      default: () => props.asChild
        ? slots.default?.()
        : h('polygon', {
          points: '0,0 30,0 15,10',
        }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuArrow = arrow as typeof arrow
& (new () => {
  $props: ArrowNaviteElement
})
