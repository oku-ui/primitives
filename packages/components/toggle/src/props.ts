import type { PropType } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'

export const TOGGLE_NAME = 'OkuToggle'

/* -------------------------------------------------------------------------------------------------
 * Toggle - toggle-ts
 * ----------------------------------------------------------------------------------------------- */

export type ToggleElementNativeElement = Omit<OkuElement<'button'>, 'aria-checked' | 'aria-pressed' | 'ariaChecked'>
export type ToggleElement = Omit<HTMLButtonElement, 'aria-checked' | 'aria-pressed' | 'ariaChecked'>

export interface ToggleProps extends PrimitiveProps {
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
  modelValue?: boolean
}

export type ToggleEmits = {
  /**
   * The callback that fires when the state of the toggle changes.
   */
  'pressedChange': [pressed: boolean]
  'update:modelValue': [pressed: boolean]
  'click': [event: MouseEvent]
}

export const toggleProps = {
  props: {
    modelValue: {
      type: Boolean as PropType<ToggleProps['modelValue']>,
      default: undefined,
    },
    pressed: {
      type: Boolean as PropType<ToggleProps['pressed']>,
      default: undefined,
    },
    defaultPressed: {
      type: Boolean as PropType<ToggleProps['defaultPressed']>,
      default: false,
    },
    disabled: {
      type: Boolean as PropType<ToggleProps['disabled']>,
      default: false,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'pressedChange': (pressed: ToggleEmits['pressedChange'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (pressed: ToggleEmits['update:modelValue'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'click': (event: ToggleEmits['click'][0]) => true,
  },
}
