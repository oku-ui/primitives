import { createContext } from '../hooks/index.ts'
import type { PrimitiveProps } from '../primitive/index.ts'

export interface RadioProps extends PrimitiveProps {
  name?: string
  value?: string
  checked?: boolean
  required?: boolean
  disabled?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type RadioEmits = {
  'update:checked': [checked: boolean]
}

export interface RadioContextValue {
  checked: () => boolean
  disabled: () => boolean
}
export const [provideRadioContext, useRadioContext] = createContext<RadioContextValue>('Radio')

export function getState(checked: boolean) {
  return checked ? 'checked' : 'unchecked'
}
