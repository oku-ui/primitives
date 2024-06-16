import type { Ref } from 'vue'
import { createContext } from '../../hooks/createContext.ts'

interface ButtonGroupContext {
  value: Ref<string | undefined>
  setValue: (value: string | undefined) => void
}

export const [provideButtonGroupContext, useButtonGroupContext] = createContext<ButtonGroupContext>('ButtonGroupContext')
