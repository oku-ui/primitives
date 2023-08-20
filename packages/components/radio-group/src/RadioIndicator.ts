import { type ElementType, Primitive, primitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, mergeProps } from 'vue'
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
    type: Boolean as PropType<boolean>,
    default: true,
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
    const { forceMount, scopeOkuRadio, ...indicatorProps } = props
    const inject = useRadioInject(INDICATOR_NAME, scopeOkuRadio)
    const forwardedRef = useForwardRef()

    return () => h(OkuPresence, {
      present: computed(() => inject.checked.value || forceMount).value,
    }, {
      default: () =>
        h(Primitive.span, {
          'data-state': getState(inject.checked.value),
          'data-disabled': computed(() => inject.disabled?.value ? '' : undefined).value,
          ...mergeProps(indicatorProps, attrs),
          'ref': forwardedRef,
        }),
    })
  },
})

export const OkuRadioIndicator = RadioIndicator as typeof RadioIndicator &
(new () => {
  $props: ScopeRadio<Partial<RadioIndicatorElement>>
})

export type { RadioIndicatorProps }

// <button type="button" role="radio" aria-checked="true" data-state="checked" value="1" class="c-kcEvBl" tabindex="-1" data-radix-collection-item=""><span data-state="checked" class="c-fZulUm"></span></button>

// <button type="button" role="radio" aria-checked="true" data-state="checked" class="item-class" tabindex="-1" data-oku-collection-item="" value="1"><span data-state="checked" class="indicator-class" checked="false" value="on"></span></button>
