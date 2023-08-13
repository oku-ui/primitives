import { Primitive } from '@oku-ui/primitive'
import type {
  ComponentPublicInstanceRef,
  ElementType,
  IPrimitiveProps,
  InstanceTypeRef,
  MergeProps,
} from '@oku-ui/primitive'
import { defineComponent, h, inject, ref, watchEffect } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { DismissableLayerProvideValue } from './DismissableLayer'
import {
  DismissableLayerProvideKey,
} from './DismissableLayer'

/* -------------------------------------------------------------------------------------------------
 * DismissableLayerBranch
 * ----------------------------------------------------------------------------------------------- */

const BRANCH_NAME = 'DismissableLayerBranch'
type DismissableLayerBranchElement = ElementType<'div'>

interface DismissableLayerBranchProps extends IPrimitiveProps {}

export type { DismissableLayerBranchElement }

const DismissableLayerBranch = defineComponent({
  name: BRANCH_NAME,
  inheritAttrs: false,
  props: {
    asChild: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props, { attrs }) {
    const _inject = inject(DismissableLayerProvideKey) as DismissableLayerProvideValue

    const node = ref<ComponentPublicInstanceRef<HTMLDivElement> | null>()

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(node, forwardedRef)

    watchEffect((onInvalidate) => {
      if (node.value)
        _inject.branches.value.add(node.value.$el)

      onInvalidate(() => {
        if (node.value && node.value.$el)
          _inject.branches.value.delete(node.value.$el)
      })
    })

    const originalReturn = () =>
      h(Primitive.div, {
        ref: composedRefs,
        asChild: props.asChild,
        ...attrs,
      })

    return originalReturn
  },
})

export type _DismissableLayerBranchEl = HTMLDivElement

type _DismissableLayerBranch = MergeProps<
  DismissableLayerBranchProps,
  DismissableLayerBranchElement
>

type InstanceDismissableLayerBranchType = InstanceTypeRef<
  typeof DismissableLayerBranch,
  _DismissableLayerBranchEl
>

const OkuDismissableLayerBranch
  = DismissableLayerBranch as typeof DismissableLayerBranch &
  (new () => { $props: _DismissableLayerBranch })

export { OkuDismissableLayerBranch }

export type { InstanceDismissableLayerBranchType, DismissableLayerBranchProps }
