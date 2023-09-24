import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef, useId } from '@oku-ui/use-composable'
import { OkuCollapsible } from '@oku-ui/collapsible'
import type { AccordionItemNativeElement } from './props'
import {
  AccordionItemProvider, ITEM_NAME, accordionItemProps, scopeAccordionProps, useAccordionInject, useAccordionValueInject,
  useCollapsibleScope,
} from './props'
import { getState } from './utils'

/**
 * `AccordionItem` contains all of the parts of a collapsible section inside of an `Accordion`.
 */
const accordionItem = defineComponent({
  name: ITEM_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...accordionItemProps.props,
    ...scopeAccordionProps,
  },
  emits: accordionItemProps.emits,
  setup(props, { slots, attrs }) {
    const {
      scopeOkuAccordion, value: valueProp, ...accordionItemProps
    } = toRefs(props)

    const forwardRef = useForwardRef()
    const accordionInject = useAccordionInject(ITEM_NAME, scopeOkuAccordion.value)
    const valueInject = useAccordionValueInject(ITEM_NAME, scopeOkuAccordion.value)
    const collapsibleScope = useCollapsibleScope(scopeOkuAccordion.value)
    const triggerId = useId()

    const open = computed(() => (valueProp.value && valueInject.value.value?.includes(valueProp.value)) || false)
    const disabled = computed(() => accordionInject.disabled?.value || props.disabled)

    const _reactive = reactive(accordionItemProps)
    const _accordionItemProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    AccordionItemProvider({
      scope: scopeOkuAccordion.value,
      open,
      triggerId: computed(() => triggerId),
      disabled,
    })
    return () => h(OkuCollapsible, {
      'data-orientation': accordionInject.orientation.value,
      'data-state': getState(open.value),
      ...mergeProps(attrs, collapsibleScope, _accordionItemProps),
      'ref': forwardRef,
      'disabled': disabled.value,
      'open': open.value,
      'onOpenChange': (event) => {
        if (event)
          valueInject.onItemOpen(valueProp.value)

        else
          valueInject.onItemClose(valueProp.value)
      },
    }, { default: () => slots.default?.() })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAccordionItem = accordionItem as typeof accordionItem
&
(new () => {
  $props: AccordionItemNativeElement
})
