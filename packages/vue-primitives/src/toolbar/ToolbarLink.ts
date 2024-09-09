import type { PrimitiveProps } from '../primitive/index.ts'
import type { RovingFocusGroupItemEmits } from '../roving-focus/RovingFocusGroupItem.ts'

export interface ToolbarLinkProps {
  as?: PrimitiveProps['as']
}

export type ToolbarLinkEmits = {
  keydown: [event: KeyboardEvent]
} & RovingFocusGroupItemEmits
