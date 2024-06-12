import { type MaybeRefOrGetter, computed, toValue } from 'vue'

export type Direction = 'ltr' | 'rtl'

export function useDirection(localDir?: MaybeRefOrGetter<Direction | undefined>) {
  return computed(() => toValue(localDir) || 'ltr')
}
