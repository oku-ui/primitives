import type { Ref } from 'vue'
import { createContext } from '../hooks/index.ts'
import type { RovingFocusGroupRootEmits, RovingFocusGroupRootProps } from '../roving-focus/index.ts'

export interface RadioGroupRootProps {
  name?: string
  required?: boolean
  disabled?: boolean
  dir?: RovingFocusGroupRootProps['dir']
  orientation?: RovingFocusGroupRootProps['orientation']
  loop?: RovingFocusGroupRootProps['loop']
  defaultValue?: string
  value?: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type RadioGroupRootEmits = {
  'update:value': [value: string]
  'mousedown': RovingFocusGroupRootEmits['mousedown']
  'focus': RovingFocusGroupRootEmits['focus']
  'focusout': RovingFocusGroupRootEmits['focusout']
}

export interface RadioGroupContext {
  name: () => string | undefined
  required: () => boolean
  disabled: () => boolean
  value: Ref<string>
  onValueChange: (value: string) => void
}

export const [provideRadioGroupContext, useRadioGroupContext] = createContext<RadioGroupContext>('RadioGroup')
