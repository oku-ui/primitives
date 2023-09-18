import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { ACCORDION_NAME, getState, scopeAccordionProps, useAccordionInject, useAccordionItemInject } from './utils'

const HEADER_NAME = 'OkuAccordionHeader'

type AccordionHeaderNativeElement = OkuElement<'h3'>

export interface AccordionHeaderProps extends PrimitiveProps {}

export const accordionHeaderProps = {
  props: {

  },
  emits: {
  },
}
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
      scopeOkuAccordion, ...headerProps
    } = toRefs(props)

    const accordionInject = useAccordionInject(ACCORDION_NAME, scopeOkuAccordion.value)

    const itemInject = useAccordionItemInject(HEADER_NAME, scopeOkuAccordion.value)

    const _headerProps = reactive(headerProps)

    const forwardRef = useForwardRef()

    return () => h(Primitive.h3, {
      'data-orientation': accordionInject.orientation.value,
      'data-state': getState(itemInject.open?.value),
      'data-disabled': itemInject.disabled?.value,
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
