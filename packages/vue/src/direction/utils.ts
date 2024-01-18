import { computed, inject, unref } from 'vue'
import type { InjectionKey, MaybeRef, Ref } from 'vue'

export type Direction = 'ltr' | 'rtl'
export const DirectionContextSymbol = Symbol('OkuDirectionProvider') as InjectionKey<Ref<Direction>>

export function useDirection(localDir?: MaybeRef<Direction | undefined>) {
  const globalDir = inject(DirectionContextSymbol, null)
  return computed(() => unref(localDir) ?? globalDir?.value ?? 'ltr')
}
