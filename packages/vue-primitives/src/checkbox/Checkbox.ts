import type { Ref } from 'vue'
import { createContext } from '../hooks/index.ts'
import type { PrimitiveProps } from '../primitive/index.ts'

export interface CheckboxProps extends PrimitiveProps {
  checked?: CheckedState
  defaultChecked?: CheckedState
  disabled?: boolean
  required?: boolean
  value?: string
  name?: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type CheckboxEmits = {
  'update:checked': [value: CheckedState]
}

export type CheckedState = boolean | 'indeterminate'

export interface CheckboxContext {
  state: Ref<CheckedState>
  disabled: Ref<boolean>
}

export const [provideCheckboxContext, useCheckboxContext] = createContext<CheckboxContext>('Checkbox')
