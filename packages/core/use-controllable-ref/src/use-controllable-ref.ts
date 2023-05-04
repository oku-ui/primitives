import type { Ref } from 'vue'
import { computed, onMounted, ref, watch } from 'vue'
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
  const isControlled = computed(() => prop !== undefined)
  const value = computed(() => isControlled.value ? prop : uncontrolledProp.value)
  const handleChange = computed(() => onChange)

  const setValue = (nextValue: T | undefined) => {
    if (isControlled.value) {
      const setter = nextValue as SetRefFn<T>
      const value = typeof nextValue === 'function' ? setter(prop) : nextValue
      if (value !== prop)
        handleChange.value(value as T)
    }
    else {
      uncontrolledProp.value = nextValue
    }
  }

  return [value, setValue] as const
}

function useUncontrolledRef<T>({
  defaultProp,
  onChange,
}: Omit<UseControllableRefParams<T>, 'prop'>) {
  const uncontrolledRef = ref(defaultProp) as Ref<T | undefined>
  const prevValueRef = ref(defaultProp) as Ref<T | undefined>
  const handleChange = useCallbackRef(onChange)

  onMounted(() => {
    watch([uncontrolledRef, prevValueRef, handleChange], () => {
      if (prevValueRef.value !== uncontrolledRef.value) {
        handleChange(uncontrolledRef.value as T)
        prevValueRef.value = uncontrolledRef.value
      }
    })
  })

  return uncontrolledRef
}

export { useControllableRef }
