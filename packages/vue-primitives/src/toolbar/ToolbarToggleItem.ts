import type { RovingFocusGroupItemEmits } from '../roving-focus/index.ts'
import type { ToggleGroupItemProps } from '../toggle-group/index.ts'

export interface ToolbarToggleItemProps {
  value: ToggleGroupItemProps['value']
}

export type ToolbarToggleItemEmits = RovingFocusGroupItemEmits
