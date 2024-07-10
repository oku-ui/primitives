import type { PrimitiveProps } from '../primitive/index.ts'

export interface RovingFocusGroupItemProps extends PrimitiveProps {
  tabStopId?: string
  focusable?: boolean
  active?: boolean
}
