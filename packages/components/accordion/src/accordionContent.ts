import { OkuCollapsibleContent } from '@oku-ui/collapsible'
import { primitiveProps } from '@oku-ui/primitive'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { ACCORDION_NAME, type AccordionContentNativeElement, CONTENT_NAME, accordionContentProps, scopeAccordionProps, useAccordionInject, useAccordionItemInject, useCollapsibleScope } from './props'

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
  setup(props, { slots, attrs }) {
    const {
      scopeOkuAccordion,
      ...contentProps
    } = toRefs(props)

    const accordionInject = useAccordionInject(ACCORDION_NAME, scopeOkuAccordion.value)
    const itemInject = useAccordionItemInject(CONTENT_NAME, scopeOkuAccordion.value)
    const collapsibleScope = useCollapsibleScope(scopeOkuAccordion.value)

    const _reactive = reactive(contentProps)
    const _contentProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardRef = useForwardRef()

    return () => h(OkuCollapsibleContent, {
      'role': 'region',
      'aria-labelledby': itemInject.triggerId.value,
      'data-orientation': accordionInject.orientation.value,
      ...collapsibleScope,
      ...mergeProps(attrs, _contentProps),
      'ref': forwardRef,
      'style': {
        '--oku-accordion-content-height': 'var(--oku-collapsible-content-height)',
        '--oku-accordion-content-width': 'var(--oku-collapsible-content-width)',
        ...attrs.style as any,
      },
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAccordionContent = accordionContent as typeof accordionContent
&
(new () => {
  $props: AccordionContentNativeElement
})
