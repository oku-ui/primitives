import { computed, defineComponent, inject, provide, toRefs, unref } from 'vue'
import type { InjectionKey, MaybeRef, PropType, Ref } from 'vue'

export type Direction = 'ltr' | 'rtl'
const DirectionContextSymbol = Symbol('OkuDirectionProvider') as InjectionKey<Ref<Direction>>

export interface DirectionProviderProps {
  dir: Direction
}

export const directionProviderProps = {
  props: {
    dir: {
      type: String as PropType<Direction>,
      required: true,
    },
  },
}

const DirectionProvider = defineComponent({
  name: 'DirectionProvider',
  props: {
    ...directionProviderProps.props,
  },
  setup(props, { slots }) {
    const { dir } = toRefs(props)

    provide(DirectionContextSymbol, dir as Ref<Direction>)
    return () => slots.default?.()
  },
})

/* ----------------------------------------------------------------------------------------------- */

export function useDirection(localDir?: MaybeRef<Direction | undefined>) {
  const globalDir = inject(DirectionContextSymbol, null)
  return computed(() => unref(localDir) ?? globalDir?.value ?? 'ltr')
}

export const OkuDirectionProvider = DirectionProvider
