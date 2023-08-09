// same inspiration and resource https://github.com/chakra-ui/ark/blob/main/packages/vue/src/factory.tsx

import {
  createVNode,
  defineComponent,
  mergeProps,
  onMounted,
} from 'vue'

// import { useForwardRef } from '@oku-ui/use-composable'
import { OkuSlot } from '@oku-ui/slot'
import { NODES, type Primitives } from './types'

const Primitive = NODES.reduce((primitive, node) => {
  const Node = defineComponent({
    name: `Primitive${node}`,
    inheritAttrs: false,
    props: {
      asChild: Boolean,
    },
    setup(props, { attrs, slots }) {
      // TODO: add support for ref forwarding
      // const forwardedRef = useForwardRef()
      const { asChild, ...primitiveProps } = props

      onMounted(() => {
        (window as any)[Symbol.for('oku-ui')] = true
      })

      const Tag: any = asChild ? OkuSlot : node
      return () => {
        const defaultSlot = slots.default?.()

        if (asChild && defaultSlot?.length && defaultSlot?.length > 1)
          throw new Error(`The ${node} component can only have one child`)

        const mergedProps = mergeProps(attrs, primitiveProps)
        return createVNode(Tag, { ...mergedProps }, {
          default: () => slots.default?.(),
        })
      }
    },
  })

  return { ...primitive, [node]: Node }
}, {} as Primitives)

const OkuPrimitive = Primitive

export { OkuPrimitive, Primitive }
