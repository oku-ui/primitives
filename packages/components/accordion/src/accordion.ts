import type { OkuElement } from '@oku-ui/primitive'
import type { PropType } from 'vue'
import { defineComponent, h, reactive, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { type AccordionImplSingleEmits, type AccordionImplSingleProps, OkuAccordionImplSingle } from './accordionImplSingle'
import { type AccordionImplMultipleEmits, type AccordionImplMultipleProps, OkuAccordionImplMultiple } from './accordionImplMultiple'
import type { SelectionType } from './utils'
import { ACCORDION_NAME, CollectionProvider, scopeAccordionProps } from './utils'

export type AccordionNativeElement = OkuElement<'div'>

export type AccordionElement = HTMLDivElement

export interface AccordionSingleProps extends AccordionImplSingleProps {
  selectionType: 'single'
}

export interface AccordionSingleEmits extends AccordionImplSingleEmits {
}

export interface AccordionMultipleProps extends AccordionImplMultipleProps {
  selectionType: 'multiple'
}

export interface AccordionMultipleEmits extends AccordionImplMultipleEmits {
}
export const accordionProps = {
  props: {

    modelValue: {
      type: [String, Array, undefined] as PropType<string | string[] | undefined>,
      default: undefined,
    },
    selectionType: {
      type: String as PropType<SelectionType>,
      default: 'single',
    },
    defaultValue: {
      type: [String, Array, undefined] as PropType<string | string[] | undefined>,
      default: undefined,
    },
    /**
   * Whether an accordion item can be collapsed after it has been opened.
   * @default false
   */
    collapsible: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
  },
  emits: {
    /**
   * The callback that fires when the state of the accordion changes.
   */
    // eslint-disable-next-line unused-imports/no-unused-vars
    valueChange: (value: string | string[]) => true,
  },
}
const accordion = defineComponent({
  name: ACCORDION_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...accordionProps.props,
    ...scopeAccordionProps,
  },
  emits: accordionProps.emits,
  setup(props, { attrs }) {
    const {
      selectionType, ...accordionPropsRefs
    } = toRefs(props)
    const singleProps = reactive(accordionPropsRefs) as AccordionImplSingleProps
    const multipleProps = reactive(accordionPropsRefs) as AccordionImplMultipleProps

    const forwardRef = useForwardRef
    //* *********** */
    return () => h(CollectionProvider, {
      scope: props.scopeOkuAccordion,
    },
    selectionType.value === 'multiple'
      ? h(OkuAccordionImplMultiple, {
        ...multipleProps,
        ...attrs,
        ref: forwardRef,
      })
      : h(OkuAccordionImplSingle, {
        ...singleProps,
        ref: forwardRef,
      }))
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAccordion = accordion as typeof accordion
&
(new () => {
  $props: AccordionNativeElement
})
//* **AccordionItem da kaldım */
