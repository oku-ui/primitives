import type { RadixPrimitiveReturns } from '../shared/index.ts'
import { computed, type Ref } from 'vue'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'

export function useScrollAreaCorner(): RadixPrimitiveReturns<{ hasCorner: Ref<boolean> }> {
  const context = useScrollAreaContext('ScrollAreaCorner')
  const hasCorner = computed(() => context.type !== 'scroll' && Boolean(context.scrollbarX.value && context.scrollbarY.value))

  return {
    hasCorner,
  }
}
