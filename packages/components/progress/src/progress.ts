import type { ElementType, MergeProps, RefElement } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import type { ComputedRef, PropType } from 'vue'
import { computed, defineComponent, h, toRefs } from 'vue'
import { useRef } from '@oku-ui/use-composable'
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
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { value, max, getValueLabel, scopeProgress } = toRefs(props)
    const { ...progressProps } = attrs as ProgressElement

    // propstype check
    if (max.value && !isValidMaxNumber(max.value))
      console.error(getInvalidMaxError(max.value))

    if (value.value != null && !isValidValueNumber(value.value, max.value))
      console.error(getInvalidValueError(value.value))

    const { $el, newRef } = useRef<HTMLDivElement>()

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
          'ref': newRef,
        },
        {
          default: () => slots.default?.(),
        },
      )

    expose({
      inferRef: $el,
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

// TODO: https://github.com/vuejs/core/pull/7444 after delete
type _OkuProgressProps = MergeProps<ProgressProps, ProgressIndicatorProps>

type ProgressRef = RefElement<typeof Progress>

const OkuProgress = Progress as typeof Progress &
(new () => { $props: _OkuProgressProps })

export { createProgressScope, OkuProgress, useProgressContext }

export type { ProgressProps, ProgressElement, ProgressRef }
