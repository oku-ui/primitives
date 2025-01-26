import type { MutableRefObject } from '../hooks/index.ts'
import type { RadixPrimitiveReturns } from '../shared/index.ts'
import { onBeforeUnmount, onMounted } from 'vue'

import { useRef } from '../hooks/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
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

  return {
    attrs(extraAttrs) {
      const attrs = {
        elRef: setElRef,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
