import type { OkuElement } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
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
  value: Ref<number | null | undefined>
  max: Ref<number>
}

export type ProgressNaviteElement = OkuElement<'div'>
export type ProgressElement = HTMLDivElement

export interface ProgressProps {
  value?: number | null | undefined
  max?: number
  getValueLabel?(value: number, max: number): string
  scopeProgress?: Scope
}

export const progressProps = {
  props: {
    modelValue: {
      type: [Number, null] as PropType<number | null | undefined>,
      default: undefined,
    },
    value: {
      type: [Number, null] as PropType<number | null | undefined>,
      default: undefined,
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
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: number | null) => true,
  },
}

export const [createProgressContext, createProgressScope]
  = createProvideScope(PROGRESS_NAME)

export const [progressProvider, useProgressInject]
  = createProgressContext<ProgressInjectValue>(PROGRESS_NAME)

const progress = defineComponent({
  name: PROGRESS_NAME,
  inheritAttrs: false,
  props: {
    ...progressProps.props,
    ...scopeProgressProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const {
      value,
      max,
      getValueLabel,
      scopeOkuProgress,
      ...progressProps
    } = toRefs(props)
    const _reactive = reactive(progressProps)
    const reactiveProgressProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

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

    const modelValue = useModel(props, 'modelValue')
    const proxyValue = computed(() => {
      if (modelValue.value !== undefined)
        return modelValue.value
      if (valueProp.value !== undefined)
        return valueProp.value
      return undefined
    })

    progressProvider({
      scope: scopeOkuProgress.value,
      value: proxyValue,
      max: maxProp,
    })

    const originalReturn = () =>
      h(
        Primitive.div,
        {
          'aria-valuemax': maxProp.value,
          'aria-valuemin': 0,
          'aria-valuenow': isNumber(proxyValue.value)
            ? proxyValue.value
            : undefined,
          'aria-valuetext': valueLabel.value,
          'role': 'progressbar',
          'data-state': computed(() =>
            getProgressState(maxProp.value, proxyValue.value),
          ).value,
          'data-value': proxyValue.value ?? undefined,
          'data-max': maxProp.value,
          ...mergeProps(attrs, reactiveProgressProps),
          'ref': forwardedRef,
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
    $props: ProgressNaviteElement
  })
