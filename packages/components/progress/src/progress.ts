import type { ElementType } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import type { ScopeProgress } from './utils'
import {
  defaultGetValueLabel,
  getInvalidMaxError,
  getInvalidValueError,
  getProgressState,
  isNumber,
  isValidMaxNumber,
  isValidValueNumber,
  scopeProgressProps,
} from './utils'
import { DEFAULT_MAX, PROGRESS_NAME } from './constants'

type ProgressInjectValue = {
  value: Ref<number | null> | null
  max: Ref<number>
}

export type ProgressIntrinsicElement = ElementType<'div'>
export type ProgressElement = HTMLDivElement

interface ProgressProps {
  value?: number | null
  max?: number
  getValueLabel?(value: number, max: number): string
  scopeProgress?: Scope
}

export const [createProgressContext, createProgressScope]
  = createProvideScope(PROGRESS_NAME)

export const [progressProvider, useProgressInject]
  = createProgressContext<ProgressInjectValue>(PROGRESS_NAME)

const progressProps = {
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
}

const progress = defineComponent({
  name: PROGRESS_NAME,
  inheritAttrs: false,
  props: {
    ...progressProps,
    ...scopeProgressProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { value, max, getValueLabel, scopeOkuProgress } = toRefs(props)
    const { ...progressProps } = attrs as ProgressIntrinsicElement

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
      scope: scopeOkuProgress.value,
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
export const OkuProgress = progress as typeof progress &
(new () => {
  $props: ScopeProgress<Partial<ProgressElement>>
})

export type { ProgressProps }
