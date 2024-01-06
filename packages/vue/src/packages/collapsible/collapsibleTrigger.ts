import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'

import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { useCollapsibleInject } from './collapsible'
import { getState, scopeCollapsibleProps } from './utils'

const TRIGGER_NAME = 'OkuCollapsibleTrigger'

export type CollapsibleTriggerNaviteElement = OkuElement<'button'>
export type CollapsibleTriggerElement = HTMLButtonElement

export interface CollapsibleTriggerProps extends PrimitiveProps { }

export interface CollapsibleTriggerEmits {
  click: [event: MouseEvent]
}

export const collapsibleTriggerProps = {
  props: {},
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (e: MouseEvent) => true,
  },
}

const collapsibleTrigger = defineComponent({
  name: TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    ...collapsibleTriggerProps.props,
    ...scopeCollapsibleProps,
    ...primitiveProps,
  },
  emits: collapsibleTriggerProps.emits,
  setup(props, { attrs, slots, emit }) {
    const { scopeOkuCollapsible, ...triggerProps } = toRefs(props)
    const _reactive = reactive(triggerProps)
    const reactiveTriggerProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const context = useCollapsibleInject(TRIGGER_NAME, scopeOkuCollapsible.value)

    const forwardedRef = useForwardRef()

    const originalReturn = () => h(
      Primitive.button,
      {
        'type': 'button',
        'aria-controls': context.contentId.value,
        'aria-expanded': context.open.value || false,
        'data-state': getState(context.open.value),
        'data-disabled': context.disabled?.value ? '' : undefined,
        'disabled': context.disabled?.value,
        ...mergeProps(attrs, reactiveTriggerProps),
        'ref': forwardedRef,
        'onClick': composeEventHandlers<MouseEvent>((e) => {
          emit('click', e)
        }, context.onOpenToggle),
      },
      {
        default: () => slots.default && slots.default(),
      },
    )
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuCollapsibleTrigger = collapsibleTrigger as typeof collapsibleTrigger &
  (new () => {
    $props: CollapsibleTriggerNaviteElement
  })
