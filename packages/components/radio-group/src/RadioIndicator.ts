import { type ElementType, Primitive, primitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, toRefs } from 'vue'
import type { PropType } from 'vue'
import { OkuPresence } from '@oku-ui/presence'
import { useForwardRef } from '@oku-ui/use-composable'
import { useRadioInject } from './Radio'
import type { ScopeRadio } from './utils'
import { getState, scopeRadioProps } from './utils'

const INDICATOR_NAME = 'OkuRadioIndicator'

export type RadioIndicatorIntrinsicElement = ElementType<'span'>
export type RadioIndicatorElement = HTMLSpanElement

interface RadioIndicatorProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

const RadioIndicatorPropsObject = {
  forceMount: {
    type: Boolean as PropType<true | undefined>,
    default: undefined,
  },
}

const RadioIndicator = defineComponent({
  name: INDICATOR_NAME,
  inheritAttrs: false,
  props: {
    ...RadioIndicatorPropsObject,
    ...scopeRadioProps,
    ...primitiveProps,
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
  $props: ScopeRadio<Partial<RadioIndicatorElement>>
})

export type { RadioIndicatorProps }
