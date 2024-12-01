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

export function useControllableStateV5<T>(
  prop: (() => T | undefined) | T | undefined,
  onChange: ((value: T) => void) | undefined,
  defaultValue: (() => T) | T,
): Ref<T> {
  // Safe type checking for functions
  const getPropValue = () => {
    if (typeof prop === 'function') {
      return (prop as () => T | undefined)()
    }
    return prop
  }

  const getDefaultValue = () => {
    if (typeof defaultValue === 'function') {
      return (defaultValue as () => T)()
    }
    return defaultValue
  }

  const valueRef = shallowRef<T>(getPropValue() ?? getDefaultValue())

  // Optimize update batching
  const batchedUpdates = new Set<T>()
  let isUpdating = false
  let rafId: number | undefined

  const scheduleUpdate = (newValue: T) => {
    batchedUpdates.add(newValue)

    if (!isUpdating) {
      isUpdating = true
      rafId = requestAnimationFrame(() => {
        const lastValue = Array.from(batchedUpdates).pop()!
        if (lastValue !== valueRef.value) {
          valueRef.value = lastValue
          onChange?.(lastValue)
        }
        batchedUpdates.clear()
        isUpdating = false
        rafId = undefined
      })
    }
  }

  // Cleanup
  onBeforeUnmount(() => {
    if (rafId !== undefined)
      cancelAnimationFrame(rafId)
  })

  // Watch external changes with proper type handling
  if (prop !== undefined) {
    watch(
      () => getPropValue(),
      (newVal) => {
        if (newVal !== undefined && newVal !== valueRef.value) {
          scheduleUpdate(newVal)
        }
      },
      { flush: 'sync' },
    )
  }

  // Return computed with optimized setter
  return computed({
    get: () => valueRef.value,
    set: scheduleUpdate,
  })
}

export function useControllableStateV6<T>(
  prop: (() => T | undefined) | T | undefined,
  onChange: ((value: T) => void) | undefined,
  defaultValue: (() => T) | T,
): Ref<T> {
  // Single WeakMap for all caching needs
  const cache = new WeakMap<object, { hash?: string, value?: T, isFunction?: boolean }>()

  // Optimized type checking
  const isCallable = <V>(value: unknown): value is () => V => {
    if (typeof value !== 'object')
      return typeof value === 'function'
    const cached = cache.get(value as object)
    if (cached?.isFunction !== undefined)
      return cached.isFunction
    const isFunc = typeof value === 'function'
    cache.set(value as object, { isFunction: isFunc })
    return isFunc
  }

  // Ultra-fast value resolution
  const getValue = <V>(value: (() => V) | V): V =>
    isCallable<V>(value) ? value() : value

  // Initialize state
  const valueRef = shallowRef(getValue(prop) ?? getValue(defaultValue))
  const updates = new Set<T>()
  let isProcessing = false

  // Simplified update processor
  const processUpdates = () => {
    const values = Array.from(updates)
    updates.clear()

    if (values.length > 0) {
      const newValue = values[values.length - 1]
      valueRef.value = newValue
      onChange?.(newValue)
    }

    isProcessing = false
  }

  // Direct update scheduler
  const scheduleUpdate = (value: T) => {
    updates.add(value)
    if (!isProcessing) {
      isProcessing = true
      queueMicrotask(processUpdates)
    }
  }

  // Watch with minimal overhead
  if (isCallable(prop)) {
    watch(prop, next => next !== undefined && scheduleUpdate(next), { flush: 'sync' },
    )
  }

  return computed({
    get: () => valueRef.value,
    set: scheduleUpdate,
  })
}
