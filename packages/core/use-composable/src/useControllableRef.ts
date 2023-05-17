import type { Ref } from 'vue'
import { ref, watch, watchEffect } from 'vue'
import { useCallbackRef } from './useCallbackRef'

type UseControllableRefParams<T> = {
  prop?: T | undefined
  defaultProp?: T | undefined
  onChange?: (ref: T) => void
}

function useControllableRef<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableRefParams<T>) {
  const uncontrolledRef = useUncontrolledRef({
    defaultProp,
    onChange,
  })
  const handleChange = useCallbackRef(onChange)
  const isControlled = prop !== undefined

  const state = ref(isControlled ? prop : uncontrolledRef) as Ref<T | undefined>

  // TODO: How to add handleChange watch. handleChange add watch auto run when prop change :/ not good
  watch([state, uncontrolledRef, prop], () => {
    if (isControlled) {
      const value = typeof state.value === 'function' ? state.value() : state.value
      if (value !== prop)
        handleChange(prop)
    }
    else {
      uncontrolledRef.value = state.value
    }
  }, {
    deep: true,
  })

  return {
    state,
  }
}

function useUncontrolledRef<T>({
  defaultProp,
  onChange,
}: Omit<UseControllableRefParams<T>, 'prop'>) {
  const state = ref(defaultProp) as Ref<T | undefined>
  const prevValue = ref(defaultProp) as Ref<T | undefined>
  const handleChange = useCallbackRef(onChange)

  watchEffect(() => {
    if (prevValue.value !== state.value) {
      handleChange(state.value as T)
      prevValue.value = state.value
    }
  })

  return state
}

export { useControllableRef }
