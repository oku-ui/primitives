import type { InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, toValue } from 'vue'

export type Direction = 'ltr' | 'rtl'
export const DirectionContextSymbol = Symbol('OkuDirectionProvider') as InjectionKey<Ref<Direction>>

export function useDirection(localDir?: MaybeRefOrGetter<Direction | undefined>) {
  const globalDir = inject(DirectionContextSymbol, null)
  return computed(() => toValue(localDir) ?? globalDir?.value ?? 'ltr')
}
