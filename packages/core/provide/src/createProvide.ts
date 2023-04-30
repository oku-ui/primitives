import type { InjectionKey } from 'vue'
import { defineComponent, inject, provide, reactive } from 'vue'

function createProvide<ProvideValueType extends object | null>(
  rootComponentName: string,
  defaultValue?: ProvideValueType,
) {
  const ProviderKey = Symbol(rootComponentName) as InjectionKey<ProvideValueType> // unique key
  const Provider = defineComponent({
    name: `${rootComponentName}Provider`,
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
      const value = reactive({ ...defaultValue, ...attrs }) as ProvideValueType
      provide(ProviderKey, value)

      if (!slots || !slots.default)
        throw new Error(`\`${rootComponentName}Provider\` must have a default slot :(`)

      return () => slots.default?.()
    },
  })

  function useInject(consumerName: string) {
    const context = inject(ProviderKey)
    if (context)
      return context

    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``)
  }

  return [Provider, useInject] as const
}

export { createProvide }
