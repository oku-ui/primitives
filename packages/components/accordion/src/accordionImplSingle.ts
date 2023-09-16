import { type OkuElement, primitiveProps } from '@oku-ui/primitive'
import { type PropType, h, mergeProps } from 'vue'
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useControllable, useForwardRef } from '@oku-ui/use-composable'
import { type AccordionImplProps, OkuAccordionImpl } from './accordionImpl'
import { AccordionCollapsibleProvider, AccordionValueProvider, scopeAccordionProps } from './utils'

const ACCORDION_IMPL_SINGLE_NAME = 'OkuAccordionImplSingle'

export type AccordionImplSingleNativeElement = OkuElement<'div'>

export interface AccordionImplSingleProps extends AccordionImplProps {
  /**
   * The controlled stateful value of the accordion item whose content is expanded.
   */
  value?: string
  /**
   * The value of the item whose content is expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string

  /**
   * Whether an accordion item can be collapsed after it has been opened.
   * @default false
   */
  collapsible?: boolean
}
export interface AccordionImplSingleEmits {
  /**
   * The callback that fires when the state of the accordion changes.
   */

  valueChange: [value: string]
}

export const accordionSingleProps = {
  props: {

    modelValue: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    collapsible: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: false,
    },
  },
  emits: {
    /**
   * The callback that fires when the state of the accordion changes.
   */
    // eslint-disable-next-line unused-imports/no-unused-vars
    valueChange: (value: string) => true,
  },
}
const accordionImplSingle = defineComponent({
  name: ACCORDION_IMPL_SINGLE_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
    ...accordionSingleProps.props,
    ...scopeAccordionProps,
  },
  emits: accordionSingleProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      modelValue: valueProp,
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

    const _accordionSingleProps = reactive(accordionSingleProps)

    AccordionValueProvider({
      scope: props.scopeOkuAccordion,
      value: computed(() => state.value),
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
