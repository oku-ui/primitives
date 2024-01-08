import { computed, ref, watchEffect } from 'vue'
import type { ComputedRef, UnwrapRef, WritableComputedRef } from 'vue'

type useControllableParamsState<T> = {
  prop?: ComputedRef<T | undefined>
  defaultProp?: ComputedRef<T | undefined>
  onChange?: (state: T) => void
}

type SetStateFn<T> = (prevState?: T) => T

function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => { },
}: useControllableParamsState<T>) {
  const uncontrolledProp = useUncontrolledState({ defaultProp, onChange })
  const isControlled = computed(() => prop?.value !== undefined)
  const value = computed({
    get: () => isControlled.value ? prop?.value : uncontrolledProp.value,
    set: (newValue) => {
      return newValue
    },
  }) as WritableComputedRef<T>

  const handleChange = (_value: T) => onChange(_value)

  const setValue = (nextValue: T | SetStateFn<T>) => {
    if (isControlled.value) {
      const setter = nextValue as SetStateFn<T>
      const value = computed(() => typeof nextValue === 'function' ? setter(prop?.value) : nextValue)
      if (value.value !== prop?.value)
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
}: Omit<useControllableParamsState<T>, 'prop'>) {
  const uncontrolledState = ref<T | undefined>(defaultProp?.value)
  const value = uncontrolledState
  const prevValueRef = ref(value)
  const handleChange = (_value: T) => onChange?.(_value)

  watchEffect(() => {
    if (prevValueRef.value !== value.value) {
      handleChange(value as T)
      prevValueRef.value = value.value
    }
  })

  return uncontrolledState
}

export { useControllableState as useControllable }
