import type { Ref } from 'vue'
import { createContext } from '../hooks/createContext.ts'
import type { PrimitiveProps } from '../primitive/index.ts'

export interface SwitchProps extends PrimitiveProps {
  checked?: boolean
  defaultChecked?: boolean
  required?: boolean

  disabled?: boolean
  value?: string
  name?: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type SwitchEmits = {
  'update:checked': [checked: boolean]
}

export interface SwitchContext {
  checked: Ref<boolean>
  disabled: () => boolean
}

export const [provideSwitchContext, useSwitchContext] = createContext<SwitchContext>('Switch')

export function getState(checked: boolean) {
  return checked ? 'checked' : 'unchecked'
}
