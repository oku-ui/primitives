import type { Ref } from 'vue'
import type { PrimitiveProps } from '../primitive/index.ts'
import { createContext, type MutableRefObject } from '../hooks/index.ts'

export interface CheckboxRootProps {
  as?: PrimitiveProps['as']
  checked?: CheckedState
  defaultChecked?: CheckedState
  disabled?: boolean
  required?: boolean
  value?: string
  name?: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type CheckboxRootEmits = {
  'update:checked': [value: CheckedState]
  'keydown': [event: KeyboardEvent]
  'click': [event: MouseEvent]
}

// eslint-disable-next-line ts/consistent-type-definitions
export type CheckboxRootSlots = {
  default: (props: {
    isFormControl: boolean
    input: {
      control: HTMLButtonElement | undefined
      bubbles: MutableRefObject<boolean>
      name?: string
      value: string
      checked: CheckedState
      required?: boolean
      disabled?: boolean
    }
  }) => any
}

export type CheckedState = boolean | 'indeterminate'

export interface CheckboxContext {
  state: Ref<CheckedState>
  disabled: () => boolean
}

export const [provideCheckboxContext, useCheckboxContext] = createContext<CheckboxContext>('Checkbox')
