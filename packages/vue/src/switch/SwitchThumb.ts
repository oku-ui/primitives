import type {
  OkuElement,
  PrimitiveProps,
} from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { useSwitchInject } from './Switch'
import { getState, scopeSwitchProps } from './util'

const THUMB_NAME = 'OkuSwitchThumb'

export type SwitchThumbNaviteElement = OkuElement<'span'>
export type SwitchThumbElement = HTMLSpanElement

export interface SwitchThumbProps extends PrimitiveProps { }

export const switchThumbProps = {
  props: {
    ...primitiveProps,
  },
}

const SwitchThumb = defineComponent({
  name: THUMB_NAME,
  inheritAttrs: false,
  props: {
    ...scopeSwitchProps,
    ...switchThumbProps.props,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuSwitch, ...thumbAttrs } = toRefs(props)
    const _reactive = reactive(thumbAttrs)
    const reactiveSwitchProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const context = useSwitchInject(THUMB_NAME, scopeOkuSwitch.value)

    const originalReturn = () =>
      h(
        Primitive.span,
        {
          'data-disabled': context.disabled?.value ? '' : undefined,
          'data-state': getState(context.checked.value),
          ...mergeProps(attrs, reactiveSwitchProps),
          'ref': forwardedRef,
        },
        {
          default: () => slots.default?.(),
        },
      )

    return originalReturn
  },
})

export const OkuSwitchThumb = SwitchThumb as typeof SwitchThumb &
  (new () =>
  { $props: SwitchThumbNaviteElement
  })
