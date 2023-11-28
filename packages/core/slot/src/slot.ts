import { cloneVNode, createVNode, defineComponent, mergeProps } from 'vue'
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
        // TODO: fix any
        const newParentElement = (slottable.children as any)?.default?.()[0]

        const newChildren = defaultSlot.map((child) => {
          if (child === slottable)
            return newParentElement.children

          else return child
        })

        return createVNode(newParentElement.type, {
          ...mergeProps(attrs, props, newParentElement.props),
          ref: composedRefs,
        }, () => newChildren)
      }
      else if (defaultSlot) {
        if (defaultSlot.length > 1)
          console.error(`OkuSlot can only contain a single child, but found ${defaultSlot.length} children. Please use a single wrapper element.`)

        const [child] = defaultSlot
        const slot = cloneVNode(child, { ...mergeProps(attrs, props), ref: composedRefs }, true)

        return slot
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
    return () => slots.default ? slots.default?.() : null
  },
})

export { OkuSlot, OkuSlottable }
