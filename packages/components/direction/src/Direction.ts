import { type PropType, defineComponent, inject, provide } from 'vue'

type Direction = 'ltr' | 'rtl'
const DirectionContextSymbol = Symbol('DirectionContext')

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
    // Direction context
    provide(DirectionContextSymbol, props.dir)
    return () => slots.default?.()
  },
})

/* ----------------------------------------------------------------------------------------------- */

function useDirection(localDir?: Direction) {
  const globalDir = inject(DirectionContextSymbol, null)
  return localDir || globalDir || 'ltr'
}

const Provider = DirectionProvider

export {
  useDirection,
  Provider,
  DirectionProvider,
}
