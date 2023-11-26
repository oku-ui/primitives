import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'

import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { Primitive, primitiveProps } from '@oku-ui/primitive'

import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'

import { OkuPresence } from '@oku-ui/presence'
import { getState, isIndeterminate, scopeCheckboxProps } from './utils'
import { useCheckboxInject } from './checkbox'

export type CheckboxIndicatorNaviteElement = OkuElement<'span'>
export type CheckboxElement = HTMLSpanElement

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
    const { forceMount, scopeOkuCheckbox, ...indicatorProps } = toRefs(props)
    const _reactive = reactive(indicatorProps)
    const reactiveIndicatorProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const context = useCheckboxInject(INDICATOR_NAME, scopeOkuCheckbox.value)

    const originalReturn = () => h(OkuPresence, {
      present: computed(() => forceMount.value || isIndeterminate(context.state.value) || context.state.value === true).value,
    }, {
      default: () => h(Primitive.span, {
        'ref': forwardedRef,
        'data-state': computed(() => getState(context.state.value)).value,
        'data-disabled': context.disabled?.value ? '' : undefined,
        ...mergeProps(attrs, reactiveIndicatorProps),
        'style': { pointerEvents: 'none', ...attrs.style as any },
      }, {
        default: () => slots.default?.(),
      }),
    })

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuCheckboxIndicator = checkboxIndicator as typeof checkboxIndicator &
  (new () => {
    $props: CheckboxIndicatorNaviteElement
  })
