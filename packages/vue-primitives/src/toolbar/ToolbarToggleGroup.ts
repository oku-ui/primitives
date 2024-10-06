import type { RadixPrimitiveReturns } from '../shared/typeUtils.ts'
import type { ToggleGroupEmits, ToggleGroupProps, ToggleGroupType } from '../toggle-group/index.ts'
import { useToggleGroup, type UseToggleGroupProps } from '../toggle-group/ToggleGroupRoot.ts'

export interface ToolbarToggleGroupProps<T extends ToggleGroupType> extends Omit<ToggleGroupProps<T>, 'rovingFocus'> {}

export type ToolbarToggleGroupEmits<T extends ToggleGroupType> = ToggleGroupEmits<T>

export interface UseToolbarToggleGroupProps<T extends ToggleGroupType> extends Omit<UseToggleGroupProps<T>, 'rovingFocus'> {}

export function useToolbarToggleGroup<T extends ToggleGroupType>(props: UseToolbarToggleGroupProps<T>): RadixPrimitiveReturns {
  const toggleGroup = useToggleGroup({
    type: props.type,
    value: props.value,
    onUpdateValue: props.onUpdateValue,
    defaultValue: props.defaultValue,

    disabled: props.disabled,
    rovingFocus: false,
    loop: props.loop,
    orientation: props.orientation,
    dir: props.dir,
  })

  return {
    attrs(extraAttrs) {
      return toggleGroup.attrs(extraAttrs)
    },
  }
}
