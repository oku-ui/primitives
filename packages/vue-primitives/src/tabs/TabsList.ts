import type { RovingFocusGroupRootEmits, RovingFocusGroupRootProps } from '../roving-focus/index.ts'

export interface TabsListProps {
  loop?: RovingFocusGroupRootProps['loop']
}

// eslint-disable-next-line ts/consistent-type-definitions
export type TabsListEmits = {
  mousedown: RovingFocusGroupRootEmits['mousedown']
  focus: RovingFocusGroupRootEmits['focus']
  focusout: RovingFocusGroupRootEmits['focusout']
}
