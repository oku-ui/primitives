import type { ComputedRef, InjectionKey } from 'vue'
import { computed, defineComponent, inject, provide } from 'vue'

function createProvide<ProvideValueType extends object | null>(
  rootComponentName: string,
  defaultProvide?: ProvideValueType,
) {
  const Provide = Symbol(rootComponentName)
  const Provider = defineComponent({
    name: `${rootComponentName}Provider`,
    inheritAttrs: false,
    setup(props, { slots }) {
      const value = computed(() => Object.values(props) as any)
      provide(Provide, value)
      if (!slots || !slots.default)
        throw new Error(`\`${rootComponentName}Provider\` must have a default slot :(`)

      return () => slots.default?.()
    },
  })

  function useContext(consumerName: string) {
    const provide = inject(Provide)
    if (provide)
      return provide
    if (defaultProvide !== undefined)
      return defaultProvide
    // if a defaultProvide wasn't specified, it's a required provide.
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``)
  }

  return [Provider, useContext] as const
}

/* -------------------------------------------------------------------------------------------------
 * createProvideScope
 * ----------------------------------------------------------------------------------------------- */

type VueProvide<C> = {
  key: InjectionKey<C>
  value: C
}
type Scope<C = any> = { [scopeName: string]: VueProvide<C>[] } | undefined

type ScopeHook = (scope: Scope) => ComputedRef<{ [__scopeProp: string]: Scope }>
interface CreateScope {
  scopeName: string
  (): ScopeHook
}

function createProvideScope(scopeName: string, createProvideScopeDeps: CreateScope[] = []) {
  let defaultProviders: any[] = []
  /* -----------------------------------------------------------------------------------------------
   * createContext
   * --------------------------------------------------------------------------------------------- */

  function createProvide<ProvideValueType extends object | null>(
    rootComponentName: string,
    defaultValue?: ProvideValueType,
  ) {
    const BaseProvideKey: InjectionKey<ProvideValueType | null> = Symbol(rootComponentName) as any
    // const BaseProvide = provide(BaseProvideKey, defaultValue)
    const BaseScope = { key: BaseProvideKey, value: defaultValue } as VueProvide<ProvideValueType | null>
    const index = defaultProviders.length
    defaultProviders = [...defaultProviders, [{ key: BaseProvideKey, value: defaultValue }]]

    function Provider(
      props: ProvideValueType & { scope: Scope<ProvideValueType> },
    ) {
      const { scope, ...context } = props as any
      const Provide = scope?.[scopeName][index] || BaseScope.key as ProvideValueType
      const value = computed<ProvideValueType>(() => context)
      provide(Provide, value)
    }

    function useInject(consumerName: string, scope: Scope<ProvideValueType | undefined>): ComputedRef<ProvideValueType> {
      const Provide = scope?.[scopeName]?.[index] || BaseScope
      console.log('TabListrovingFocusGroupScope useInject', scope)
      const provide = inject<ComputedRef>(Provide.key)
      console.log('useInject', provide?.value, Provide)
      if (provide)
        return provide
      if (defaultValue !== undefined)
        return computed(() => defaultValue)

      // // if a defaultProvide wasn't specified, it's a required provide.
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``)
    }

    return [Provider, useInject] as const
  }

  /* -----------------------------------------------------------------------------------------------
   * createScope
   * --------------------------------------------------------------------------------------------- */
  const createScope: CreateScope = () => {
    const scopeProviders = defaultProviders[0]
    console.log(scopeProviders, 'scopeProviders')
    return function useScope(scope: Scope) {
      const providers = scope?.[scopeName] || scopeProviders

      return computed(() => ({ [`scope${scopeName}`]: { ...scope, [scopeName]: providers } }))
    }
  }
  createScope.scopeName = scopeName
  return [createProvide, composeInjectScopes(createScope, ...createProvideScopeDeps)] as const
}

function composeInjectScopes(...scopes: CreateScope[]) {
  const baseScope = scopes[0]
  if (scopes.length === 1)
    return baseScope
  const createScope: CreateScope = () => {
    const scopeHooks = scopes.map(createScope => ({
      useScope: createScope(),
      scopeName: createScope.scopeName,
    }))
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes, { useScope, scopeName }) => {
        // We are calling a hook inside a callback which React warns against to avoid inconsistent
        // renders, however, scoping doesn't have render side effects so we ignore the rule.
        const scopeProps = useScope(overrideScopes)
        console.log('scopeProps', scopeProps.value)
        const currentScope = scopeProps.value[`scope${scopeName}`]
        return { ...nextScopes, ...currentScope }
      }, {})

      const data = computed(() => ({ [`scope${baseScope.scopeName}`]: nextScopes }))
      console.log('data', data)
      return data
    }
  }

  createScope.scopeName = baseScope.scopeName
  return createScope
}

export { createProvide, createProvideScope }
export type { CreateScope, Scope }
