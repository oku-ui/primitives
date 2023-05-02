import type { InjectionKey } from 'vue'
import { defineComponent, inject, provide, reactive } from 'vue'

/**
 * A function that create a provide/inject pair. It's useful for creating a context for a component.
 *
 * It returns a component `Provider` and a function `useInject`.
 *
 * `Provider` is a component that provides the context to its children.
 *  - It must have a default slot.
 *  - Props passed to the component will be shared  as context via provide API.
 *  - must be used as a wrapper for the component that needs the context
 *
 * `useInject` is a function that returns the context.
 *  - It must be used within the component that needs the context.
 *  - It throws an error if it's used outside of the component.
 *
 * @param key Symbol key for provide/inject
 * @param rootComponentName string name of the root component
 * @param defaultValue any : optional  default value for the context
 * @returns [Provider, useInject]
 */
function createProvide<ProvideValueType extends object | null>(
  key: InjectionKey<ProvideValueType>,
  rootComponentName: string,
  defaultValue?: ProvideValueType,
) {
  // wrapper component that contains the context
  const Provider = defineComponent({
    name: `${rootComponentName}Provider`,
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
      const value = reactive({ ...defaultValue, ...attrs }) as ProvideValueType & typeof attrs

      provide(key, value)

      if (!slots || !slots.default)
        throw new Error(`\`${rootComponentName}Provider\` must have a default slot :(`)

      return () => slots.default?.()
    },
  })

  // function returns the context
  function useInject(_key: InjectionKey<ProvideValueType>, consumerName: string) {
    const context = inject(_key)

    if (context)
      return context

    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``)
  }

  return [Provider, useInject] as const
}

export { createProvide }
