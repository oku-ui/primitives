import type { RadixPrimitiveReturns } from '../shared/typeUtils.ts'
import type { ToggleGroupItemProps } from '../toggle-group/index.ts'
import { useRovingFocusGroupItem } from '../roving-focus/RovingFocusGroupItem.ts'
import { mergePrimitiveAttrs } from '../shared/mergeProps.ts'
import { useToolbarButton } from './ToolbarButton.ts'

export interface ToolbarToggleItemProps {
  value: ToggleGroupItemProps['value']
  disabled?: boolean
}

export interface UseToolbarToggleItem {
  value: () => ToggleGroupItemProps['value']
  disabled?: () => boolean | undefined
}

export function useToolbarToggleItem(props: UseToolbarToggleItem): RadixPrimitiveReturns {
  const rovingFocusGroupItem = useRovingFocusGroupItem()

  const toolbarButton = useToolbarButton({
    disabled: props.disabled,
  })

  return {
    attrs(extraAttrs = []) {
      const attrs = rovingFocusGroupItem.attrs()

      mergePrimitiveAttrs(attrs, [toolbarButton.attrs(), ...extraAttrs])

      return attrs
    },
  }
}
