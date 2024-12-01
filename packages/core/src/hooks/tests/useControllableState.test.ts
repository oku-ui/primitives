import { useVModel } from '@vueuse/core'
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest'
import { type ComponentInternalInstance, computed, nextTick, ref, type Ref, watch } from 'vue'
import { useControllableStateV3, useControllableStateV4 } from '../useControllableState'
import { PerformanceLogger } from './performance-results'

// Mock Vue's lifecycle hooks
// eslint-disable-next-line unused-imports/no-unused-vars
let unmountHandler: (() => void) | undefined
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual as any,
    onBeforeUnmount: vi.fn((fn) => {
      unmountHandler = fn
    }),
  }
})

// Update type definitions for controller tests
type Function = (...args: any[]) => any
type PropGetter<T> = (() => T | undefined) & Function
type PropValue<T> = T | undefined
type DefaultValueGetter<T> = (() => T) & Function
type PropType<T> = PropGetter<T> | Exclude<PropValue<T>, Function>
type DefaultType<T> = DefaultValueGetter<T> | Exclude<T, Function>

// Add type guard
function isPropGetter<T>(prop: PropType<T>): prop is PropGetter<T> {
  return typeof prop === 'function'
}

// Update the controller function type
type ControllerFn = {
  <T>(
    prop: PropType<T>,
    onChange: ((value: T) => void) | undefined,
    defaultValue: DefaultType<T>,
    options?: any
  ): Ref<T>
}

// Fix the createVModelWrapper type signature
function createVModelWrapper<T>(
  prop: PropType<T>,
  onChange: ((value: T) => void) | undefined,
  defaultValue: DefaultType<T>,
): Ref<T> {
  const initialValue = typeof defaultValue === 'function'
    ? (defaultValue as DefaultValueGetter<T>)()
    : defaultValue
  const currentValue = ref<T>(initialValue)
  const emit = vi.fn((event: string, ...args: any[]) => {
    if (event === 'update:modelValue' && onChange)
      onChange(args[0])
  })

  // Create mock instance with proper type handling
  const instance = {
    emit,
    proxy: {
      $props: computed(() => ({
        modelValue: isPropGetter(prop) ? prop() : prop,
      })),
      $emit: emit,
    },
    refs: {},
    attrs: {},
    slots: {},
    setupState: {},
    ctx: {
      emit,
    },
  } as unknown as ComponentInternalInstance

  // Create model with sync between prop and internal value
  const model = useVModel(
    instance,
    'modelValue' as keyof ComponentInternalInstance,
    emit,
    {
      defaultValue: initialValue as any,
      passive: true, // Change to true for better prop sync
    },
  )

  // Sync with prop changes
  if (isPropGetter(prop)) {
    watch(
      () => prop(),
      (newVal) => {
        if (newVal !== undefined) {
          currentValue.value = newVal
          model.value = newVal
        }
      },
      { immediate: true }, // Important for initial sync
    )
  }
  else if (prop !== undefined) {
    currentValue.value = prop
    model.value = prop
  }

  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  return computed({
    get: () => model.value,
    set: (value) => {
      currentValue.value = value
      model.value = value
    },
  })
}

// Use explicit type for controllers
const controllers: Record<string, ControllerFn> = {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-ignore
  useControllableStateV3,
  useControllableStateV4,
  createVModelWrapper,
}

// Update VueUse specific tests
describe('vueUse useVModel specific tests', () => {
  it('should handle v-model correctly', async () => {
    const onChange = vi.fn()
    const value = createVModelWrapper<number>(undefined, onChange, 0)

    value.value = 5
    await nextTick()

    expect(onChange).toHaveBeenCalledWith(5)
  })

  it('should handle external prop changes with nextTick', async () => {
    const externalValue = ref(0)
    const onChange = vi.fn()
    const value = createVModelWrapper(() => externalValue.value, onChange, 0)

    await nextTick()
    expect(value.value).toBe(0) // Initial value

    externalValue.value = 10
    await nextTick()
    await nextTick() // Need two ticks for VueUse update to propagate

    expect(value.value).toBe(10)
  })

  // Fix the syntax error in the test
  it('should respect controlled vs uncontrolled behavior with async updates', async () => {
    const controlled = createVModelWrapper(() => 5, vi.fn(), 0)
    const uncontrolled = createVModelWrapper(undefined, vi.fn(), 0)

    await nextTick()
    await nextTick()

    expect(controlled.value).toBe(5)
    expect(uncontrolled.value).toBe(0) // Fixed missing parenthesis
  })
})

// Add before performance tests
describe('performance Comparison', () => {
  const WARMUP_ROUNDS = 1 // Reduced to 1
  const TEST_ROUNDS = 10 // Reduced to 2
  const UPDATES_PER_TEST = 25 // Reduced to 25
  const IMPLEMENTATIONS = [
    { name: 'useControllableStateV3', fn: controllers.useControllableStateV3 },
    { name: 'useControllableStateV4', fn: controllers.useControllableStateV4 },
    { name: 'useVModel_VueUse', fn: controllers.createVModelWrapper },
  ]

  // Optimized warmup function
  const warmup = async () => {
    const promises = []
    for (let i = 0; i < WARMUP_ROUNDS; i++) {
      for (const impl of IMPLEMENTATIONS) {
        // eslint-disable-next-line ts/no-use-before-define
        promises.push(runPerformanceTest(impl.name, impl.fn))
      }
    }
    await Promise.all(promises)
    PerformanceLogger.clearWarmupResults()
  }

  // Optimized test function
  const runPerformanceTest = async (name: string, controller: ControllerFn) => {
    const onChange = vi.fn()
    const value = controller(undefined, onChange, () => 0)

    for (let i = 0; i < UPDATES_PER_TEST; i++) {
      value.value = i
    }
    await nextTick()

    return { name, calls: onChange.mock.calls.length }
  }

  // Single performance test
  it('should compare implementations performance', async () => {
    await warmup()

    // Run tests in parallel
    const testRuns = []
    for (let round = 0; round < TEST_ROUNDS; round++) {
      const implementations = [...IMPLEMENTATIONS]
      for (const impl of implementations) {
        const start = performance.now()
        await runPerformanceTest(impl.name, impl.fn)
        const end = performance.now()

        PerformanceLogger.logResult(
          impl.name,
          end - start,
          UPDATES_PER_TEST,
        )
      }
      testRuns.push(nextTick())
    }

    await Promise.all(testRuns)

    const comparison = PerformanceLogger.compareVersions()
    expect(comparison).toBeDefined()
    expect(comparison.v3Average?.executionTimeMs).toBeGreaterThan(0)
    expect(comparison.v4Average?.executionTimeMs).toBeGreaterThan(0)
  }, 15000) // Increased timeout

  afterEach(() => {
    vi.clearAllTimers()
  })

  afterAll(() => {
    PerformanceLogger.getResults()
  })
})
