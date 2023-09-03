import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, toRefs } from 'vue'
import type { PropType } from 'vue'
import { OkuPresence } from '@oku-ui/presence'
import { useForwardRef } from '@oku-ui/use-composable'
import { useRadioInject } from './Radio'
import { getState, scopeRadioProps } from './utils'

const INDICATOR_NAME = 'OkuRadioIndicator'

export type RadioIndicatorNaviteElement = OkuElement<'span'>
export type RadioIndicatorElement = HTMLSpanElement

export interface RadioIndicatorProps extends PrimitiveProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const radioIndicatorProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
    ...primitiveProps,
  },
}

const RadioIndicator = defineComponent({
  name: INDICATOR_NAME,
  inheritAttrs: false,
  props: {
    ...radioIndicatorProps.props,
    ...scopeRadioProps,
  },
  setup(props, { attrs }) {
    const { forceMount, scopeOkuRadio } = toRefs(props)
    const inject = useRadioInject(INDICATOR_NAME, scopeOkuRadio.value)
    const forwardedRef = useForwardRef()

    return () => {
      return h(OkuPresence, {
        present: computed(() => forceMount.value || inject.checked.value).value,
      }, {
        default: () =>
          h(Primitive.span, {
            'data-state': getState(inject.checked.value),
            'data-disabled': computed(() => inject.disabled?.value ? '' : undefined).value,
            'asChild': props.asChild,
            ...attrs,
            'ref': forwardedRef,
          }),
      })
    }
  },
})

export const OkuRadioIndicator = RadioIndicator as typeof RadioIndicator &
(new () => {
  $props: RadioIndicatorNaviteElement
})
