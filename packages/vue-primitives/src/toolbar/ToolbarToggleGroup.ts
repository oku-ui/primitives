import type { ToggleGroupProps, ToggleGroupType } from '../toggle-group/index.ts'

export interface ToolbarToggleGroupProps<T extends ToggleGroupType> extends Omit<ToggleGroupProps<T>, 'rovingFocus' | 'orientation' | 'dir'> {}
