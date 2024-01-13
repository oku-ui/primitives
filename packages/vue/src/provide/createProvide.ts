import type { InjectionKey, PropType } from 'vue'
import { inject, provide } from 'vue'

function createProvide<ProvideValueType extends object | null>(
  rootComponentName: string,
  defaultProvide?: ProvideValueType,
) {
  const Provide: InjectionKey<ProvideValueType | null> = Symbol(rootComponentName)
  function Provider(props: ProvideValueType) {
    provide(Provide, props)
  }

  function useInject(consumerName: string) {
    const provide = inject(Provide)
    if (provide)
      return provide
    if (defaultProvide !== undefined)
      return defaultProvide
    // if a defaultProvide wasn't specified, it's a required provide.
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``)
  }

  return [Provider, useInject] as const
}

type Scope<C = any> = { [scopeName: string]: InjectionKey<C>[] } | undefined

type ScopeHook = (scope: Scope) => { [__scopeProp: string]: Scope }
interface CreateScope {
  scopeName: string
  (): ScopeHook
}

function createProvideScope<T extends string>(scopeName: T, createProvideScopeDeps: CreateScope[] = []) {
  let defaultProviders: any[] = []
  /* -----------------------------------------------------------------------------------------------
   * createProvide
   * --------------------------------------------------------------------------------------------- */

  function createProvide<ProvideValueType extends object | null>(
    rootComponentName: T,
    defaultValue?: ProvideValueType,
  ) {
    const BaseProvideKey: InjectionKey<ProvideValueType | null> = Symbol(rootComponentName)

    const BaseScope = BaseProvideKey
    const index = defaultProviders.length
    defaultProviders = [...defaultProviders, BaseProvideKey]

    function useProvider(
      props: ProvideValueType & { scope: Scope<ProvideValueType> | undefined },
    ) {
      const { scope, ...context } = props

      const Provide = scope?.[scopeName][index] || BaseScope

      provide(Provide, context as any)
    }

    function useInject(consumerName: T, scope: Scope<ProvideValueType | undefined> | undefined): ProvideValueType {
      const Provide = scope?.[scopeName]?.[index] || BaseScope
      const provide = inject(Provide)
      if (provide)
        return provide
      if (defaultValue !== undefined)
        return defaultValue

      // // if a defaultProvide wasn't specified, it's a required provide.
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``)
    }

    // return [Provider, useInject] as const
    return {
      useProvider,
      useInject,
    }
  }

  /* -----------------------------------------------------------------------------------------------
   * createScope
   * --------------------------------------------------------------------------------------------- */
  const createScope: CreateScope = () => {
    const scopeProviders = defaultProviders.map((defaultContext) => {
      return defaultContext
    })

    return function useScope(scope: Scope) {
      const providers = scope?.[scopeName] || scopeProviders

      return ({
        [`scope${scopeName}`]: {
          ...scope,
          [scopeName]: providers,
        },
      })
    }
  }

  createScope.scopeName = scopeName
  // return [createProvide, composeProvderScopes(createScope, ...createProvideScopeDeps)] as const

  return {
    createProvide,
    composeProviderScopes: composeProviderScopes(createScope, ...createProvideScopeDeps),
  }
}

function composeProviderScopes(...scopes: CreateScope[]) {
  const baseScope = scopes[0]
  if (scopes.length === 1)
    return baseScope
  const createScope: CreateScope = () => {
    const scopeHooks = scopes.map((createScope) => {
      return ({
        useScope: createScope(),
        scopeName: createScope.scopeName,
      })
    })
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes, { useScope, scopeName }) => {
        // We are calling a hook inside a callback which React warns against to avoid inconsistent
        // renders, however, scoping doesn't have render side effects so we ignore the rule.
        const scopeProps = useScope(overrideScopes)

        const currentScope = scopeProps[`scope${scopeName}`]

        return { ...nextScopes, ...currentScope }
      }, {})
      const data = ({ [`scope${baseScope.scopeName}`]: nextScopes })
      return data
    }
  }

  createScope.scopeName = baseScope.scopeName
  return createScope
}

export const ScopePropObject = {
  type: Object as unknown as PropType<Scope>,
  required: false,
}

export { createProvide, createProvideScope }
export type { CreateScope, Scope }
