import { OkuCollapsibleTrigger } from '@oku-ui/collapsible'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import type { AccordionTriggerNativeElement } from './props'
import {
  ACCORDION_NAME, CollectionItemSlot, TRIGGER_NAME, accordionTriggerProps,
  scopeAccordionProps, useAccordionCollapsibleInject,
  useAccordionInject, useAccordionItemInject, useCollapsibleScope,

} from './props'

const accordionTrigger = defineComponent({
  name: TRIGGER_NAME,
  inheritAttrs: false,
  props: {
    ...accordionTriggerProps.props,
    ...scopeAccordionProps,
  },
  emits: accordionTriggerProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuAccordion,
      ...triggerProps
    } = toRefs(props)

    const accordionInject = useAccordionInject(ACCORDION_NAME, scopeOkuAccordion.value)
    const itemInject = useAccordionItemInject(TRIGGER_NAME, scopeOkuAccordion.value)
    const collapsibleInject = useAccordionCollapsibleInject(TRIGGER_NAME, scopeOkuAccordion.value)
    const collapsibleScope = useCollapsibleScope(scopeOkuAccordion.value)

    const _reactive = reactive(triggerProps)
    const _triggerProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardRef = useForwardRef()

    const disabled = computed(() => (itemInject.open?.value && !collapsibleInject.collapsible.value) || undefined)

    return () => h(CollectionItemSlot, {
      scope: scopeOkuAccordion.value,
    }, {
      default: () => h(OkuCollapsibleTrigger, {
        'aria-disabled': disabled.value,
        'data-orientation': accordionInject.orientation.value,
        'id': itemInject.triggerId.value,
        ...collapsibleScope,
        ...mergeProps(attrs, _triggerProps),
        'ref': forwardRef,
      }, slots),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAccordionTrigger = accordionTrigger as typeof accordionTrigger
&
(new () => {
  $props: AccordionTriggerNativeElement
})
