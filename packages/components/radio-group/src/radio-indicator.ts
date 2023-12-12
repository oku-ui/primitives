import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { OkuPresence } from '@oku-ui/presence'
import { getState } from './utils'
import { RADIO_INDICATOR_NAME, radioIndicatorProps, scopeRadioProps, useRadioInject } from './props'
import type { RadioIndicatorNativeElement } from './props'

const radioIndicator = defineComponent({
  name: RADIO_INDICATOR_NAME,
  components: {
    OkuPresence,
  },
  inheritAttrs: false,
  props: {
    ...radioIndicatorProps.props,
    ...scopeRadioProps,
  },
  emits: radioIndicatorProps.emits,
  setup(props, { attrs }) {
    const { scopeOkuRadio, forceMount, ...indicatorProps } = toRefs(props)

    const _reactive = reactive(indicatorProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useRadioInject(RADIO_INDICATOR_NAME, scopeOkuRadio.value)

    return () => h(OkuPresence, {
      present: computed(() => forceMount.value || inject.checked.value).value,
    }, () => h(Primitive.span, {
      'data-state': getState(inject.checked.value),
      'data-disabled': inject.disabled?.value ? '' : undefined,
      ...mergeProps(attrs, otherProps),
      'ref': forwardedRef,
    }))
  },
})

export const OkuRadioIndicator = radioIndicator as typeof radioIndicator & (new () => { $props: RadioIndicatorNativeElement })
