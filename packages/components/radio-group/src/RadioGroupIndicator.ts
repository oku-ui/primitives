import { defineComponent, h, mergeProps } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import type { RadioElement } from './Radio'
import { useRadioScope } from './Radio'
import { OkuRadioIndicator, type RadioIndicatorElement, type RadioIndicatorProps } from './RadioIndicator'
import type { ScopeRadioGroup } from './utils'
import { scopeRadioGroupProps } from './utils'

const INDICATOR_NAME = 'OkuRadioGroupIndicator'

export type RadioGroupIndicatorIntrinsicElement = RadioIndicatorElement
export type RadioGroupIndicatorElement = RadioElement

interface RadioGroupIndicatorProps extends RadioIndicatorProps {}

const radioGroupIndicatorPropsObject = {

}

const RadioGroupIndicator = defineComponent({
  name: INDICATOR_NAME,
  inheritAttrs: false,
  props: {
    ...radioGroupIndicatorPropsObject,
    ...scopeRadioGroupProps,
  },
  setup(props, { attrs }) {
    const { scopeOkuRadioGroup } = props
    const radioScope = useRadioScope(scopeOkuRadioGroup)
    const forwardedRef = useForwardRef()

    return () => h(OkuRadioIndicator,
      { ...mergeProps(attrs), ...radioScope, ref: forwardedRef },
    )
  },
})

export const OkuRadioGroupIndicator = RadioGroupIndicator as typeof RadioGroupIndicator &
(new () => {
  $props: ScopeRadioGroup<Partial<RadioGroupIndicatorElement>>
})

export type { RadioGroupIndicatorProps }
