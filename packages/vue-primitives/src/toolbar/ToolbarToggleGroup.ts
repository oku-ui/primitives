import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import type { ToggleGroupEmits, ToggleGroupProps, ToggleGroupType } from '../toggle-group/index.ts'
import { useToggleGroup, type UseToggleGroupProps } from '../toggle-group/ToggleGroupRoot.ts'
import { useToolbarContext } from './ToolbarRoot.ts'

export interface ToolbarToggleGroupProps<T extends ToggleGroupType> extends Omit<ToggleGroupProps<T>, 'rovingFocus'> {}

export const DEFAULT_TOOLBAR_TOGGLE_GROUP_PROPS = {
  disabled: undefined,
  loop: undefined,
} satisfies PrimitiveDefaultProps<ToolbarToggleGroupProps<ToggleGroupType>>

export type ToolbarToggleGroupEmits<T extends ToggleGroupType> = ToggleGroupEmits<T>

export interface UseToolbarToggleGroupProps<T extends ToggleGroupType> extends Omit<UseToggleGroupProps<T>, 'rovingFocus'> {}

export function useToolbarToggleGroup<T extends ToggleGroupType>(props: UseToolbarToggleGroupProps<T>): RadixPrimitiveReturns {
  const context = useToolbarContext('ToolbarToggleGroup')

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

  const attrs = {
    'data-orientation': context.orientation,
  }

  return {
    attrs(extraAttrs = []) {
      return toggleGroup.attrs([attrs, ...extraAttrs])
    },
  }
}
