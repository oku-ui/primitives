import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'
import { useCallbackRef } from './useCallbackRef'

type UseControllableStateParams<T> = {
  prop: ComputedRef<T | undefined>
  onChange?: (value: T) => void
  defaultProp?: ComputedRef<T | undefined>
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
  const value = computed(() => isControlled.value ? prop.value : uncontrolledProp.value === undefined && initialValue !== undefined ? initialValue : uncontrolledProp.value) as ComputedRef<T>

  const handleChange = useCallbackRef(onChange)

  function updateValue(nextValue: T | undefined) {
    if (isControlled.value) {
      const setter = nextValue as T
      const value = typeof setter === 'function' ? setter(prop.value as T) : nextValue
      if (value !== prop.value)
        handleChange.value(value as T)
    }
    else {
      uncontrolledProp.value = nextValue as any
    }
  }
  return {
    state: value,
    updateValue,
  }
}

function useUncontrolledState<T>({
  defaultProp,
  onChange,
}: Omit<UseControllableStateParams<T>, 'prop'>) {
  const uncontrolledState = ref<T | undefined>(defaultProp?.value)
  const prevValueRef = ref(defaultProp)
  const handleChange = useCallbackRef(onChange)

  watch(uncontrolledState, () => {
    if (prevValueRef.value !== uncontrolledState.value)
      handleChange.value(uncontrolledState.value as T)
  })

  return uncontrolledState
}

export { useControllable }
