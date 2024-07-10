import type { Ref } from 'vue'
import { createContext } from '../hooks/index.ts'
import type { PrimitiveProps } from '../primitive/index.ts'
import type { RovingFocusGroupProps } from '../roving-focus/index.ts'

export interface RadioGroupProps extends PrimitiveProps {
  name?: string
  required?: boolean
  disabled?: boolean
  dir?: RovingFocusGroupProps['dir']
  orientation?: RovingFocusGroupProps['orientation']
  loop?: RovingFocusGroupProps['loop']
  defaultValue?: string
  value?: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type RadioGroupEmits = {
  'update:value': [value: string]
}

export interface RadioGroupContextValue {
  name: () => string | undefined
  required: () => boolean
  disabled: () => boolean
  value: Ref<string>
  onValueChange: (value: string) => void
}

export const [provideRadioGroupContext, useRadioGroupContext] = createContext<RadioGroupContextValue>('RadioGroup')
