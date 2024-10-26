import { inject, type InjectionKey, provide } from 'vue'

/**
 * Create global state that can be injected into components.
 *
 * @see https://vueuse.org/createInjectionState
 *
 */
export function createContext<T>(contextName: string, defaultValue: T): readonly [useProvidingState: (state: T) => void, useContext: (consumerName?: string) => T]
export function createContext<T>(contextName: string): readonly [useProvidingState: (state: T) => void, useContext: (consumerName: string) => T]
export function createContext<T>(contextName: string, defaultValue?: T): readonly [useProvidingState: (state: T) => void, useContext: (consumerName?: string) => T] {
  const key: string | InjectionKey<T> = Symbol(contextName)

  const provideContext = (state: T) => {
    provide(key, state)
  }

  const useContext = (consumerName?: string) => {
    const state = inject(key, defaultValue)

    if (!state) {
      throw new Error(`\`${consumerName}\` must be used within \`${contextName}\``)
    }

    return state
  }

  return [provideContext, useContext]
}
