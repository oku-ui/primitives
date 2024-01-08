import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import type { RadioElement } from './Radio'
import { useRadioScope } from './Radio'
import { OkuRadioIndicator } from './RadioIndicator'
import type { RadioIndicatorNaviteElement, RadioIndicatorProps } from './RadioIndicator'
import { scopeRadioGroupProps } from './utils'
import { radioGroupProps } from './RadioGroup'

const INDICATOR_NAME = 'OkuRadioGroupIndicator'

export type RadioGroupIndicatorNaviteElement = RadioIndicatorNaviteElement
export type RadioGroupIndicatorElement = RadioElement

export interface RadioGroupIndicatorProps extends RadioIndicatorProps { }

export const radioGroupIndicatorProps = {
  props: {
    ...radioGroupProps.props,
  },
}

const RadioGroupIndicator = defineComponent({
  name: INDICATOR_NAME,
  inheritAttrs: false,
  props: {
    ...radioGroupIndicatorProps.props,
    ...scopeRadioGroupProps,
  },
  setup(props, { attrs }) {
    const { scopeOkuRadioGroup, ...indicatorProps } = toRefs(props)
    const _reactive = reactive(indicatorProps)
    const reactiveIndicatorProps = reactiveOmit(_reactive, (key, _value) => key === undefined)
    const radioScope = useRadioScope(scopeOkuRadioGroup.value)
    const forwardedRef = useForwardRef()

    return () => h(OkuRadioIndicator, {
      ...radioScope,
      ...mergeProps(attrs, reactiveIndicatorProps),
      ref: forwardedRef,
    })
  },
})

export const OkuRadioGroupIndicator = RadioGroupIndicator as typeof RadioGroupIndicator &
  (new () => {
    $props: RadioGroupIndicatorNaviteElement
  })
