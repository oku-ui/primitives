import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import { useConfigContext } from '../config/index.ts'

export type Direction = 'ltr' | 'rtl'

export function useDirection(localDir?: MaybeRefOrGetter<Direction | undefined>) {
  const globalConfig = useConfigContext()

  return computed(() => toValue(localDir) || toValue(globalConfig.dir) || 'ltr')
}
