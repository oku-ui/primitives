import type { PrimitiveProps } from '../primitive/Primitive.ts'
import type { RadixPrimitiveReturns } from '../shared/typeUtils.ts'
import { mergePrimitiveAttrs } from '../shared/mergeProps.ts'
import { type ToggleGroupItemProps, useToggleGroupItem } from '../toggle-group/index.ts'
import { useToolbarButton } from './ToolbarButton.ts'

export interface ToolbarToggleItemProps {
  as?: PrimitiveProps['as']
  value: ToggleGroupItemProps['value']
  disabled?: boolean
}

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
