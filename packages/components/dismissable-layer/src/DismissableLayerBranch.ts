import { Primitive } from '@oku-ui/primitive'
import type {
  ComponentPublicInstanceRef,
  ElementType,
  InstanceTypeRef,
  MergeProps,
  PrimitiveProps,
} from '@oku-ui/primitive'
import type { PropType } from 'vue'
import { defineComponent, h, ref, toRefs, toValue, watchEffect } from 'vue'
import type { Scope } from '@oku-ui/provide'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import {
  DISMISSABLE_NAME,
  useDismissableLayerInject,
} from './DismissableLayer'

/* -------------------------------------------------------------------------------------------------
 * DismissableLayerBranch
 * ----------------------------------------------------------------------------------------------- */

const BRANCH_NAME = 'DismissableLayerBranch'
type DismissableLayerBranchElement = ElementType<'div'>

interface DismissableLayerBranchProps extends PrimitiveProps {}

export type { DismissableLayerBranchElement }

const DismissableLayerBranch = defineComponent({
  name: BRANCH_NAME,
  inheritAttrs: false,
  props: {
    asChild: {
      type: Boolean,
      default: undefined,
    },
    scopeDismissableLayerbranch: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs }) {
    const { scopeDismissableLayerbranch, asChild } = toRefs(props)

    const { ...dismissableLayerBranchAttrs } = attrs

    const context = toValue(
      useDismissableLayerInject(
        DISMISSABLE_NAME,
        scopeDismissableLayerbranch.value,
      ),
    )

    const node = ref<ComponentPublicInstanceRef<HTMLDivElement> | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(node, forwardedRef)

    watchEffect((onInvalidate) => {
      if (node.value)
        context.branches.value.add(node.value as any)

      onInvalidate(() => {
        context.branches.value.delete(node.value as any)
      })
    })

    const originalReturn = () =>
      h(Primitive.div, {
        ref: composedRefs,
        asChild: asChild.value,
        ...dismissableLayerBranchAttrs,
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

export type { InstanceDismissableLayerBranchType }
