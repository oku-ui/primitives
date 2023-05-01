import type { InjectionKey } from 'vue'
import { defineComponent, inject, provide, reactive } from 'vue'

function createProvide<ProvideValueType extends object | null>(
  key: InjectionKey<ProvideValueType>,
  rootComponentName: string,
  defaultValue?: ProvideValueType,
) {
  const Provider = defineComponent({
    name: `${rootComponentName}Provider`,
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
      const value = reactive({ ...defaultValue, ...attrs }) as ProvideValueType
      provide(key, value)

      if (!slots || !slots.default)
        throw new Error(`\`${rootComponentName}Provider\` must have a default slot :(`)

      return () => slots.default?.()
    },
  })

  function useInject(_key: InjectionKey<ProvideValueType>, consumerName: string) {
    const context = inject(_key)
    if (context)
      return context

    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``)
  }

  return [Provider, useInject] as const
}

export { createProvide }
