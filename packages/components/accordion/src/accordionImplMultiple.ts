import { type PropType, computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import type { OkuElement } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { useControllable } from '../../../core/use-composable/dist'
import { AccordionCollapsibleProvider, AccordionValueProvider, scopeAccordionProps } from './utils'
import { OkuAccordionImpl, accordionImplProps } from './accordionImpl'
import type { AccordionImplEmits, AccordionImplProps } from './accordionImpl'

const ACCORDION_IMPL_MULTIPLE_NAME = 'OkuAccordionImplMultiple'
export type AccordionImplMultipleNativeElement = OkuElement<'div'>

export type AccordionImplMultipleElement = HTMLDivElement

export interface AccordionImplMultipleProps extends AccordionImplProps {
  /**
   * The controlled stateful value of the accordion item whose content is expanded.
   */
  value?: string[]
  /**
   * The value of the item whose content is expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string[]
}
export interface AccordionImplMultipleEmits extends AccordionImplEmits {
  /**
   * The callback that fires when the state of the accordion changes.
   */
  valueChange: [value: string[]]
}
export const accordionImplMultipleProps = {
  props: {
    ...accordionImplProps.props,
    modelValue: {
      type: [Array, undefined] as PropType<string[] | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: [Array, undefined] as PropType<string[] | undefined>,
      default: undefined,
    },
  },
  emits: {
    ...accordionImplProps.emits,
    /**
   * The callback that fires when the state of the accordion changes.
   */
    // eslint-disable-next-line unused-imports/no-unused-vars
    valueChange: (value: string[]) => true,
  },
}
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
      modelValue: valueProp,
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
    const handleItemOpen = (itemValue: string) => {
      state.value.push(itemValue)
      updateValue(state.value)
    }
    const handleItemClose = (itemValue: string) => {
      const index = state.value.indexOf(itemValue)
      state.value.splice(index, 1)
      updateValue(state.value)
    }

    const forwardRef = useForwardRef()

    const _accordionMultipleProps = reactive(accordionMultipleProps)

    AccordionValueProvider({
      scope: props.scopeOkuAccordion,
      modelValue: computed(() => state.value),
      onItemOpen: handleItemOpen,
      onItemClose: handleItemClose,
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
