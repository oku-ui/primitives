import type { ElementType, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { Primitive, PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { ComputedRef, PropType } from 'vue'
import { computed, defineComponent, h, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import {
  defaultGetValueLabel,
  getInvalidMaxError,
  getInvalidValueError,
  getProgressState,
  isNumber,
  isValidMaxNumber,
  isValidValueNumber,
} from './utils'
import { DEFAULT_MAX, PROGRESS_NAME } from './constants'
import type { ProgressIndicatorProps } from '.'

// ---------- Progress ---------- //

type ProgressContextValue = {
  value: ComputedRef<number | null> | null
  max: ComputedRef<number>
}

type ProgressElement = ElementType<'div'>
export type _ProgressEl = HTMLDivElement

interface ProgressProps {
  value?: number | null
  max?: number
  getValueLabel?(value: number, max: number): string
  scopeProgress?: Scope
}

const [createProgressContext, createProgressScope]
  = createProvideScope(PROGRESS_NAME)

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
      ...ScopePropObject,
    },
    ...PrimitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { value, max, getValueLabel, scopeProgress } = toRefs(props)
    const { ...progressProps } = attrs as ProgressElement

    const forwardedRef = useForwardRef()

    // propstype check
    if (max.value && !isValidMaxNumber(max.value))
      console.error(getInvalidMaxError(max.value))

    if (value.value != null && !isValidValueNumber(value.value, max.value))
      console.error(getInvalidValueError(value.value))

    const maxProp = computed(() =>
      isValidMaxNumber(max.value) ? max.value : DEFAULT_MAX,
    )
    const valueProp = computed(() =>
      isValidValueNumber(value.value, maxProp.value) ? value.value : null,
    )
    const valueLabel = computed(() =>
      isNumber(valueProp.value)
        ? getValueLabel.value(valueProp.value, maxProp.value)
        : undefined,
    )

    progressProvider({
      scope: scopeProgress.value,
      value: valueProp,
      max: maxProp,
    })

    const originalReturn = () =>
      h(
        Primitive.div,
        {
          'aria-valuemax': maxProp.value,
          'aria-valuemin': 0,
          'aria-valuenow': isNumber(valueProp.value)
            ? valueProp.value
            : undefined,
          'aria-valuetext': valueLabel.value,
          'role': 'progressbar',
          'data-state': computed(() =>
            getProgressState(maxProp.value, valueProp.value),
          ).value,
          'data-value': valueProp.value ?? undefined,
          'data-max': maxProp.value,
          ...progressProps,
          'ref': forwardedRef,
          'asChild': props.asChild,
        },
        {
          default: () => slots.default?.(),
        },
      )

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _OkuProgressProps = MergeProps<ProgressProps, ProgressIndicatorProps>

type InstanceProgressType = InstanceTypeRef<typeof Progress, _ProgressEl>

const OkuProgress = Progress as typeof Progress &
(new () => { $props: _OkuProgressProps })

export { createProgressScope, OkuProgress, useProgressContext }

export type { ProgressProps, ProgressElement, InstanceProgressType }
