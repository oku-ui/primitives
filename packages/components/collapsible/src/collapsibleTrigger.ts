import { defineComponent, h } from 'vue'
import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { Primitive, PrimitiveProps } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'

import { useForwardRef } from '@oku-ui/use-composable'
import { ScopePropObject } from '@oku-ui/provide'
import { useCollapsibleInject } from './collapsible'
import { getState } from './utils'

const TRIGGER_NAME = 'OkuCollapsibleTrigger'

type CollapsibleTriggerElement = ElementType<'button'>
export type _CollapsibleTriggerEl = HTMLButtonElement

interface CollapsibleTriggerProps extends IPrimitiveProps { }

const CollapsibleTrigger = defineComponent({
  name: TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    scopeCollapsible: {
      ...ScopePropObject,
    },
    ...PrimitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { ...triggerProps } = attrs as CollapsibleTriggerElement
    const context = useCollapsibleInject(TRIGGER_NAME, props.scopeCollapsible)

    const forwardedRef = useForwardRef()

    const originalReturn = () => h(
      Primitive.button,
      {
        'type': 'button',
        'aria-controls': context.contentId,
        'aria-expanded': context.open.value || false,
        'data-state': getState(context.open.value || false),
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
type _CollapsibleTriggerProps = MergeProps<CollapsibleTriggerProps, CollapsibleTriggerElement>
type InstanceCollapsibleTriggerType = InstanceTypeRef<typeof CollapsibleTrigger, _CollapsibleTriggerEl>

const OkuCollapsibleTrigger = CollapsibleTrigger as typeof CollapsibleTrigger & (new () => { $props: _CollapsibleTriggerProps })

export {
  OkuCollapsibleTrigger,
  type InstanceCollapsibleTriggerType,
  type CollapsibleTriggerProps,
  type CollapsibleTriggerElement,
}
