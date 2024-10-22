import { onBeforeUnmount, onMounted } from 'vue'
import { type MutableRefObject, useRef } from '../hooks/index.ts'

import { mergePrimitiveAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { context } from './DismissableLayer.ts'

export interface UseDismissableLayerBranchProps {
  elRef?: MutableRefObject<HTMLElement | undefined>
}

export function useDismissableLayerBranch(props: UseDismissableLayerBranchProps = {}): RadixPrimitiveReturns {
  const elRef = props.elRef ?? useRef<HTMLElement>()
  const setTemplateEl = props.elRef ? undefined : (value: HTMLElement | undefined) => elRef.value = value

  onMounted(() => {
    context.branches.add(elRef.value!)
  })

  onBeforeUnmount(() => {
    context.branches.delete(elRef.value!)
  })

  return {
    attrs(extraAttrs) {
      const attrs = {
        elRef: setTemplateEl,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
