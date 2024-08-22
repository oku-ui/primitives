import { isDef } from '@vueuse/core'
import { type Ref, type UnwrapRef, computed, nextTick, shallowRef, watch } from 'vue'

/**
 * Shorthand for v-model binding, props + emit -> ref
 *
 * @see https://vueuse.org/useVModel
 * @param props
 * @param onChange
 * @param key
 * @param defaultValue
 */
export function useControllableState<P extends object, K extends keyof P, V = Exclude<P[K], undefined>>(
  props: P,
  onChange: (value: V) => void,
  key: K,
  defaultValue?: V | undefined,
): Ref<V> {
  const getValue = (): V => (isDef(props[key])
    ? props[key]
    : defaultValue) as V

  if (isDef(props[key])) {
    return computed<V>({
      get() {
        return getValue()
      },
      set(value) {
        onChange(value)
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
          onChange(v)
      },
    )

    return proxy
  }
}
