import type { PrimitiveProps } from '../primitive/index.ts'
import { useControllableStateV2 } from '../hooks/useControllableState.ts'
import { type EmitsToHookProps, mergePrimitiveAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'

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

export type ToggleEmits = {
  /**
   * The callback that fires when the state of the toggle changes.
   */
  'update:pressed': [value: boolean]
}

export interface UseToggleProps extends EmitsToHookProps<ToggleEmits> {
  pressed?: () => boolean | undefined
  defaultPressed?: boolean
  disabled?: () => boolean | undefined
}

export function useToggle(props: UseToggleProps): RadixPrimitiveReturns {
  const pressed = useControllableStateV2(props.pressed, props.onUpdatePressed, props.defaultPressed)

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented)
      return
    pressed.value = !pressed.value
  }

  return {
    attrs(extraAttrs) {
      const _isDisabled = props.disabled?.()
      const attrs = {
        'type': 'button',
        'aria-pressed': pressed.value,
        'data-state': pressed.value ? 'on' : 'off',
        'disabled': _isDisabled,
        'data-disabled': _isDisabled ? '' : undefined,
        onClick,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
