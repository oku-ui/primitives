import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuAccordionImplSingle } from './accordionImplSingle'
import { OkuAccordionImplMultiple } from './accordionImplMultiple'
import { ACCORDION_NAME, CollectionProvider, accordionProps, scopeAccordionProps } from './props'
import type { AccordionImplMultipleProps, AccordionImplSingleProps, AccordionNativeElement } from './props'

const accordion = defineComponent({
  name: ACCORDION_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...accordionProps.props,
    ...scopeAccordionProps,
  },
  emits: accordionProps.emits,
  setup(props, { attrs, slots, emit }) {
    const {
      selectionType, ...accordionPropsRefs
    } = toRefs(props)
    const forwardRef = useForwardRef

    const _reactiveSingleProps = reactive(accordionPropsRefs) as AccordionImplSingleProps
    const singleProps = reactiveOmit(_reactiveSingleProps, (key, _value) => key === undefined)

    const _reactiveMultipleProps = reactive(accordionPropsRefs) as AccordionImplMultipleProps
    const multipleProps = reactiveOmit(_reactiveMultipleProps, (key, _value) => key === undefined)
    //* *********** */
    return () => h(CollectionProvider, {
      scope: props.scopeOkuAccordion,
    },
    selectionType.value === 'multiple'
      ? h(OkuAccordionImplMultiple, {
        ...mergeProps(attrs, multipleProps),
        ref: forwardRef,
        onValueChange: (result) => {
          emit('valueChange', result)
        },
      }, {
        default: () => slots.default?.(),
      })
      : h(OkuAccordionImplSingle, {
        ...mergeProps(attrs, singleProps),
        ref: forwardRef,
        onValueChange: (result) => {
          emit('valueChange', result)
        },
      }, {
        default: () => slots.default?.(),
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
