/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { Ref } from 'vue'
import { computed, ref, watch, watchEffect } from 'vue'
import { useCallbackRef } from '@oku-ui/use-callback-ref'

type UseControllableRefParams<T> = {
  prop?: T | undefined
  defaultProp?: T | undefined
  onChange?: (ref: T) => void
}

type SetRefFn<T> = (prevRef?: T) => T

function useControllableRef<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableRefParams<T>) {
  const uncontrolledProp = useUncontrolledRef({ defaultProp, onChange })
  const isControlled = prop !== undefined
  const state = computed(() => (isControlled ? prop : uncontrolledProp.value))
  const handleChange = computed(() => onChange)

  const setValue = (callback: (nextValue: T | undefined) => void | T): any => {
    const refCallback = ref(callback)
    const computedCallback = computed(() => refCallback.value)

    watchEffect(() => {
      refCallback.value = callback
    })

    if (isControlled) {
      const setter = computedCallback.value as SetRefFn<T>
      const value = typeof computedCallback.value === 'function' ? setter(prop) : computedCallback.value
      if (value !== prop)
        handleChange.value(value as T)
    }
    else {
      const setter = callback as SetRefFn<T>
      uncontrolledProp.value = typeof callback === 'function' ? setter(uncontrolledProp.value) : callback
    }
  }

  return [state, setValue] as const
}

function useUncontrolledRef<T>({
  defaultProp,
  onChange,
}: Omit<UseControllableRefParams<T>, 'prop'>) {
  const uncontrolledRef = ref(defaultProp) as Ref<T | undefined>
  const prevValueRef = ref(defaultProp) as Ref<T | undefined>
  const handleChange = useCallbackRef(onChange)

  watch([uncontrolledRef, prevValueRef, handleChange], () => {
    if (prevValueRef.value !== uncontrolledRef.value) {
      handleChange(uncontrolledRef.value as T)
      prevValueRef.value = uncontrolledRef.value
    }
  })

  return uncontrolledRef
}

export { useControllableRef }

// type Callback<T extends any[]> = (...args: T) => void

// function useCallback<T extends any[]>(callback: Callback<T>, deps: any[]): (...args: T) => void {
// const refCallback = ref(callback)
// const computedCallback = computed(() => refCallback.value)

// const memoizedCallback = (...args: T) => computedCallback.value(...args)

// watchEffect(() => {
//   refCallback.value = callback
// })

//   if (deps.length > 0) {
//     watch(deps, () => {
//       refCallback.value = callback
//     })
//   }

//   return memoizedCallback
// }
