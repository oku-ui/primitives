import type { ComponentPropsWithoutRef } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import type { PropType } from 'vue'
import { computed, defineComponent, h, ref, toRefs } from 'vue'

// ---type---

type PrimitiveProgressProps = ComponentPropsWithoutRef<typeof Primitive.div>
type ScopedProps<P> = P & { __scopeProgress?: Scope }
type ProgressContextValue = { value: number | null; max: number }
type ProgressElement = ComponentPropsWithoutRef<typeof Primitive.div>
type ProgressState = 'indeterminate' | 'complete' | 'loading'

// ---interface---

interface ProgressProps extends PrimitiveProgressProps {
  value?: number | null | undefined
  max?: number
  getValueLabel?(value: number, max: number): string
}

// ---enum---

const NAME = 'Progress'
const DEFAULT_MAX = 100

// ---constants---

const [createProgressContext, createProgressScope] = createProvideScope(NAME)

const [progressProvider, useProgressContext]
  = createProgressContext<ProgressContextValue>(NAME)

// ---component---

const progress = defineComponent({
  name: NAME,
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
  setup(props, { attrs, slots, expose, emit }) {
    const { value, max, getValueLabel } = toRefs(props)
    const {
      __scopeProgress,
      ...progressProps
    } = attrs as ScopedProps<PrimitiveProgressProps>

    // propstype check
    if (max.value && !isValidMaxNumber(max.value))
      console.error(getInvalidMaxError(max.value))

    if (value.value != null && !isValidValueNumber(value.value, max.value))
      console.error(getInvalidValueError(value.value))

    const innerRef = ref()
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
      value: valueProp.value,
      max: maxProp.value,
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

function getProgressState(value: number | undefined | null, maxValue: number): ProgressState {
  return value == null ? 'indeterminate' : value === maxValue ? 'complete' : 'loading'
}

function getInvalidMaxError(propValue: string) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${NAME}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`
}

function getInvalidValueError(propValue: string) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${NAME}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` if the progress is indeterminate.

Defaulting to \`null\`.`
}

// ---export---

const OkuProgress = progress

export { OkuProgress }

export type { ProgressProps, ProgressElement }
