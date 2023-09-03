import type {
  OkuElement, PrimitiveProps,
} from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, toValue } from 'vue'
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
    const { ...thumbAttrs } = attrs as SwitchThumbNaviteElement

    const forwardedRef = useForwardRef()

    const context = toValue(useSwitchInject(THUMB_NAME, props.scopeOkuSwitch))

    const originalReturn = () =>
      h(
        Primitive.span,
        {
          'data-disabled': context.disabled?.value ? '' : undefined,
          'data-state': getState(context.checked.value),
          'ref': forwardedRef,
          'asChild': props.asChild,
          ...thumbAttrs,
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
