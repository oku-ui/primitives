import { createContext } from '../hooks/index.ts'

export interface MenuRadioGroupProps {
  value?: string
  onValueChange?: (value: string) => void
}

// eslint-disable-next-line ts/consistent-type-definitions
export type MenuRadioGroupEmits = {
  /** Event handler called when the value changes. */
  'update:value': [payload: string]
}

export interface MenuRadioGroupContext {
  value: () => string | undefined
  onValueChange: (value: string) => void
}

export const [providRadioGroupContext, useRadioGroupContext] = createContext<MenuRadioGroupContext>(
  'MenuRadioGroup',
  {
    value() {
      return undefined
    },
    onValueChange() { },
  },
)
