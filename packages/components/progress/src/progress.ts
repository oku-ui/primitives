import type { ComponentPropsWithoutRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import type { ComponentPublicInstance, ComputedRef, PropType } from 'vue'
import { computed, defineComponent, h, ref, toRefs } from 'vue'

// ---------- Progress

// ---type---

type PrimitiveDivProps = ComponentPropsWithoutRef<typeof Primitive.div>
type ScopedProps<P> = P & { __scopeProgress?: Scope }
type ProgressContextValue = { value: ComputedRef<number> | null; max: ComputedRef<number> }
type PrimitiveDivElement = ComponentPropsWithoutRef<typeof Primitive.div>
type ProgressState = 'indeterminate' | 'complete' | 'loading'

// ---interface---

interface ProgressProps extends PrimitiveDivProps {
  value?: number | null | undefined
  max?: number
  getValueLabel?(value: number, max: number): string
}

// ---constants---
const PROGRESS_NAME = 'Progress'
const DEFAULT_MAX = 100

const [createProgressContext, createProgressScope] = createProvideScope(PROGRESS_NAME)

const [progressProvider, useProgressContext]
  = createProgressContext<ProgressContextValue>(PROGRESS_NAME)

// ---component---

const Progress = defineComponent({
  name: PROGRESS_NAME,
  inheritAttrs: false,
  props: {
    value: {
      type: [Number, null, undefined],
    },
    max: {
      type: Number,
      default: DEFAULT_MAX,
    },
    getValueLabel: {
      type: Function as PropType<(value: number, max: number) => string>,
      default: defaultGetValueLabel,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { value, max, getValueLabel } = toRefs(props)
    const {
      __scopeProgress,
      ...progressProps
    } = attrs as ScopedProps<PrimitiveDivProps>

    // propstype check
    if (max.value && !isValidMaxNumber(max.value))
      console.error(getInvalidMaxError(max.value))

    if (value.value != null && !isValidValueNumber(value.value, max.value))
      console.error(getInvalidValueError(value.value))

    const innerRef = ref<ComponentPublicInstance>()
    const maxProp = computed(() => isValidMaxNumber(max.value) ? max.value : DEFAULT_MAX)
    const valueProp = computed(() => isValidValueNumber(value.value, maxProp.value) ? value.value : null)
    const valueLabel = computed(() => isNumber(valueProp.value) ? getValueLabel.value(valueProp.value, maxProp.value) : undefined)

    const originalReturn = () => h(
      Primitive.div,
      {
        'aria-valuemax': maxProp.value,
        'aria-valuemin': 0,
        'aria-valuenow': isNumber(valueProp.value) ? valueProp.value : undefined,
        'aria-valuetext': valueLabel.value,
        'role': 'progressbar',
        'data-state': getProgressState(valueProp.value, maxProp.value),
        'data-value': valueProp.value ?? undefined,
        'data-max': maxProp.value,
        ...progressProps,
        'ref': innerRef,
      },
      slots.default && slots.default())

    expose({
      inferRef: computed(() => innerRef.value?.$el),
    })

    progressProvider({
      scope: __scopeProgress,
      value: valueProp,
      max: maxProp,
    })

    return originalReturn as unknown as {
      innerRef: PrimitiveDivElement
    }
  },
})

// ---function---

function defaultGetValueLabel(value: number, max: number) {
  return `${Math.round((value / max) * 100)}%`
}

function isNumber(value: any): value is number {
  return typeof value === 'number'
}

function isValidMaxNumber(max: any): max is number {
  return (
    isNumber(max)
    && !isNaN(max)
    && max > 0
  )
}

function isValidValueNumber(value: any, max: number): value is number {
  return (
    isNumber(value)
    && !isNaN(value)
    && value <= max
    && value >= 0
  )
}

function getProgressState(value: number | undefined | null, maxValue: number): ProgressState {
  return value == null ? 'indeterminate' : value === maxValue ? 'complete' : 'loading'
}

function getInvalidMaxError(propValue: string) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${PROGRESS_NAME}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`
}

function getInvalidValueError(propValue: string) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${PROGRESS_NAME}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` if the progress is indeterminate.

Defaulting to \`null\`.`
}

// ---------- ProgressIndicator

// ---constants---

const INDICATOR_NAME = 'ProgressIndicator'

// ---component---

interface ProgressIndicatorProps extends PrimitiveDivProps {}

const ProgressIndicator = defineComponent({
  name: INDICATOR_NAME,
  inheritAttrs: true,
  setup(props, { attrs, slots, expose }) {
    const {
      __scopeProgress,
      ...indicatorProps
    } = attrs as ScopedProps<ProgressIndicatorProps>

    const innerRef = ref<ComponentPublicInstance>()
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress)

    expose({
      inferRef: computed(() => innerRef.value?.$el),
    })

    const originalReturn = () => h(
      Primitive.div,
      {
        'data-state': getProgressState(context.value.value.value, context.value.max.value),
        'data-value': context.value.value.value ?? undefined,
        'data-max': context.value.max.value,
        ...indicatorProps,
        'ref': innerRef,
      },
      slots.default && slots.default())

    return originalReturn as unknown as {
      innerRef: PrimitiveDivElement
    }
  },
})

// ---export---

const OkuProgress = Progress as typeof Progress & (new () => { $props: ScopedProps<ProgressProps> })
const OkuProgressIndicator = ProgressIndicator as typeof ProgressIndicator & (new () => { $props: ScopedProps<ProgressIndicatorProps> })

type OkuProgressElement = Omit<InstanceType<typeof Progress>, keyof ComponentPublicInstance>
type OkuProgressIndicatorElement = Omit<InstanceType<typeof ProgressIndicator>, keyof ComponentPublicInstance>

export {
  createProgressScope,
  OkuProgress,
  OkuProgressIndicator,
}

export type {
  ProgressProps,
  ProgressIndicatorProps,
  OkuProgressElement,
  OkuProgressIndicatorElement,
}
