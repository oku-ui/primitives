import type { PrimitiveProps } from '~/primitive/index.ts'
import type { ToggleProps } from '~/toggle/index.ts'

export interface ToggleGroupItemProps extends PrimitiveProps {
  pressed?: ToggleProps['pressed']

  /**
   * A string value for the toggle group item. All items within a toggle group should use a unique value.
   */
  value: string

  disabled?: boolean
}
