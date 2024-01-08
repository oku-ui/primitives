import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { ACCORDION_NAME, type AccordionHeaderNativeElement, HEADER_NAME, accordionHeaderProps, scopeAccordionProps, useAccordionInject, useAccordionItemInject } from './props'
import { getState } from './utils'

/**
 * `AccordionHeader` contains the content for the parts of an `AccordionItem` that will be visible
 * whether or not its content is collapsed.
 */
const accordionHeader = defineComponent({
  name: HEADER_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...accordionHeaderProps.props,
    ...scopeAccordionProps,
  },
  emits: accordionHeaderProps.emits,
  setup(props, { slots, attrs }) {
    const {
      scopeOkuAccordion,
      ...headerProps
    } = toRefs(props)

    const accordionInject = useAccordionInject(ACCORDION_NAME, scopeOkuAccordion.value)

    const itemInject = useAccordionItemInject(HEADER_NAME, scopeOkuAccordion.value)

    const _reactive = reactive(headerProps)
    const _headerProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardRef = useForwardRef()

    return () => h(Primitive.h3, {
      'data-orientation': accordionInject.orientation.value,
      'data-state': getState(itemInject.open?.value),
      'data-disabled': itemInject.disabled?.value ? '' : undefined,
      ...mergeProps(attrs, _headerProps),
      'ref': forwardRef,

    }, { default: () => slots.default?.() })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAccordionHeader = accordionHeader as typeof accordionHeader
&
  (new () => {
    $props: AccordionHeaderNativeElement
  })
