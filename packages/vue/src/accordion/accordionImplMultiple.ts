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

    const valueProxy = computed(() => {
      if (valueProp.value === undefined && modelValue.value === undefined)
        return undefined
      if (valueProp.value !== undefined)
        return valueProp.value
      if (modelValue.value !== undefined)
        return modelValue.value
    })

    const [value, setValue] = useControllable({
      prop: computed(() => valueProxy.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result) => {
        emit('valueChange', result)
        emit('update:modelValue', result)
      },
      initialValue: [],
    })

    const forwardRef = useForwardRef()

    const _reactive = reactive(accordionMultipleProps)
    const _accordionMultipleProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    AccordionValueProvider({
      scope: props.scopeOkuAccordion,
      value,
      onItemOpen: (e) => {
        if (!value.value)
          setValue([])

        value.value.push(e)
        setValue(value.value)
      },
      onItemClose: (e) => {
        const index = value.value.indexOf(e)
        value.value.splice(index, 1)
        setValue(value.value)
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
