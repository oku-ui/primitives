import type { Ref } from 'vue'
import { createContext } from '../hooks/index.ts'
import type { RovingFocusGroupRootProps } from '../roving-focus/RovingFocusGroupRoot.ts'

export interface ToolbarProps {
  orientation?: RovingFocusGroupRootProps['orientation']
  loop?: RovingFocusGroupRootProps['loop']
  dir?: RovingFocusGroupRootProps['dir']
}

interface ToolbarContextValue {
  orientation: () => Required<RovingFocusGroupRootProps>['orientation']
  dir: Ref<Required<RovingFocusGroupRootProps>['dir']>
}
export const [provideToolbarContext, useToolbarContext] = createContext<ToolbarContextValue>('Toolbar')
