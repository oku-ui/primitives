import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type {
  ElementType,
  PrimitiveProps,
} from '@oku-ui/primitive'
import { defineComponent, h, inject, ref, watchEffect } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { DismissableLayerProvideValue } from './DismissableLayer'
import { DismissableLayerProvideKey } from './DismissableLayer'

/* -------------------------------------------------------------------------------------------------
 * DismissableLayerBranch
 * ----------------------------------------------------------------------------------------------- */

const BRANCH_NAME = 'OkuDismissableLayerBranch'
export type DismissableLayerBranchIntrinsicElement = ElementType<'div'>
export type DismissableLayerBranchElement = HTMLDivElement

export interface DismissableLayerBranchProps extends PrimitiveProps {}

const DismissableLayerBranch = defineComponent({
  name: BRANCH_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const _inject = inject(
      DismissableLayerProvideKey,
    ) as DismissableLayerProvideValue

    const node = ref<HTMLDivElement | null>()

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(node, forwardedRef)

    watchEffect((onInvalidate) => {
      if (node.value)
        _inject.branches.value.add(node.value)

      onInvalidate(() => {
        if (node.value && node.value)
          _inject.branches.value.delete(node.value)
      })
    })

    const originalReturn = () =>
      h(Primitive.div, {
        ...attrs,
        ref: composedRefs,
        asChild: props.asChild,
      })

    return originalReturn
  },
})

export const OkuDismissableLayerBranch
= DismissableLayerBranch as typeof DismissableLayerBranch &
(new () => {
  $props: Partial<DismissableLayerBranchElement>
})
