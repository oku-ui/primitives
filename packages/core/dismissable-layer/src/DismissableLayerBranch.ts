import { Primitive } from '@oku-ui/primitive'
import { defineComponent, h, ref, watchEffect } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { DismissableLayerBranchElement, DismissableLayerBranchNativeElement } from './props'
import { BRANCH_NAME, dismissableLayerBranchProps, dismissableLayerInject, scopeDismissableLayerProps } from './props'

const DismissableLayerBranch = defineComponent({
  name: BRANCH_NAME,
  inheritAttrs: false,
  props: {
    ...dismissableLayerBranchProps.props,
    ...scopeDismissableLayerProps,
  },
  emits: dismissableLayerBranchProps.emits,
  setup(props, { attrs, slots }) {
    const inject = dismissableLayerInject
    const node = ref<DismissableLayerBranchElement | null>()

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, node)

    watchEffect((onInvalidate) => {
      const _node = node.value

      if (_node)
        inject.branches.add(_node)

      onInvalidate(() => {
        if (_node)
          inject.branches.delete(_node)
      })
    })

    return () => h(Primitive.div,
      {
        ...attrs,
        ref: composedRefs,
        asChild: props.asChild,
      }, slots,
    )
  },
})

export const OkuDismissableLayerBranch = DismissableLayerBranch as typeof DismissableLayerBranch &
(new () => { $props: DismissableLayerBranchNativeElement })
