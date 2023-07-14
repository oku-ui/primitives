import { ref } from 'vue'

let count = 0

function useId(deterministicId?: string): string {
  const id = ref<string | undefined>()

  if (!deterministicId)
    id.value = id.value ?? String(count++)

  return deterministicId || (id.value ? `oku-${id.value}` : '')
}

export { useId }
