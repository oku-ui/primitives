import type { ComputedRef } from 'vue'
import { computed, ref, watchEffect } from 'vue'
import { useCallbackRef } from './useCallbackRef'

type UseControllableStateParams<T> = {
  prop: ComputedRef<T | undefined>
  onChange?: (value: T) => void
  defaultProp?: ComputedRef<T>
  initialValue?: T
}

function useControllable<T>({
  prop,
  onChange,
  defaultProp,
  initialValue,
}: UseControllableStateParams<T>) {
  const uncontrolledProp = useUncontrolledState({
    defaultProp,
    onChange,
  })
  const isControlled = computed(() => prop.value !== undefined)
  const value = computed(() => isControlled.value ? prop.value : uncontrolledProp.value) as ComputedRef<T>

  const handleChange = useCallbackRef(onChange)

  function updateValue(nextValue: T | undefined) {
    if (isControlled.value) {
      const setter = nextValue as T
      const value = typeof setter === 'function' ? setter(prop.value as T) : nextValue
      if (value !== prop.value)
        handleChange(value as T)
    }
    else {
      uncontrolledProp.value = nextValue as any
    }
  }
  return {
    state: computed(() => value.value === undefined ? initialValue : value.value),
    updateValue,
  }
}

function useUncontrolledState<T>({
  defaultProp,
  onChange,
}: Omit<UseControllableStateParams<T>, 'prop'>) {
  const uncontrolledState = ref<T | undefined>(defaultProp?.value)
  const prevValueRef = computed(() => uncontrolledState.value)
  const handleChange = useCallbackRef(onChange)

  watchEffect(() => {
    if (prevValueRef.value !== uncontrolledState.value)
      handleChange(uncontrolledState.value as T)
  })

  return uncontrolledState
}

export { useControllable }
