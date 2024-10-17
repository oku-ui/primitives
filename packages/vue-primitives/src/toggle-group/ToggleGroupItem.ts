import type { PrimitiveProps } from '@oku-ui/primitive'

export interface ToggleGroupItemProps {
  as?: PrimitiveProps['as']
  /**
   * A string value for the toggle group item. All items within a toggle group should use a unique value.
   */
  value: string

  disabled?: boolean
}

export type ToggleGroupItemEmits = {
  /**
   * Emitted when the toggle group item is clicked.
   */
  click: [event: MouseEvent]
}
