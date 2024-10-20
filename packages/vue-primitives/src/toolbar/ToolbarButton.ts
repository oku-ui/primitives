import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { useRovingFocusGroupItem } from '../roving-focus/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'

export interface ToolbarButtonProps {
  as?: PrimitiveProps['as']
  disabled?: boolean
}

export const DEFAULT_TOOLBAR_BUTTON_PROPS = {
  as: 'button',
  disabled: undefined,
} satisfies PrimitiveDefaultProps<ToolbarButtonProps>

export interface UseToolbarButtonProps {
  disabled?: () => boolean | undefined
}

export function useToolbarButton(props: UseToolbarButtonProps = {}): RadixPrimitiveReturns {
  const { disabled = () => undefined } = props

  const rovingFocusGroupItem = useRovingFocusGroupItem({
    focusable() {
      return !disabled()
    },
  })

  return {
    attrs(extraAttrs = []) {
      const attrs = {
        type: 'button',
        disabled: disabled(),
      }

      mergePrimitiveAttrs(attrs, [rovingFocusGroupItem.attrs(), ...extraAttrs])

      return attrs
    },
  }
}
