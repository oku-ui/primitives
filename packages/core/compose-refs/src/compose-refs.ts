import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'

function useComposedRefs(refs: Ref[]) {
  const composedRef = ref(null)

  onMounted(() => {
    composedRef.value = refs.reduce((acc: any, ref) => {
      if (!ref || !ref.value)
        return acc
      if (typeof acc === 'function') {
        return (value: any) => {
          ref.value = value
          acc(value)
        }
      }
      else {
        ref.value = acc
        return ref.value
      }
    }, null)
  })

  onUnmounted(() => {
    refs.forEach((ref) => {
      if (ref && ref.value)
        ref.value = null
    })
  })

  return composedRef
}

export { useComposedRefs }
