import { computed, defineComponent, inject, provide, toRefs } from 'vue'
import type { InjectionKey, PropType, Ref } from 'vue'

type Direction = 'ltr' | 'rtl'
const DirectionContextSymbol = Symbol('OkuDirectionProvider') as InjectionKey<Ref<Direction>>

/* -------------------------------------------------------------------------------------------------
 * Direction
 * ----------------------------------------------------------------------------------------------- */

const DirectionProvider = defineComponent({
  name: 'DirectionProvider',
  props: {
    dir: {
      type: String as PropType<Direction>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const { dir } = toRefs(props)

    provide(DirectionContextSymbol, dir)
    return () => slots.default?.()
  },
})

/* ----------------------------------------------------------------------------------------------- */

function useDirection(localDir?: Direction) {
  const globalDir = inject(DirectionContextSymbol, null)
  return computed(() => localDir ?? globalDir?.value ?? 'ltr')
}

const Provider = DirectionProvider

export {
  useDirection,
  Provider,
  DirectionProvider,
}
