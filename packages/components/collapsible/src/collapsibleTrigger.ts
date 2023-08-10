import type { PropType } from 'vue'
import { defineComponent, h, toRefs } from 'vue'
import type { Scope } from '@oku-ui/provide'
import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'

import { useForwardRef } from '@oku-ui/use-composable'
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
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
    asChild: {
      type: Boolean,
      default: undefined,
    },
  },
  setup(props, { attrs, slots }) {
    const { scopeCollapsible } = toRefs(props)
    const { ...triggerProps } = attrs as CollapsibleTriggerElement
    const context = useCollapsibleInject(TRIGGER_NAME, scopeCollapsible.value)

    const forwardedRef = useForwardRef()

    const originalReturn = () => h(
      Primitive.button,
      {
        'type': 'button',
        'aria-controls': context.value.contentId,
        'aria-expanded': context.value.open.value || false,
        'data-state': getState(context.value.open.value || false),
        'data-disabled': context.value.disabled?.value ? '' : undefined,
        'disabled': context.value.disabled?.value,
        ...triggerProps,
        'asChild': props.asChild,
        'ref': forwardedRef,
        'onClick': composeEventHandlers(triggerProps.onClick, context.value.onOpenToggle),
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
