import { isDef } from '@vueuse/core'
import { type Ref, type UnwrapRef, computed, nextTick, shallowRef, watch } from 'vue'

/**
 * Shorthand for v-model binding, props + emit -> ref
 *
 * @see https://vueuse.org/useVModel
 * @param props
 * @param emit
 * @param key
 * @param defaultValue
 */
export function useControllableState<P extends object, K extends keyof P, Name extends string, V = Exclude<P[K], undefined>>(
  props: P,
  emit: (name: Name, ...args: any[]) => void,
  key: K,
  defaultValue?: V | undefined,
  eventName?: string,
): Ref<V> {
  const event: Name = (eventName || `update:${key.toString()}`) as Name

  const getValue = (): V => (isDef(props[key])
    ? props[key]
    : defaultValue) as V

  if (isDef(props[key])) {
    return computed<V>({
      get() {
        return getValue()
      },
      set(value) {
        emit(event, value)
      },
    })
  }
  else {
    const proxy = shallowRef<V>(getValue())
    let isUpdating = false

    watch(
      () => props[key!],
      (v) => {
        if (!isUpdating) {
          isUpdating = true
          ; (proxy as any).value = v as UnwrapRef<P[K]>
          nextTick(() => isUpdating = false)
        }
      },
    )

    watch(
      proxy,
      (v) => {
        if (!isUpdating && (v !== props[key!]))
          emit(event, v)
      },
    )

    return proxy
  }
}
