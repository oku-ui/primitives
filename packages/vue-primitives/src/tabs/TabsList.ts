import type { PrimitiveProps } from '../primitive/index.ts'
import type { RovingFocusGroupProps } from '../roving-focus/index.ts'

export interface TabsListProps extends PrimitiveProps {
  loop?: RovingFocusGroupProps['loop']
}
