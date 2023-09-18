import { OkuCollapsibleTrigger, collapsibleTriggerProps } from '@oku-ui/collapsible'
import type { CollapsibleTriggerEmits, CollapsibleTriggerProps } from '@oku-ui/collapsible'
import { primitiveProps } from '@oku-ui/primitive'
import type { OkuElement } from '@oku-ui/primitive'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { ACCORDION_NAME, CollectionItemSlot, scopeAccordionProps, useAccordionCollapsibleInject, useAccordionInject, useAccordionItemInject, useCollapsibleScope } from './utils'

const TRIGGER_NAME = 'OkuAccordionTrigger'

export type AccordionTriggerNativeElement = OkuElement<'button'>

export type AccordionTriggerElement = HTMLButtonElement

export interface AccordionTriggerProps extends CollapsibleTriggerProps {}

export interface AccordionTriggerEmits extends CollapsibleTriggerEmits {}

export const accordionTriggerProps = {
  props: {
    ...collapsibleTriggerProps.props,
  },
  emits: {
    ...collapsibleTriggerProps.emits,
  },
}
const accordionTrigger = defineComponent({
  name: TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...accordionTriggerProps.props,
    ...scopeAccordionProps,
  },
  emits: accordionTriggerProps.emits,
  setup(props, { attrs }) {
    const {
      scopeOkuAccordion,
      ...triggerProps
    } = toRefs(props)

    const accordionInject = useAccordionInject(ACCORDION_NAME, scopeOkuAccordion.value)
    const itemInject = useAccordionItemInject(TRIGGER_NAME, scopeOkuAccordion.value)
    const collapsibleInject = useAccordionCollapsibleInject(TRIGGER_NAME, scopeOkuAccordion.value)
    const collapsibleScope = useCollapsibleScope(scopeOkuAccordion.value)

    const _triggerProps = reactive(triggerProps)

    const forwardRef = useForwardRef()

    return () => h(CollectionItemSlot, {
      scope: scopeOkuAccordion.value,
    }, {
      default: () => h(OkuCollapsibleTrigger, {
        'aria-disabled': (itemInject.open?.value && !collapsibleInject.collapsible) || undefined,
        'data-orientation': accordionInject.orientation.value,
        'id': itemInject.triggerId.value,
        ...mergeProps(attrs, collapsibleScope, _triggerProps),
        'ref': forwardRef,
      }),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAccordionTrigger = accordionTrigger as typeof accordionTrigger
&
(new () => {
  $props: AccordionTriggerNativeElement
})
