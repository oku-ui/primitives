import { computed, defineComponent, h } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'

import { useForwardRef } from '@oku-ui/use-composable'
import { useCollapsibleInject } from './collapsible'
import type { ScopeCollapsible } from './utils'
import { getState, scopeCollapsibleProps } from './utils'

const TRIGGER_NAME = 'OkuCollapsibleTrigger'

export type CollapsibleTriggerIntrinsicElement = ElementType<'button'>
export type CollapsibleTriggerElement = HTMLButtonElement

interface CollapsibleTriggerProps extends PrimitiveProps { }

const collapsibleTrigger = defineComponent({
  name: TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    ...scopeCollapsibleProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { ...triggerProps } = attrs as CollapsibleTriggerIntrinsicElement
    const context = useCollapsibleInject(TRIGGER_NAME, props.scopeOkuCollapsible)

    const forwardedRef = useForwardRef()

    const originalReturn = () => h(
      Primitive.button,
      {
        'type': 'button',
        'aria-controls': context.contentId.value,
        'aria-expanded': context.open.value || false,
        'data-state': computed(() => getState(context.open.value || false)),
        'data-disabled': context.disabled?.value ? '' : undefined,
        'disabled': context.disabled?.value,
        ...triggerProps,
        'asChild': props.asChild,
        'ref': forwardedRef,
        'onClick': composeEventHandlers(triggerProps.onClick, context.onOpenToggle),
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
  $props: ScopeCollapsible<Partial<CollapsibleTriggerElement>>
})

export type { CollapsibleTriggerProps }
