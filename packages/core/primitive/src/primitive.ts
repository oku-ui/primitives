// same inspiration and resource https://github.com/chakra-ui/ark/blob/main/packages/vue/src/factory.tsx

import {
  createVNode,
  defineComponent,
  mergeProps,
  onMounted,
} from 'vue'

import { OkuSlot } from '@oku-ui/slot'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { NODES, type Primitives } from './types'

const Primitive = NODES.reduce((primitive, node) => {
  const Node = defineComponent({
    name: `Primitive${node}`,
    inheritAttrs: false,
    props: {
      asChild: Boolean,
    },
    setup(props, { attrs, slots }) {
      const forwarded = useForwardRef()
      const composedRefs = useComposedRefs(forwarded)

      const { asChild, ...primitiveProps } = props

      onMounted(() => {
        (window as any)[Symbol.for('oku-ui')] = true
      })

      const Tag: any = asChild ? OkuSlot : node
      return () => {
        const mergedProps = mergeProps(attrs, primitiveProps)
        return createVNode(Tag, { ...mergedProps, ref: composedRefs }, {
          default: () => slots.default?.(),
        })
      }
    },
  })

  return { ...primitive, [node]: Node }
}, {} as Primitives)

const OkuPrimitive = Primitive

export { OkuPrimitive, Primitive }
