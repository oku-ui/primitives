import { cloneVNode, defineComponent, h } from 'vue'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { useRef } from '@oku-ui/use-composable'

type ArrowElement = ElementType<'svg'>
interface ArrowProps extends PrimitiveProps {}

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
  setup(props, { attrs, slots, expose }) {
    const { $el, newRef } = useRef()

    const { width = '10px', height = '5px', ...arrowAttrs } = attrs as ArrowElement

    expose({
      innerRef: $el,
    })

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
          ref: newRef,
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

    return originalReturn as unknown as {
      innerRef: ArrowElement
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _ArrowProps = MergeProps<ArrowProps, ArrowElement>
type ArrowRef = RefElement<typeof arrow>

const OkuArrow = arrow as typeof arrow & (new () => { $props: _ArrowProps })

export { OkuArrow }
export type { ArrowProps, ArrowElement, ArrowRef }
