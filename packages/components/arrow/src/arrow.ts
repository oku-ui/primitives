import type { ComponentPublicInstance } from 'vue'
import { cloneVNode, computed, defineComponent, h, ref } from 'vue'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

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
    const innerRef = ref<ComponentPublicInstance>()
    const { width = '10px', height = '5px', ...arrowAttrs } = attrs as ArrowElement

    expose({
      innerRef: computed(() => innerRef.value?.$el),
    })
    const defaultSlot = slots.default?.()[0] || null

    const originalReturn = () => props.asChild
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
        ref: innerRef,
        width,
        height,
        viewBox: '0 0 30 10',
        preserveAspectRatio: 'none',
      },
      [
        h('polygon', {
          points: '0,0 30,0 15,10',
        }),
      ])

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
