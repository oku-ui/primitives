import type { Ref } from 'vue'
import { createContext } from '../hooks/index.ts'
import type { PrimitiveProps } from '../primitive/index.ts'
import type { RovingFocusGroupProps } from '../roving-focus/RovingFocusGroup.ts'

export interface ToolbarProps extends PrimitiveProps {
  orientation?: RovingFocusGroupProps['orientation']
  loop?: RovingFocusGroupProps['loop']
  dir?: RovingFocusGroupProps['dir']
}

interface ToolbarContextValue {
  orientation: () => Required<RovingFocusGroupProps>['orientation']
  dir: Ref<Required<RovingFocusGroupProps>['dir']>
}
export const [provideToolbarContext, useToolbarContext] = createContext<ToolbarContextValue>('Toolbar')
