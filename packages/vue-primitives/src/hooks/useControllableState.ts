import { isDef } from '@vueuse/core'
import { computed, nextTick, type Ref, shallowRef, type UnwrapRef, watch } from 'vue'

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

export function useControllableStateV2<T, V = Exclude<T, undefined>>(
  prop: () => T,
  onChange?: (value: V) => void,
  defaultValue?: V | undefined,
): Ref<V> {
  const getValue = (): V => {
    return (isDef(prop())
      ? prop()
      : defaultValue) as V
  }

  if (isDef(prop())) {
    return computed<V>({
      get() {
        return getValue()
      },
      set(value) {
        onChange?.(value)
      },
    })
  }

  const proxy = shallowRef<V>(getValue())
  let isUpdating = false

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

  watch(
    proxy,
    (v) => {
      if (!isUpdating && (v !== prop()))
        onChange?.(v)
    },
  )

  return proxy
}
