import type { PropType } from 'vue'
import { defineComponent, h, toRefs } from 'vue'
import type { Scope } from '@oku-ui/provide'
import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'

import { useRef } from '@oku-ui/use-composable'
import type { CollapsibleElement } from './collapsible'
import { useCollapsibleInject } from './collapsible'
import { getState } from './utils'

const TRIGGER_NAME = 'OkuCollapsibleTrigger'

type CollapsibleTriggerElement = ElementType<'button'>
interface CollapsibleTriggerProps extends PrimitiveProps { }

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
  setup(props, { attrs, slots, expose }) {
    const { scopeCollapsible } = toRefs(props)
    const { ...triggerProps } = attrs as CollapsibleTriggerElement
    const context = useCollapsibleInject(TRIGGER_NAME, scopeCollapsible.value)
    const { $el, newRef } = useRef<CollapsibleElement>()

    expose({
      innerRef: $el,
    })

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
        'ref': newRef,
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
type CollapsibleTriggerRef = RefElement<typeof CollapsibleTrigger>

const OkuCollapsibleTrigger = CollapsibleTrigger as typeof CollapsibleTrigger & (new () => { $props: _CollapsibleTriggerProps })

export {
  OkuCollapsibleTrigger,
  type CollapsibleTriggerRef,
  type CollapsibleTriggerProps,
  type CollapsibleTriggerElement,
}
