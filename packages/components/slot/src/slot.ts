import { createVNode, defineComponent, mergeProps } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { isSlottable } from './utils'

const NAME = 'OkuSlot'

const OkuSlot = defineComponent({
  name: NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    const forwarded = useForwardRef()
    const composedRefs = useComposedRefs(forwarded)

    return () => {
      const defaultSlot = slots.default?.()
      const slottable = defaultSlot?.find(isSlottable)
      if (slottable && defaultSlot?.length) {
        // TODO: default TS type problem
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const newParentElement = slottable.children?.default?.()[0]

        const newChildren = defaultSlot.map((child) => {
          if (child === slottable)
            return newParentElement.children

          else return child
        })

        return createVNode(newParentElement.type, {
          ...mergeProps(attrs, props, newParentElement.props), ref: composedRefs,
        }, {
          default: () => newChildren,
        })
      }
      else if (slots.default) {
        return createVNode(slots.default?.()[0], { ...mergeProps(attrs, props), ref: composedRefs })
      }
      else {
        return null
      }
    }
  },
})

const OkuSlottable = defineComponent({
  name: 'OkuSlottable',
  inheritAttrs: false,
  setup(_, { slots }) {
    return slots.default ? () => slots.default?.() : null
  },
})

export { OkuSlot, OkuSlottable }
