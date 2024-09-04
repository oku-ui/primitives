import { createContext } from '../hooks/index.ts'
import type { PrimitiveProps } from '../primitive/index.ts'

export interface RadioProps {
  as?: PrimitiveProps['as']
  name?: string
  value?: string
  checked?: boolean
  required?: boolean
  disabled?: boolean
}

export type ClickEvent = Event & { _stopPropagation: Event['stopPropagation'], _isPropagationStopped: boolean, isPropagationStopped: () => boolean }

// eslint-disable-next-line ts/consistent-type-definitions
export type RadioEmits = {
  'update:checked': [checked: boolean]
  'click': [event: ClickEvent]
}

export interface RadioContext {
  checked: () => boolean
  disabled: () => boolean
}
export const [provideRadioContext, useRadioContext] = createContext<RadioContext>('Radio')

export function getState(checked: boolean) {
  return checked ? 'checked' : 'unchecked'
}
