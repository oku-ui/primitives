import type { Ref } from 'vue'
import { computed, ref, watch } from 'vue'

function usePrevious<T>(newData: Ref<T>) {
  const previousValue = ref<T>()
  const currentValue = ref<T>()

  previousValue.value = newData.value
  currentValue.value = newData.value

  watch(newData, () => {
    if (currentValue.value !== newData.value) {
      previousValue.value = currentValue.value
      currentValue.value = newData.value
    }
  })

  // Create a computed property for easy access to the previous value
  const previous = computed(() => previousValue.value)

  return previous
}

export { usePrevious }
