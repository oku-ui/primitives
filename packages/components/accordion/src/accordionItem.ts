import type { OkuElement } from '@oku-ui/primitive'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { PropType } from 'vue'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { useForwardRef, useId } from '@oku-ui/use-composable'
import { type CollapsibleProps, OkuCollapsible, collapsibleProps } from '@oku-ui/collapsible'
import { AccordionItemProvider, ITEM_NAME, getState, scopeAccordionProps, useAccordionInject, useAccordionValueInject, useCollapsibleScope } from './utils'

type AccordionItemNativeElement = OkuElement<'div'>

export interface AccordionItemProps extends Omit<CollapsibleProps, 'open' | 'defaultOpen' | 'openChange'> {
  /**
   * Whether or not an accordion is disabled from user interaction.
   *
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * A string value for the accordion item. All items within an accordion should use a unique value.
   */
  modelValue: string

}
export interface AccordionItemEmits extends Omit<CollapsibleProps, 'open' | 'defaultOpen' | 'openChange'> {
}

export const accordionItemProps = {
  props: {
    ...propsOmit(collapsibleProps.props, ['open', 'defaultOpen']),
    disabled: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    modelValue: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: {
    ...propsOmit(collapsibleProps.emits, ['openChange']),
  },
}
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
      scopeOkuAccordion, modelValue, ...accordionItemProps
    } = toRefs(props)

    const forwardRef = useForwardRef()
    const accordionInject = useAccordionInject(ITEM_NAME, scopeOkuAccordion.value)
    const valueInject = useAccordionValueInject(ITEM_NAME, scopeOkuAccordion.value)
    const collapsibleScope = useCollapsibleScope(scopeOkuAccordion.value)
    const triggerId = useId()
    const open = (modelValue && valueInject.modelValue.value.includes(modelValue.value)) || false
    const disabled = accordionInject.disabled?.value || props.disabled

    const _accordionItemProps = reactive(accordionItemProps)

    AccordionItemProvider({
      scope: scopeOkuAccordion.value,
      open: computed(() => open),
      triggerId: computed(() => triggerId),
      disabled: computed(() => disabled),
    })
    return () => h(OkuCollapsible, {
      'data-orientation': accordionInject.orientation.value,
      'data-state': getState(open),
      ...mergeProps(attrs, collapsibleScope, _accordionItemProps),
      'ref': forwardRef,
      'disabled': disabled,
      'open': open,
      'onOpenChange': (open) => {
        if (open)
          valueInject.onItemOpen(modelValue.value)

        else
          valueInject.onItemClose(modelValue.value)
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
