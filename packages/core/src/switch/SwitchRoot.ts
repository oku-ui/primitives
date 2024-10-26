import type { PrimitiveProps } from '../primitive/index.ts'
import { type Ref, shallowRef } from 'vue'
import { createContext, type MutableRefObject, useControllableStateV2, useRef } from '../hooks/index.ts'
import { type EmitsToHookProps, mergePrimitiveAttrs, type PrimitiveDefaultProps, type RadixPrimitiveReturns } from '../shared/index.ts'

export interface SwitchRootProps {
  as?: PrimitiveProps['as']
  checked?: boolean
  defaultChecked?: boolean
  required?: boolean

  disabled?: boolean
  value?: string
  name?: string
}

export const DEFAULT_SWITCH_ROOT_PROPS = {
  as: 'button',
  checked: undefined,
  defaultChecked: undefined,
  value: 'on',
  required: undefined,
  disabled: undefined,
} satisfies PrimitiveDefaultProps<SwitchRootProps>

export type SwitchRootEmits = {
  'update:checked': [checked: boolean]
}

export interface SwitchRootContext {
  checked: Ref<boolean>
  disabled: () => boolean | undefined
  bubbleInput: {
    control: Ref<HTMLButtonElement | undefined>
    bubbles: MutableRefObject<boolean>
    isFormControl: MutableRefObject<boolean>
    name: () => string | undefined
    value: () => string
    checked: Ref<boolean>
    required: () => boolean | undefined
    disabled: () => boolean | undefined
  }
}

export const [provideSwitchContext, useSwitchContext] = createContext<SwitchRootContext>('Switch')

export interface UseSwitchRootProps extends EmitsToHookProps<SwitchRootEmits> {
  control?: Ref<HTMLButtonElement | undefined>
  checked?: () => boolean | undefined
  defaultChecked?: boolean
  disabled?: () => boolean | undefined
  required?: () => boolean | undefined
  value?: () => string
  name?: () => string | undefined
}

export function useSwitchRoot(props: UseSwitchRootProps): RadixPrimitiveReturns {
  const {
    disabled = () => undefined,
    required = () => undefined,
    value = () => 'on',
    name = () => undefined,
  } = props

  const control = props.control || shallowRef<HTMLButtonElement>()
  const setElRef = props.control ? undefined : (value: HTMLElement | undefined) => control.value = value as HTMLButtonElement

  const bubbles = useRef(true)

  // We set this to true by default so that events bubble to forms without JS (SSR)
  const isFormControl = useRef(false)
  const checked = useControllableStateV2(props.checked, props.onUpdateChecked, props.defaultChecked)

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented)
      return
    checked.value = !checked.value

    if (isFormControl.value) {
      bubbles.value = !event.cancelBubble
    }
  }

  provideSwitchContext({
    checked,
    disabled,
    bubbleInput: {
      control,
      bubbles,
      isFormControl,
      name,
      value,
      checked,
      required,
      disabled,
    },
  })

  return {
    attrs(extraAttrs) {
      const _disabled = disabled()
      const _checked = checked.value
      const attrs = {
        'elRef': setElRef,
        'type': 'button',
        'role': 'switch',
        'aria-checked': _checked,
        'aria-required': required(),
        'data-state': _checked ? 'checked' : 'unchecked',
        'data-disabled': _disabled ? '' : undefined,
        'disabled': _disabled,
        'value': value(),
        onClick,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
