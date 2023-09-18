import { OkuCollapsibleContent, collapsibleContentProps } from '@oku-ui/collapsible'
import type { CollapsibleContentProps } from '@oku-ui/collapsible'
import { primitiveProps } from '@oku-ui/primitive'
import type { OkuElement } from '@oku-ui/primitive'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { ACCORDION_NAME, scopeAccordionProps, useAccordionInject, useAccordionItemInject, useCollapsibleScope } from './utils'

const CONTENT_NAME = 'OkuAccordionContent'

export type AccordionContentNativeElement = OkuElement<'div'>

export type AccordionContentElement = HTMLDivElement

export interface AccordionContentProps extends CollapsibleContentProps {}

export const accordionContentProps = {
  props: {
    ...collapsibleContentProps.props,
  },
  emits: {
  },
}

/**
 * `AccordionContent` contains the collapsible content for an `AccordionItem`.
 */
const accordionContent = defineComponent({
  name: CONTENT_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...accordionContentProps.props,
    ...scopeAccordionProps,
  },
  emits: accordionContentProps.emits,
  setup(props, { slots, attrs }) {
    const {
      scopeOkuAccordion,
      ...contentProps
    } = toRefs(props)

    const accordionInject = useAccordionInject(ACCORDION_NAME, scopeOkuAccordion.value)
    const itemInject = useAccordionItemInject(CONTENT_NAME, scopeOkuAccordion.value)
    const collapsibleScope = useCollapsibleScope(scopeOkuAccordion.value)

    const _contentProps = reactive(contentProps)

    const forwardRef = useForwardRef()

    return () => h(OkuCollapsibleContent, {
      'role': 'region',
      'aria-labelledby': itemInject.triggerId.value,
      'data-orientation': accordionInject.orientation.value,
      ...mergeProps(attrs, collapsibleScope, _contentProps),
      'ref': forwardRef,
      'style': {
        ...attrs.style as any,
        ['--radix-accordion-content-height' as any]: 'var(--radix-collapsible-content-height)',
        ['--radix-accordion-content-width' as any]: 'var(--radix-collapsible-content-width)',
      },
    }, {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAccordionContent = accordionContent as typeof accordionContent
&
(new () => {
  $props: AccordionContentNativeElement
})
