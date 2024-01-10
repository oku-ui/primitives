import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs, useModel } from 'vue'
import { reactiveOmit, useControllable, useForwardRef } from '@oku-ui/use-composable'
import { OkuAccordionImpl } from './accordionImpl'
import {
  ACCORDION_IMPL_SINGLE_NAME,
  AccordionCollapsibleProvider,
  AccordionValueProvider,
  accordionImplSingleProps,
  scopeAccordionProps,
} from './props'
import type { AccordionImplSingleNativeElement } from './props'

const accordionImplSingle = defineComponent({
  name: ACCORDION_IMPL_SINGLE_NAME,
  inheritAttrs: false,
  props: {
    ...accordionImplSingleProps.props,
    ...scopeAccordionProps,
  },
  emits: accordionImplSingleProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      value: valueProp,
      defaultValue,
      collapsible,
      ...accordionSingleProps
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
    })

    const forwardRef = useForwardRef()

    const _reactive = reactive(accordionSingleProps)
    const _accordionSingleProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    AccordionValueProvider({
      scope: props.scopeOkuAccordion,
      value: computed(() => value.value ? [value.value] : []),
      onItemOpen: (e) => {
        setValue(e)
      },
      onItemClose: () => {
        if (collapsible.value)
          setValue('')
      },
    })

    AccordionCollapsibleProvider({
      scope: props.scopeOkuAccordion,
      collapsible: ref(collapsible.value || false),
    })

    return () => h(OkuAccordionImpl, {
      ...mergeProps(attrs, _accordionSingleProps),
      ref: forwardRef,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAccordionImplSingle = accordionImplSingle as typeof accordionImplSingle
&
  (new () => {
    $props: AccordionImplSingleNativeElement
  })
