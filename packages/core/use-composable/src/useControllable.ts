// source: https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-vue/src/hooks/use-controllable.ts

import type { ComputedRef } from 'vue'
import { computed, ref } from 'vue'
import { useCallbackRef } from './useCallbackRef'

type UseControllableParams<T> = {
  prop: ComputedRef<T | undefined>
  defaultProp?: ComputedRef<T>
  onChange?: (result: T) => void
}

function useControllable<T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableParams<T>) {
  const initValue = ref(defaultProp?.value)

  const isControlled = computed(() => prop.value !== undefined)

  const handleChange = useCallbackRef(onChange)

  const updateValue = (value: unknown) => {
    if (isControlled.value) {
      return handleChange?.(value as T)
    }
    else {
      initValue.value = value as any
      return handleChange?.(value as T)
    }
  }

  return {
    state: computed(() => isControlled.value ? prop.value : initValue.value),
    updateValue,
  }
}

export { useControllable }
