import type { InjectionKey, PropType } from 'vue'
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

type VueProvide<C> = {
  key: InjectionKey<C>
  value: C
}
type Scope<C = any> = { [scopeName: string]: VueProvide<C>[] } | undefined

type ScopeHook = (scope: Scope) => { [__scopeProp: string]: Scope }
interface CreateScope {
  scopeName: string
  (): ScopeHook
}

function createProvideScope(scopeName: string, createProvideScopeDeps: CreateScope[] = []) {
  let defaultProviders: any[] = []
  /* -----------------------------------------------------------------------------------------------
   * createProvide
   * --------------------------------------------------------------------------------------------- */

  function createProvide<ProvideValueType extends object | null>(
    rootComponentName: string,
    defaultValue?: ProvideValueType,
  ) {
    const BaseProvideKey: InjectionKey<ProvideValueType | null> = Symbol(rootComponentName) as any

    const BaseScope = { key: BaseProvideKey, value: defaultValue } as VueProvide<ProvideValueType | null>
    const index = defaultProviders.length
    defaultProviders = [...defaultProviders, [{ key: BaseProvideKey, value: defaultValue }]]

    function Provider(
      props: ProvideValueType & { scope: Scope<ProvideValueType> | undefined },
    ) {
      const { scope, ...context } = props

      const Provide = scope?.[scopeName][index] || BaseScope.key
      provide(Provide, context)
    }

    function useInject(consumerName: string, scope: Scope<ProvideValueType | undefined> | undefined): ProvideValueType {
      const Provide = scope?.[scopeName]?.[index] || BaseScope
      console.log('aaa', Provide)
      const provide = inject(Provide.key)
      console.log('provide', provide)
      if (provide)
        return provide
      if (defaultValue !== undefined)
        return defaultValue

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

    return function useScope(scope: Scope) {
      const providers = scope?.[scopeName] || scopeProviders

      return ({ [`scope${scopeName}`]: { ...scope, [scopeName]: providers } })
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
