import { getCurrentInstance, ref, watch } from 'vue'

function usePrevious<T>(value: T) {
  // We compare values before making an update to ensure that
  // a change has been made. This ensures the previous value is
  // persisted correctly between renders.

  const _ref = ref({ value, previous: value })
  const instance = getCurrentInstance()
  if (!instance)
    throw new Error('usePrevious must be called within a setup function.')

  watch(() => value, () => {
    if (_ref.value.value !== value) {
      _ref.value.previous = _ref.value.value
      _ref.value.value = value as any
    }
  })
  return _ref.value.previous
}

export { usePrevious }
