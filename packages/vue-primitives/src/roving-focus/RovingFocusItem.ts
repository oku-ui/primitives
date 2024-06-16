import type { PrimitiveProps } from '../primitive/index.ts'

export interface RovingFocusItemProps extends PrimitiveProps {
  tabStopId?: string
  focusable?: boolean
  active?: boolean
}
