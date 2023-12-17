import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuRadioIndicator } from './radio-indicator'
import { RADIO_GROUP_INDICATOR_NAME, radioGroupIndicatorProps, scopeRadioGroupProps, useRadioScope } from './props'
import type { RadioGroupIndicatorNativeElement } from './props'

const radioGroupIndicator = defineComponent({
  name: RADIO_GROUP_INDICATOR_NAME,
  components: {
    OkuRadioIndicator,
  },
  inheritAttrs: false,
  props: {
    ...radioGroupIndicatorProps.props,
    ...scopeRadioGroupProps,
  },
  emits: radioGroupIndicatorProps.emits,
  setup(props, { attrs }) {
    const { scopeOkuRadioGroup, ...indicatorProps } = toRefs(props)

    const _reactive = reactive(indicatorProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const radioScope = useRadioScope(scopeOkuRadioGroup.value)

    return () => h(OkuRadioIndicator, {
      ...radioScope,
      ...mergeProps(attrs, otherProps),
      ref: forwardedRef,
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuRadioGroupIndicator = radioGroupIndicator as typeof radioGroupIndicator & (new () => { $props: RadioGroupIndicatorNativeElement })
