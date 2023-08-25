import type { PropType } from 'vue'
import { computed, defineComponent, h, toRefs } from 'vue'

import { useForwardRef } from '@oku-ui/use-composable'
import { Primitive, primitiveProps } from '@oku-ui/primitive'

import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'

import { OkuPresence } from '@oku-ui/presence'
import type { ScopeCheckbox } from './utils'
import { getState, isIndeterminate, scopeCheckboxProps } from './utils'
import { useCheckboxInject } from './checkbox'

export type CheckboxIndicatorIntrinsicElement = ElementType<'span'>
export type CheckboxIndicatorElement = HTMLSpanElement

export interface CheckboxIndicatorProps extends PrimitiveProps {
  forceMount?: true
}

export const checkboxIndicatorProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
  },
  emits: {},
}

const INDICATOR_NAME = 'OkuCheckboxIndicator'

const checkboxIndicator = defineComponent({
  name: INDICATOR_NAME,
  props: {
    ...checkboxIndicatorProps.props,
    ...scopeCheckboxProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { forceMount } = toRefs(props)
    const { ...indicatorAttrs } = attrs as CheckboxIndicatorIntrinsicElement

    const forwardedRef = useForwardRef()

    const context = useCheckboxInject(INDICATOR_NAME, props.scopeOkuCheckbox)

    const originalReturn = () => h(OkuPresence, {
      present: computed(() => forceMount.value || isIndeterminate(context.state.value) || context.state.value === true).value,
    }, {
      default: () => h(Primitive.span, {
        'ref': forwardedRef,
        'data-state': computed(() => getState(context.state.value)).value,
        'data-disabled': context.disabled?.value ? '' : undefined,
        ...indicatorAttrs,
        'asChild': props.asChild,
        'style': { pointerEvents: 'none', ...attrs.style as any },
      },
      {
        default: () => slots.default?.(),
      }),
    })

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuCheckboxIndicator = checkboxIndicator as typeof checkboxIndicator &
(new () => {
  $props: ScopeCheckbox<Partial<CheckboxIndicatorElement>>
})
