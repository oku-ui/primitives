import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { useRovingFocusGroupItem } from '../roving-focus/RovingFocusGroupItem.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'

export interface ToolbarLinkProps {
  as?: PrimitiveProps['as']
}

export const DEFAULT_TOOLBAR_LINK_PROPS = {
  as: 'a',
} satisfies PrimitiveDefaultProps<ToolbarLinkProps>

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
