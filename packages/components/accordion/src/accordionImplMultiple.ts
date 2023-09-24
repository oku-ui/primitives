import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useControllable, useForwardRef } from '@oku-ui/use-composable'
import {
  ACCORDION_IMPL_MULTIPLE_NAME, AccordionCollapsibleProvider, type AccordionImplMultipleNativeElement, AccordionValueProvider, accordionImplMultipleProps,
  scopeAccordionProps,
} from './props'
import { OkuAccordionImpl } from './accordionImpl'

const accordionImplMultiple = defineComponent({
  name: ACCORDION_IMPL_MULTIPLE_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...accordionImplMultipleProps.props,
    ...scopeAccordionProps,
  },
  emits: accordionImplMultipleProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      value: valueProp,
      defaultValue,
      ...accordionMultipleProps
    } = toRefs(props)
    const { state, updateValue } = useControllable({
      prop: computed(() => valueProp.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result) => {
        emit('valueChange', result)
      },
      initialValue: undefined,
    })

    const forwardRef = useForwardRef()

    const _reactive = reactive(accordionMultipleProps)
    const _accordionMultipleProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    AccordionValueProvider({
      scope: props.scopeOkuAccordion,
      value: computed(() => state.value),
      onItemOpen: (e) => {
        if (!state.value)
          updateValue([])

        state.value.push(e)
        updateValue(state.value)
      },
      onItemClose: (e) => {
        const index = state.value.indexOf(e)
        state.value.splice(index, 1)
        updateValue(state.value)
      },
    })
    AccordionCollapsibleProvider({
      scope: props.scopeOkuAccordion,
      collapsible: true,
    })
    return () => h(OkuAccordionImpl, {
      ...mergeProps(attrs, _accordionMultipleProps),
      ref: forwardRef,
    }, {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAccordionImplMultiple = accordionImplMultiple as typeof accordionImplMultiple
&
(new () => {
  $props: AccordionImplMultipleNativeElement
})
