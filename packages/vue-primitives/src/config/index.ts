import { inject, type InjectionKey, provide, type Ref } from 'vue'
import type { Direction } from '../direction'
// import { createContext } from '../hooks/createContext.ts'

export interface ConfigContext {
  dir?: Ref<Direction>
  // scrollBody?: Ref<boolean | ScrollBodyOption>
  useId?: () => string
}

export const [provideConfigContext, useConfigContext] = createContext<ConfigContext>('Config')

function createContext<T>(
  contextName: string,
  defaultValue?: T,
): readonly [useProvidingState: (state: T) => void, useContext: (consumerName?: string) => T | undefined] {
  const key: string | InjectionKey<T> = Symbol(contextName)

  const provideContext = (state: T) => {
    provide(key, state)
  }

  const useContext = () => {
    const state = inject(key, defaultValue)

    return state
  }

  return [provideContext, useContext]
}
