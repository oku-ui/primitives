import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuAccordionImplSingle } from './accordionImplSingle'
import { OkuAccordionImplMultiple } from './accordionImplMultiple'
import { ACCORDION_NAME, CollectionProvider, accordionProps, scopeAccordionProps } from './props'
import type { AccordionImplSingleProps, AccordionNativeElement } from './props'

const accordion = defineComponent({
  name: ACCORDION_NAME,
  inheritAttrs: false,
  props: {
    ...accordionProps.props,
    ...scopeAccordionProps,
  },
  setup(props, { attrs, slots }) {
    const {
      type, ...accordionPropsRefs
    } = toRefs(props)
    const forwardRef = useForwardRef

    const _reactiveProps = reactive(accordionPropsRefs) as AccordionImplSingleProps
    const reactiveProps = reactiveOmit(_reactiveProps, (key, _value) => key === undefined)

    return () => {
      if (props.type) {
        const value = props.value || props.defaultValue
        if (props.type && !['single', 'multiple'].includes(props.type)) {
          return new Error(
            'Invalid prop `type` supplied to `Accordion`. Expected one of `single | multiple`.',
          )
        }
        if (props.type === 'multiple' && typeof value === 'string') {
          return new Error(
            'Invalid prop `type` supplied to `Accordion`. Expected `single` when `defaultValue` or `value` is type `string`.',
          )
        }
        if (props.type === 'single' && Array.isArray(value)) {
          return new Error(
            'Invalid prop `type` supplied to `Accordion`. Expected `multiple` when `defaultValue` or `value` is type `string[]`.',
          )
        }
      }

      return h(CollectionProvider, {
        scope: props.scopeOkuAccordion,
      },
      {
        default: () => type.value === 'multiple'
          ? h(OkuAccordionImplMultiple, {
            ...mergeProps(attrs, reactiveProps),
            ref: forwardRef,
          }, slots)
          : h(OkuAccordionImplSingle, {
            ...mergeProps(attrs, reactiveProps),
            ref: forwardRef,
          }, slots),
      },
      )
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAccordion = accordion as typeof accordion
&
(new () => {
  $props: AccordionNativeElement
})
