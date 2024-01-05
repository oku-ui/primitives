import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { getState } from './utils'
import type { SwitchThumbNativeElement } from './props'
import { SWITCH_THUMB_NAME, scopeSwitchProps, switchThumbProps, useSwitchInject } from './props'

const SwitchThumb = defineComponent({
  name: SWITCH_THUMB_NAME,
  components: { },
  inheritAttrs: false,
  props: {
    ...switchThumbProps.props,
    ...scopeSwitchProps,
  },
  emits: switchThumbProps.emits,
  setup(props, { attrs }) {
    const { scopeOkuSwitch, ...thumbProps } = toRefs(props)

    const _reactive = reactive(thumbProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const context = useSwitchInject(SWITCH_THUMB_NAME, scopeOkuSwitch.value)

    return () => h(Primitive.span, {
      'data-state': getState(context.checked.value),
      'data-disabled': context.disabled?.value ? '' : undefined,
      ...mergeProps(attrs, otherProps),
      'ref': forwardedRef,
    })
  },
})

export const OkuSwitchThumb = SwitchThumb as typeof SwitchThumb & (new () => { $props: SwitchThumbNativeElement })
