import type { ComputedRef, UnwrapRef } from 'vue'
import { computed, ref, toValue, watchEffect } from 'vue'

type UseControllableStateParams<T> = {
  prop: ComputedRef<T | undefined>
  defaultProp: ComputedRef<T | undefined>
  onChange?: (state: T) => void
  initialValue?: T
}

type SetStateFn<T> = (prevState?: T) => T

function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => { },
  initialValue,
}: UseControllableStateParams<T>) {
  const uncontrolledProp = useUncontrolledState({ defaultProp, onChange })
  const isControlled = computed(() => toValue(prop) !== undefined)
  const value = computed(() => isControlled.value ? toValue(prop) : uncontrolledProp.value === undefined && initialValue !== undefined ? initialValue : uncontrolledProp.value) as ComputedRef<T>

  const handleChange = (_value: T) => onChange(_value)

  const setValue = (nextValue: T | SetStateFn<T>) => {
    if (isControlled.value) {
      const setter = nextValue as SetStateFn<T>
      const value = computed(() => typeof nextValue === 'function' ? setter(toValue(prop)) : nextValue)
      if (value.value !== toValue(prop))
        handleChange(value.value)
    }
    else {
      uncontrolledProp.value = nextValue as UnwrapRef<T>
    }
  }
  return [value, setValue] as const
}

function useUncontrolledState<T>({
  defaultProp,
  onChange,
}: Omit<UseControllableStateParams<T>, 'prop'>) {
  const uncontrolledState = ref<T | undefined>(toValue(defaultProp))
  const prevValueRef = ref(defaultProp)
  const handleChange = (_value: T) => onChange?.(_value)

  watchEffect(() => {
    if (prevValueRef.value !== uncontrolledState.value)
      handleChange(uncontrolledState.value as T)
  })

  return uncontrolledState
}

export { useControllableState as useControllable }
