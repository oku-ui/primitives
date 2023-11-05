import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs, useModel } from 'vue'
import { reactiveOmit, useControllable, useForwardRef } from '@oku-ui/use-composable'
import {
  ACCORDION_IMPL_MULTIPLE_NAME,
  AccordionCollapsibleProvider,
  type AccordionImplMultipleNativeElement,
  AccordionValueProvider,
  accordionImplMultipleProps,
  scopeAccordionProps,
} from './props'
import { OkuAccordionImpl } from './accordionImpl'

const accordionImplMultiple = defineComponent({
  name: ACCORDION_IMPL_MULTIPLE_NAME,
  inheritAttrs: false,
  props: {
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

    const modelValue = useModel(props, 'modelValue')
    const proxyChecked = computed(() => valueProp.value !== undefined ? valueProp.value : modelValue.value !== undefined ? modelValue.value : undefined)

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result) => {
        emit('valueChange', result)
        modelValue.value = result
      },
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
      collapsible: ref(true),
    })

    return () => h(OkuAccordionImpl, {
      ...mergeProps(attrs, _accordionMultipleProps),
      ref: forwardRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAccordionImplMultiple = accordionImplMultiple as typeof accordionImplMultiple
&
(new () => {
  $props: AccordionImplMultipleNativeElement
})
