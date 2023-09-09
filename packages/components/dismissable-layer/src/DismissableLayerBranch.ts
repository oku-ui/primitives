import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type {
  OkuElement,
  PrimitiveProps,
} from '@oku-ui/primitive'
import { defineComponent, h, ref, watchEffect } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { dismissableLayerContext } from './DismissableLayer'

const BRANCH_NAME = 'OkuDismissableLayerBranch'
export type DismissableLayerBranchNaviteElement = OkuElement<'div'>
export type DismissableLayerBranchElement = HTMLDivElement

export interface DismissableLayerBranchProps extends PrimitiveProps {}

const DismissableLayerBranch = defineComponent({
  name: BRANCH_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const node = ref<HTMLDivElement | null>()
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, node)

    watchEffect((onInvalidate) => {
      const _node = node.value

      if (_node)
        dismissableLayerContext.branches.add(_node)

      onInvalidate(() => {
        if (_node)
          dismissableLayerContext.branches.delete(_node)
      })
    })

    const originalReturn = () =>
      h(Primitive.div, {
        ...attrs,
        ref: composedRefs,
        asChild: props.asChild,
      }, slots)

    return originalReturn
  },
})

export const OkuDismissableLayerBranch
= DismissableLayerBranch as typeof DismissableLayerBranch &
(new () => {
  $props: DismissableLayerBranchNaviteElement
})
