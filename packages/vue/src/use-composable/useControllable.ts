import type { ComputedRef, MaybeRefOrGetter, UnwrapRef } from 'vue'
import { computed, ref, toValue, watchEffect } from 'vue'

type UseControllableStateParams<T> = {
  prop: MaybeRefOrGetter<T | undefined>
  defaultProp: MaybeRefOrGetter<T | undefined>
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
  const value = computed(() => isControlled.value
    ? toValue(prop)
    : uncontrolledProp.value === undefined && initialValue !== undefined
      ? initialValue
      : uncontrolledProp.value) as ComputedRef<T>

  function setValue(nextValue: T | SetStateFn<T>) {
    if (isControlled.value) {
      const setter = nextValue as SetStateFn<T>
      const value = computed(() => typeof nextValue === 'function' ? setter(toValue(prop)) : nextValue)

      if (value.value !== toValue(prop))
        onChange(value.value)
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
}: Pick<UseControllableStateParams<T>, 'defaultProp' | 'onChange'>) {
  const defaultPropValue = toValue(defaultProp)
  const uncontrolledState = ref<T | undefined>(defaultPropValue)
  const prevValueRef = ref(defaultPropValue)

  watchEffect(() => {
    if (prevValueRef.value !== uncontrolledState.value) {
      onChange?.(uncontrolledState.value as T)
      prevValueRef.value = uncontrolledState.value
    }
  })

  return uncontrolledState
}

export { useControllableState as useControllable }
