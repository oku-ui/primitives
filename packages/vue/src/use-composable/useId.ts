import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

const useGlobalState = createGlobalState(() => {
  const count = ref(0)
  return { count }
})

export function useId(deterministicId?: string): string {
  const id = ref<string | undefined>()
  const { count } = useGlobalState()

  if (!deterministicId)
    id.value = id.value ?? String(count.value++)

  return deterministicId || (id.value ? `oku-${id.value}` : '')
}
