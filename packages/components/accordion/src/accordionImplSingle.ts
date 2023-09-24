import { primitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
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
    ...primitiveProps,
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

    const { state, updateValue } = useControllable({
      prop: computed(() => valueProp.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result) => {
        emit('valueChange', result)
      },
      initialValue: undefined,
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
    }, {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuAccordionImplSingle = accordionImplSingle as typeof accordionImplSingle
&
(new () => {
  $props: AccordionImplSingleNativeElement
})
