import { computed, type Ref, shallowRef, toRaw, toValue, watch } from 'vue'

type ProgressValue = number | null

export function useProgressValueState(initialState: ProgressValue | (() => ProgressValue), max = 100) {
  const value = shallowRef<ProgressValue>(toValue(initialState))

  function setValue(newValue: ProgressValue | ((prevState: ProgressValue) => ProgressValue)) {
    if (typeof newValue === 'function')
      value.value = newValue(value.value)
    else
      value.value = newValue
  }

  const precentage = computed(() => value.value != null ? Math.round((value.value / max) * 100) : null)

  return [value, precentage, setValue] as const
}

export function useIndeterminateToggle(
  value: Ref<ProgressValue>,
  setValue: (newValue: ProgressValue | ((prevState: ProgressValue) => ProgressValue)) => void,
) {
  const previousValueRef = usePreviousValueRef(value)

  function toggleIndeterminate() {
    setValue((val) => {
      if (val == null)
        return previousValueRef.value
      return null
    })
  }

  return toggleIndeterminate
}

export function usePreviousValueRef(value: Ref<ProgressValue>) {
  const previousValueRef = shallowRef<ProgressValue>(toRaw(value.value))

  watch(value, () => {
    if (value.value != null)
      previousValueRef.value = value.value
  })

  return previousValueRef
}
