import type { PrimitiveProps } from '../primitive/index.ts'

export interface ToggleGroupItemProps {
  as?: PrimitiveProps['as']
  /**
   * A string value for the toggle group item. All items within a toggle group should use a unique value.
   */
  value: string

  disabled?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type ToggleGroupItemEmits = {
  /**
   * Emitted when the toggle group item is clicked.
   */
  click: [event: MouseEvent]
}
