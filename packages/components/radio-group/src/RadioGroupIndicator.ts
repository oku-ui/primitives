import { type InstanceTypeRef, type MergeProps } from '@oku-ui/primitive'
import { defineComponent, h, mergeProps } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import type { RadioElement } from './Radio'
import { useRadioScope } from './Radio'
import { OkuRadioIndicator, type RadioIndicatorElement, type RadioIndicatorProps } from './RadioIndicator'
import { scopedRadioGroupProps } from './RadioGroup'

const INDICATOR_NAME = 'OkuRadioGroupIndicator'

type RadioGroupIndicatorIntrinsicElement = RadioIndicatorElement
export type RadioGroupIndicatorElement = RadioElement

interface RadioGroupIndicatorProps extends RadioIndicatorProps {}

const radioGroupIndicatorPropsObject = {

}

const RadioGroupIndicator = defineComponent({
  name: INDICATOR_NAME,
  inheritAttrs: false,
  props: {
    ...radioGroupIndicatorPropsObject,
    ...scopedRadioGroupProps,
  },
  setup(props, { attrs }) {
    const { scopeOkuRadioGroup, ...indicatorProps } = props
    const radioScope = useRadioScope(scopeOkuRadioGroup)
    const forwardedRef = useForwardRef()

    return () => h(OkuRadioIndicator,
      { ...mergeProps(attrs, indicatorProps), ...radioScope, ref: forwardedRef },
    )
  },
})

type _RadioGroupIndicatorProps = MergeProps<RadioGroupIndicatorProps, Partial<RadioGroupIndicatorIntrinsicElement>>
type IstanceBubbleType = InstanceTypeRef<typeof RadioGroupIndicator, RadioGroupIndicatorElement>

const OkuRadioGroupIndicator = RadioGroupIndicator as typeof RadioGroupIndicator & (new () => { $props: _RadioGroupIndicatorProps })

export { OkuRadioGroupIndicator }

export type { RadioGroupIndicatorProps, RadioGroupIndicatorIntrinsicElement, IstanceBubbleType }
