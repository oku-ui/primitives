import {
  createVNode,
  defineComponent,
  mergeProps,
  onMounted,
  toRefs,
} from 'vue'

import { OkuSlot } from '@oku-ui/slot'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { NODES } from './types'
import type { OkuElement, Primitives } from './types'

const Primitive = NODES.reduce((primitive, node) => {
  const selectNode = defineComponent({
    name: `Primitive${node}`,
    inheritAttrs: false,
    props: {
      asChild: Boolean,
    },
    setup(props, { attrs, slots }) {
      const forwarded = useForwardRef()
      const composedRefs = useComposedRefs(forwarded)

      const { asChild, ...primitiveProps } = toRefs(props)

      onMounted(() => {
        (window as any)[Symbol.for('oku-ui')] = true
      })
      const Tag: any = asChild.value ? OkuSlot : node

      return () => {
        const mergedProps = mergeProps(attrs, primitiveProps)
        return createVNode(Tag, { ...mergedProps, ref: composedRefs }, slots.default?.())
      }
    },
  })

  const NodeProps = selectNode as typeof selectNode
  & (new () => {
    $props: OkuElement<typeof node, true>
  })

  return { ...primitive, [node]: NodeProps }
}, {} as Primitives)

const OkuPrimitive = Primitive

export { OkuPrimitive, Primitive }
