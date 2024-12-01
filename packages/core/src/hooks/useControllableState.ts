import { computed, nextTick, onBeforeUnmount, type Ref, shallowRef, type UnwrapRef, watch } from 'vue'

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

export function useControllableStateV4<T>(
  prop: (() => T | undefined) | T | undefined,
  onChange: ((value: T) => void) | undefined,
  defaultValue: (() => T) | T,
): Ref<T> {
  type MaybeFunction = (() => T | undefined) | T | undefined

  // Type-safe function check
  const isFunction = (value: unknown): value is (() => T | undefined) =>
    typeof value === 'function'

  // Type-safe value resolution with explicit undefined handling
  const getValue = (value: MaybeFunction): T | undefined => {
    if (isFunction(value)) {
      const result = value()
      return result
    }
    return value
  }

  // Ensure we have a valid initial value
  const initialValue = getValue(prop) ?? getValue(defaultValue)
  if (initialValue === undefined)
    throw new Error('Either prop or defaultValue must provide a value')

  const state = shallowRef<T>(initialValue)

  // Watch with cleanup
  let stopWatch: (() => void) | undefined

  if (isFunction(prop)) {
    stopWatch = watch(prop, (next) => {
      if (next !== undefined && next !== state.value) {
        state.value = next
        onChange?.(next)
      }
    }, { flush: 'sync' })
  }

  // Basic cleanup
  onBeforeUnmount(() => stopWatch?.())

  return computed({
    get: () => state.value,
    set: (value) => {
      if (value !== state.value) {
        state.value = value
        onChange?.(value)
      }
    },
  })
}
