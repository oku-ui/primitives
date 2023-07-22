// source: https://github.com/tailwindlabs/headlessui/blob/main/packages/%40headlessui-vue/src/hooks/use-controllable.ts

import type { ComputedRef, UnwrapRef } from 'vue'
import { computed, ref } from 'vue'

function useControllable<T>(data: {
  prop: ComputedRef<T | undefined>
  onChange?: (value: T) => void
  defaultProp?: ComputedRef<T>
}) {
  const internalValue = ref(data.defaultProp?.value)
  const isControlled = computed(() => data.prop.value !== undefined)

  function updateValue(value: unknown) {
    if (isControlled.value) {
      return data.onChange?.(value as T)
    }
    else {
      internalValue.value = value as UnwrapRef<T>
      return data.onChange?.(value as T)
    }
  }

  return {
    state: computed(() =>
      isControlled.value ? data.prop.value : internalValue.value,
    ),
    updateValue,
  }
}

export { useControllable }
