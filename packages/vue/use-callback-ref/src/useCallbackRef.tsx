import { computed, ref, watchEffect } from 'vue'
import type { Ref } from 'vue'

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */
function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined): T {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const callbackRef: Ref<T | undefined> = ref(callback)

  watchEffect(() => {
    callbackRef.value = callback
  })

  return computed(() => ((...args: any[]) => callbackRef.value?.(...args)) as T).value
}

export { useCallbackRef }
