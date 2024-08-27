import type { PrimitiveProps } from '../primitive/index.ts'

export interface RovingFocusGroupItemProps {
  as?: PrimitiveProps['as']
  tabStopId?: string
  focusable?: boolean
  active?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type RovingFocusGroupItemEmits = {
  mousedown: [event: MouseEvent]
  focus: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}
