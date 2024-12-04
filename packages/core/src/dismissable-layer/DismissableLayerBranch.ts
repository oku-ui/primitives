import { onBeforeUnmount, onMounted } from 'vue'
import { type MutableRefObject, useRef } from '../hooks/index.ts'

import { mergePrimitiveAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { context } from './DismissableLayer.ts'

export interface UseDismissableLayerBranchProps {
  elRef?: MutableRefObject<HTMLElement | undefined>
}

export function useDismissableLayerBranch(props: UseDismissableLayerBranchProps = {}): RadixPrimitiveReturns {
  const elRef = props.elRef ?? useRef<HTMLElement>()
  const setElRef = props.elRef ? undefined : (value: HTMLElement | undefined) => elRef.value = value

  onMounted(() => {
    context.branches.add(elRef.value!)
  })

  onBeforeUnmount(() => {
    context.branches.delete(elRef.value!)
  })

  const attrs = {
    elRef: setElRef,
  }

  return {
    attrs(extraAttrs) {
      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
