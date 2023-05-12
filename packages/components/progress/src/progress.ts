import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import type { ComponentPublicInstance, ComputedRef, PropType } from 'vue'
import { computed, defineComponent, h, ref, toRefs } from 'vue'

// ---------- Progress

// ---type---

type ProgressContextValue = { value: ComputedRef<number | null> | null; max: ComputedRef<number> }
type ProgressElement = ElementType<'div'>
type ProgressState = 'indeterminate' | 'complete' | 'loading'

interface ProgressProps {
  value?: number | null
  max?: number
  getValueLabel?(value: number, max: number): string
  scopeProgress?: Scope
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
      type: [Number, null] as PropType<number | null | undefined>,
    },
    max: {
      type: Number,
      default: DEFAULT_MAX,
    },
    getValueLabel: {
      type: Function as PropType<(value: number, max: number) => string>,
      default: defaultGetValueLabel,
    },
    scopeProgress: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { value, max, getValueLabel, scopeProgress } = toRefs(props)
    const {
      ...progressProps
    } = attrs as ProgressElement

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
        'data-state': getProgressState(maxProp.value, valueProp.value),
        'data-value': valueProp.value ?? undefined,
        'data-max': maxProp.value,
        ...progressProps,
        'ref': innerRef,
      },
      slots.default)

    expose({
      inferRef: computed(() => innerRef.value?.$el),
    })

    progressProvider({
      scope: scopeProgress.value,
      value: valueProp,
      max: maxProp,
    })

    return originalReturn as unknown as {
      innerRef: ProgressElement
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

function getProgressState(maxValue: number, value?: number | null): ProgressState {
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
type ProgressIndicatorElement = ElementType<'div'>
interface ProgressIndicatorProps extends PrimitiveProps {
  scopeProgress?: Scope
}

const ProgressIndicator = defineComponent({
  name: INDICATOR_NAME,
  inheritAttrs: true,
  props: {
    scopeProgress: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { scopeProgress } = props
    const {
      ...indicatorProps
    } = attrs as ProgressIndicatorProps

    const innerRef = ref<ComponentPublicInstance>()
    const context = useProgressContext(INDICATOR_NAME, scopeProgress)

    expose({
      inferRef: computed(() => innerRef.value?.$el),
    })

    const originalReturn = () => h(
      Primitive.div,
      {
        'data-state': getProgressState(context.value.max.value, context.value.value?.value),
        'data-value': context.value.value?.value ?? undefined,
        'data-max': context.value.max.value,
        ...indicatorProps,
        'ref': innerRef,
      },
      slots.default && slots.default())

    return originalReturn as unknown as {
      innerRef: ProgressIndicatorElement
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _OkuProgressProps = MergeProps<ProgressProps, ProgressIndicatorProps>
type _OkuProgressIndicatorProps = MergeProps<ProgressIndicatorProps, PrimitiveProps>

type ProgressRef = RefElement<typeof Progress>
type ProgressIndicatorRef = RefElement<typeof ProgressIndicator>

const OkuProgress = Progress as typeof Progress & (new () => { $props: _OkuProgressProps })
const OkuProgressIndicator = ProgressIndicator as typeof ProgressIndicator & (new () => { $props: _OkuProgressIndicatorProps })

export {
  createProgressScope,
  OkuProgress,
  OkuProgressIndicator,
}

export type {
  ProgressProps,
  ProgressIndicatorProps,
  ProgressElement,
  ProgressIndicatorElement,
  ProgressRef,
  ProgressIndicatorRef,
}
