import { type ElementType, type InstanceTypeRef, type MergeProps, Primitive, PrimitiveProps } from '@oku-ui/primitive'
import { defineComponent, h, toRefs } from 'vue'
import type { PropType } from 'vue'
import { OkuPresence } from '@oku-ui/presence'
import { useForwardRef } from '@oku-ui/use-composable'
import { ScopedRadioProps, useRadioInject } from './Radio'
import { getState } from './utils'

const INDICATOR_NAME = 'OkuRadioIndicator'

type RadioIndicatorElement = ElementType<'span'>
export type _RadioIndicatorEl = HTMLSpanElement

interface RadioIndicatorProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

const RadioIndicatorPropsObject = {
  forceMount: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  ...ScopedRadioProps,
  ...PrimitiveProps,
}

const RadioIndicator = defineComponent({
  name: INDICATOR_NAME,
  inheritAttrs: false,
  props: RadioIndicatorPropsObject,
  setup(props, { attrs }) {
    const { forceMount } = toRefs(props)

    const inject = useRadioInject(INDICATOR_NAME, props.scopeRadio)
    const forwardedRef = useForwardRef()

    return () => h(OkuPresence, {
      present: forceMount.value || inject.checked.value,
    }, {
      default: () =>
        h(Primitive.span, {
          'data-state': getState(inject.checked.value),
          'data-disabled': inject.disabled?.value ? '' : undefined,
          ...attrs,
          'ref': forwardedRef,
        }),
    })
  },
})

type _RadioIndicatorProps = MergeProps<RadioIndicatorProps, RadioIndicatorElement>
type IstanceBubbleType = InstanceTypeRef<typeof RadioIndicator, _RadioIndicatorEl>

const OkuRadioIndicator = RadioIndicator as typeof RadioIndicator & (new () => { $props: _RadioIndicatorProps })

export { OkuRadioIndicator }

export type { RadioIndicatorProps, RadioIndicatorElement, IstanceBubbleType }
