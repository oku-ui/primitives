import { type InjectionKey, inject, provide } from 'vue'

/**
 * Create global state that can be injected into components.
 *
 * @see https://vueuse.org/createInjectionState
 *
 */
export function createContext<T>(
  contextName: string,
  defaultValue?: T,
): readonly [useProvidingState: (state: T) => void, useContext: () => T] {
  const key: string | InjectionKey<T> = Symbol(contextName)

  const useProvideContext = (state: T) => {
    provide(key, state)
  }

  const useContext = (consumerName?: string) => {
    const state = inject(key, defaultValue)

    if (!state) {
      throw new Error(`\`${consumerName}\` must be used within \`${contextName}\``)
    }

    return state
  }

  return [useProvideContext, useContext]
}
