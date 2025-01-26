import type { Ref, UnwrapRef } from 'vue'
import { computed, nextTick, shallowRef, watch } from 'vue'

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
  if (props[key] !== undefined) {
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
  prop: (() => P) | undefined,
  onChange: ((value: U) => void) | undefined,
  defaultValue: V | undefined,
): Ref<V> {
  const _isDef = prop?.() !== undefined

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

export function useControllableStateV3<P, U = P, V = P>(
  prop: (() => P) | undefined,
  onChange: ((value: U) => void) | undefined,
  defaultValue: () => V,
): Ref<V> {
  const _isDef = prop?.() !== undefined

  if (_isDef) {
    return computed<V>({
      get() {
        return (prop?.() ?? defaultValue()) as V
      },
      set(value) {
        onChange?.(value as unknown as U)
      },
    })
  }

  const proxy = shallowRef<V>(defaultValue() as V)
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
