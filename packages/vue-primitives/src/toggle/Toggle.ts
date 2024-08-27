import type { PrimitiveProps } from '../primitive/index.ts'

export interface ToggleProps {
  as?: PrimitiveProps['as']
  /**
   * The controlled state of the toggle.
   */
  pressed?: boolean
  /**
   * The state of the toggle when initially rendered. Use `defaultPressed`
   * if you do not need to control the state of the toggle.
   * @defaultValue false
   */
  defaultPressed?: boolean

  disabled?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type ToggleEmits = {
  /**
   * The callback that fires when the state of the toggle changes.
   */
  'update:pressed': [value: boolean]
  'click': [event: MouseEvent]
}
