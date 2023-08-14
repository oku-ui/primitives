import type {
  ElementType,
  IPrimitiveProps,
  MergeProps,
} from '@oku-ui/primitive'
import { Primitive, PrimitiveProps } from '@oku-ui/primitive'
import { type Scope, ScopePropObject } from '@oku-ui/provide'
import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, toValue } from 'vue'
import { useSwitchContext } from './Switch'
import { getState } from './util'

const THUMB_NAME = 'SwitchThumb'

type SwitchThumbElement = ElementType<'span'>
export type _SwitchThumbEl = HTMLSpanElement

type SwitchThumbProps = SwitchThumbElement &
IPrimitiveProps & {
  scopeSwitch?: Scope
}

const SwitchThumb = defineComponent({
  name: THUMB_NAME,
  inheritAttrs: false,
  props: {
    scopeSwitch: {
      ...ScopePropObject,
    },
    ...PrimitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { ...thumbAttrs } = attrs as SwitchThumbProps

    const forwardedRef = useForwardRef()

    const context = toValue(useSwitchContext(THUMB_NAME, props.scopeSwitch))

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

type _SwitchThumb = MergeProps<SwitchThumbProps, SwitchThumbElement>
type InstanceSwitchThumbType = InstanceType<typeof SwitchThumb>

const OkuSwitchThumb = SwitchThumb as typeof SwitchThumb &
(new () => { $props: _SwitchThumb })

export { OkuSwitchThumb }

export type { SwitchThumbProps, InstanceSwitchThumbType }
