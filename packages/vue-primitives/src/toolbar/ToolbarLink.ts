import type { PrimitiveProps } from '../primitive/index.ts'
import type { RadixPrimitiveReturns } from '../shared/typeUtils.ts'
import { useRovingFocusGroupItem } from '../roving-focus/RovingFocusGroupItem.ts'
import { mergePrimitiveAttrs } from '../shared/mergeProps.ts'

export interface ToolbarLinkProps {
  as?: PrimitiveProps['as']
}

export function useToolbarLink(): RadixPrimitiveReturns {
  const rovingFocusGroupItem = useRovingFocusGroupItem({
    focusable() {
      return true
    },
  })

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return
    }

    if (event.key === ' ') {
      (event.currentTarget as HTMLElement).click()
    }
  }

  return {
    attrs(extraAttrs = []) {
      const attrs = {
        onKeydown,
      }

      mergePrimitiveAttrs(attrs, [rovingFocusGroupItem.attrs(), ...extraAttrs])

      return attrs
    },
  }
}
