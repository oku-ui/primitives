import { onMounted, ref, watch } from 'vue'
import { unrefElement } from './unrefElement'
import type { MaybeComputedElementRef } from './unrefElement'

function useUnrefToRef<T>(...refs: MaybeComputedElementRef[]) {
  const mergedRef = ref<T>()

  onMounted(() => {
    for (const r of refs) {
      const value = unrefElement(r)
      if (value)
        mergedRef.value = value as any
    }
  })

  watch(refs, () => {
    for (const r of refs) {
      const value = unrefElement(r)
      if (value)
        mergedRef.value = value as any
    }
  })

  return mergedRef
}

export { useUnrefToRef }
