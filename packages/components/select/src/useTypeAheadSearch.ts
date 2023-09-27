import { useCallbackRef } from '@oku-ui/use-composable'
import { ref, watchEffect } from 'vue'

function useTypeaheadSearch(onSearchChange: (search: string) => void) {
  const handleSearchChange = useCallbackRef(onSearchChange)

  const searchRef = ref('')
  const timerRef = ref(0)

  const handleTypeaheadSearch = useCallbackRef((key: string) => {
    const search = searchRef.value + key
    handleSearchChange.value?.(search);

    (function updateSearch(value: string) {
      searchRef.value = value
      window.clearTimeout(timerRef.value)
      // Reset `searchRef` 1 second after it was last updated
      if (value !== '')
        timerRef.value = window.setTimeout(() => updateSearch(''), 1000)
    })(search)
  })

  const resetTypeahead = useCallbackRef(() => {
    searchRef.value = ''
    window.clearTimeout(timerRef.value)
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => window.clearTimeout(timerRef.value))
  })

  return [searchRef, handleTypeaheadSearch, resetTypeahead] as const
}

export { useTypeaheadSearch }
