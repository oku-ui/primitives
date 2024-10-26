import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { type ToggleGroupItemProps, useToggleGroupItem } from '../toggle-group/index.ts'
import { useToolbarButton } from './ToolbarButton.ts'

export interface ToolbarToggleItemProps {
  as?: PrimitiveProps['as']
  value: ToggleGroupItemProps['value']
  disabled?: boolean
}

export const DEFAULT_TOOLBAR_TOGGLE_ITEM_PROPS = {
  as: 'button',
  disabled: undefined,
} satisfies PrimitiveDefaultProps<ToolbarToggleItemProps>

export interface UseToolbarToggleItem {
  value: () => ToggleGroupItemProps['value']
  disabled?: () => boolean | undefined
}

export function useToolbarToggleItem(props: UseToolbarToggleItem): RadixPrimitiveReturns {
  const toggleGroupItem = useToggleGroupItem({
    value: props.value,
    disabled: props.disabled,
  })

  const toolbarButton = useToolbarButton({
    disabled: props.disabled,
  })

  return {
    attrs(extraAttrs = []) {
      return toggleGroupItem.attrs([toolbarButton.attrs(), ...extraAttrs])
    },
  }
}
