import { cloneVNode, defineComponent, h, mergeProps } from 'vue'
import { useComposeRefs, useForwardRef } from '@oku-ui/use-composable'
import { isSlottable } from './utils'

const NAME = 'OkuSlot'

const nameslot = defineComponent({
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
        // TODO: default TS type problem
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const newParentElement = cloneVNode(slottable.children?.default?.()[0])
        newParentElement.children = []

        const newChildren = defaultSlot?.map((child) => {
          if (child === slottable) {
            // TODO: default TS type problem
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const elementChildren = slottable.children?.default?.()[0].children

            return elementChildren
          }
          else {
            return child
          }
        })

        return h(newParentElement, {
          ...mergedProps,
          ref: composedRefs,
        }, {
          default: () => newChildren,
        })
      }
      else {
        if (slots.default) {
          return cloneVNode(slots.default?.()[0], {
            ...mergedProps,
            ref: composedRefs,
          }, true)
        }
        else {
          return null
        }
      }
    }
  },
})

const OkuSlottable = defineComponent({
  name: 'OkuSlottable',
  inheritAttrs: false,
  setup(props, { slots }) {
    return () => slots.default?.()
  },
})

const OkuSlot = nameslot

export { OkuSlot, OkuSlottable }
