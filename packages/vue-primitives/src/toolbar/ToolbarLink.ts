import type { PrimitiveProps } from '@oku-ui/primitive'
import type { RovingFocusGroupItemEmits } from '../roving-focus/index.ts'

export interface ToolbarLinkProps {
  as?: PrimitiveProps['as']
}

export type ToolbarLinkEmits = {
  keydown: [event: KeyboardEvent]
} & RovingFocusGroupItemEmits
