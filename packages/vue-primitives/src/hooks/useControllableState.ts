import { computed, nextTick, type Ref, shallowRef, type UnwrapRef, watch } from 'vue'
import { isDef } from '../shared/index.ts'

// type NonUndefined<T> = T extends undefined ? never : T

/**
 * Shorthand for v-model binding, props + emit -> ref
 *
 * @see https://vueuse.org/useVModel
 * @param props
 * @param key
 * @param onChange
 * @param defaultValue
 */
export function useControllableState<P extends object, K extends keyof P, V = P[K]>(
  props: P,
  key: K,
  onChange: (value: V) => void,
  defaultValue?: V,
): Ref<V> {
  if (isDef(props[key])) {
    return computed<V>({
      get() {
        return (props[key] ?? defaultValue) as V
      },
      set(value) {
        onChange(value)
      },
    })
  }

  const proxy = shallowRef<V>(defaultValue as V)
  let isUpdating = false

  watch(
    () => props[key!],
    (v) => {
      if (!isUpdating) {
        isUpdating = true
        proxy.value = v as UnwrapRef<P[K]>
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

export function useControllableStateV2<P, U = P, V = P>(
  prop?: () => P,
  onChange?: (value: U) => void,
  defaultValue?: V | undefined,
): Ref<V> {
  const _isDef = isDef(prop?.())

  if (_isDef) {
    return computed<V>({
      get() {
        return (prop?.() ?? defaultValue) as V
      },
      set(value) {
        onChange?.(value as unknown as U)
      },
    })
  }

  const proxy = shallowRef<V>(defaultValue as V)
  let isUpdating = false

  if (prop) {
    watch(
      prop,
      (v) => {
        if (!isUpdating) {
          isUpdating = true
          ; (proxy as any).value = v
          nextTick(() => isUpdating = false)
        }
      },
    )
  }

  watch(
    proxy,
    (v) => {
      if (!isUpdating && (v !== prop?.()))
        onChange?.(v)
    },
  )

  return proxy
}
