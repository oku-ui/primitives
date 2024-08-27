import type { ToggleGroupProps, ToggleGroupType } from '../toggle-group/index.ts'

export interface ToolbarToggleGroupProps<T extends ToggleGroupType> {
  type: T
  loop?: ToggleGroupProps<T>['loop']
}
