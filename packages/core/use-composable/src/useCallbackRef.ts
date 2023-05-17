import type { Ref, UnwrapRef } from 'vue'
import { computed, ref, watchEffect } from 'vue'

/**
 * A custom function that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */
function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined): T {
  const callbackRef: Ref<UnwrapRef<T> | undefined | T> = ref(callback)

  watchEffect(() => {
    callbackRef.value = callback
  })

  return computed(() => ((...args: any[]) => callbackRef.value?.(...args)) as T).value
}

export { useCallbackRef }
