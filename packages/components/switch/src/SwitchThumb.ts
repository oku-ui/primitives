import type {
  ElementType,
  MergeProps,
  PrimitiveProps,
} from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { useForwardRef } from '@oku-ui/use-composable'
import type { PropType } from 'vue'
import { defineComponent, h, toRefs, toValue } from 'vue'
import { useSwitchContext } from './Switch'
import { getState } from './util'

const THUMB_NAME = 'SwitchThumb'

type SwitchThumbElement = ElementType<'span'>
export type _SwitchThumbEl = HTMLSpanElement

type SwitchThumbProps = SwitchThumbElement &
PrimitiveProps & {
  scopeSwitch?: Scope
}

const SwitchThumb = defineComponent({
  name: THUMB_NAME,
  inheritAttrs: false,
  props: {
    scopeSwitch: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
    asChild: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { attrs, slots, expose }) {
    const { scopeSwitch } = toRefs(props)

    const { ...thumbAttrs } = attrs as SwitchThumbProps

    const forwardedRef = useForwardRef()

    const context = toValue(useSwitchContext(THUMB_NAME, scopeSwitch.value))

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

    return originalReturn as unknown as {
      innerRef: SwitchThumbElement
    }
  },
})

type _SwitchThumb = MergeProps<SwitchThumbProps, SwitchThumbElement>
type InstanceSwitchThumbType = InstanceType<typeof SwitchThumb>

const OkuSwitchThumb = SwitchThumb as typeof SwitchThumb &
(new () => { $props: _SwitchThumb })

export { OkuSwitchThumb }

export type { SwitchThumbProps, InstanceSwitchThumbType }
