import type { Ref } from 'vue'
import type { RovingFocusGroupRootEmits, RovingFocusGroupRootProps } from '../roving-focus/index.ts'
import { createContext } from '@oku-ui/hooks'

export interface ToolbarRootProps {
  orientation?: RovingFocusGroupRootProps['orientation']
  loop?: RovingFocusGroupRootProps['loop']
  dir?: RovingFocusGroupRootProps['dir']
}

export type ToolbarRootEmits = {
  mousedown: RovingFocusGroupRootEmits['mousedown']
  focus: RovingFocusGroupRootEmits['focus']
  focusout: RovingFocusGroupRootEmits['focusout']
}

export interface ToolbarContext {
  orientation: () => Required<RovingFocusGroupRootProps>['orientation']
  dir: Ref<Required<RovingFocusGroupRootProps>['dir']>
}
export const [provideToolbarContext, useToolbarContext] = createContext<ToolbarContext>('Toolbar')
