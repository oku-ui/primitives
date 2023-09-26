import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import { reactiveOmit, useControllable, useForwardRef } from '@oku-ui/use-composable'
import { OkuAccordionImpl } from './accordionImpl'
import {
  ACCORDION_IMPL_SINGLE_NAME, AccordionCollapsibleProvider,
  AccordionValueProvider, accordionImplSingleProps,
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

    const _reactive = reactive(accordionSingleProps)
    const _accordionSingleProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    AccordionValueProvider({
      scope: props.scopeOkuAccordion,
      value: computed(() => state.value ? [state.value] : []),
      onItemOpen: (e) => {
        updateValue(e)
      },
      onItemClose: () => {
        if (collapsible.value)
          updateValue('')
      },
    })

    AccordionCollapsibleProvider({
      scope: props.scopeOkuAccordion,
      collapsible: collapsible.value || false,
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
