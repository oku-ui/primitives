import type { PrimitiveProps } from '@oku-ui/primitive'
import type { RovingFocusGroupItemEmits } from '../roving-focus/index.ts'

export interface ToolbarButtonProps {
  as?: PrimitiveProps['as']
  disabled?: boolean
}

export type ToolbarButtonEmits = RovingFocusGroupItemEmits
