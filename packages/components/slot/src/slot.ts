import { cloneVNode, defineComponent, h, mergeProps } from 'vue'
import { useComposeRefs, useForwardRef } from '@oku-ui/use-composable'
import { isSlottable } from './utils'

const NAME = 'OkuSlot'

const OkuSlot = defineComponent({
  name: NAME,
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    const forwarded = useForwardRef()
    const composedRefs = useComposeRefs(forwarded)

    return () => {
      const mergedProps = mergeProps(attrs, props)
      const defaultSlot = slots.default?.()
      const slottable = defaultSlot?.find(isSlottable)

      if (slottable) {
        const newChildren = defaultSlot?.map(child =>
        // TODO: default TS type problem
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
          child === slottable ? slottable.children?.default?.()[0].children : child,
        )

        // TODO: default TS type problem
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const newParentElement = cloneVNode(slottable.children?.default?.()[0])

        return h(cloneVNode(newParentElement, { ...newParentElement.props, ref: composedRefs }, true), newChildren)
      }
      else if (slots.default) {
        return cloneVNode(slots.default?.()[0], { ...mergedProps, ref: composedRefs }, true)
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
    return slots.default || (() => null) // Ensure it returns a function even if the default slot is not provided
  },
})

export { OkuSlot, OkuSlottable }
