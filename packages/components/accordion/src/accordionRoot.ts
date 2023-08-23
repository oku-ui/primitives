import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import {
  type ComputedRef,
  type PropType,
  type Ref,
  computed,
  defineComponent,
  h,
  toRefs,
  useModel,
} from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { createProvideScope } from '@oku-ui/provide'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useDirection } from '@oku-ui/direction'
import { useControllable, useForwardRef } from '@oku-ui/use-composable'
import type { ScopeAccordion } from './utils'
import { scopeAccordionProps } from './utils'

type DataOrientation = 'vertical' | 'horizontal'
type Direction = 'ltr' | 'rtl'
type Type = 'single' | 'multiple'

export type AccordionElement = HTMLDivElement
export type AccordionIntrinsicElement = ElementType<'div'>

const ACCORDION_NAME = 'OkuAccordion' as const

interface AccordionRootProps extends PrimitiveProps {
  /**
   * Whether or not an accordion is disabled from user interaction.
   *
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * The layout in which the Accordion operates.
   * @default vertical
   */
  orientation?: DataOrientation
  /**
   * The language read direction.
   */
  dir?: Direction

  parentElement: Ref<HTMLElement | undefined>

  /**
   * The controlled stateful value of the accordion item whose content is expanded.
   */
  value?: string | string[]
  /**
   * The value of the item whose content is expanded when the accordion is initially rendered. Use
   * `defaultValue` if you do not need to control the state of an accordion.
   */
  defaultValue?: string | string[]
  /**
   * The callback that fires when the state of the accordion changes.
   */
  onValueChange?(value: string | string[]): void
  /**
   * Whether an accordion item can be collapsed after it has been opened.
   * @default false
   */
  collapsible?: boolean

  modelValue: Ref<string | string[] | undefined>

  isSingle: ComputedRef<boolean>

  type: Type
}

export interface AccordionProvideValue {
  disabled?: AccordionRootProps['disabled']
  dir?: Ref<AccordionRootProps['dir']>
  orientation: Ref<AccordionRootProps['orientation']>
  value: Ref<AccordionRootProps['value'] | undefined>
  onValueChange(value: string): void
  isSingle: ComputedRef<boolean>
  modelValue: Ref<string | undefined | string[]>
  collapsible: Ref<boolean | undefined>
}

export const [createAccordionProvider, _createAccordionProvider] = createProvideScope(
  ACCORDION_NAME,
  [createRovingFocusGroupScope],
)

export const [accordionProvider, useAccordionInject]
  = createAccordionProvider<AccordionProvideValue>(ACCORDION_NAME)

export const useRovingFocusGroupScope = createRovingFocusGroupScope()

const accordionRootProps = {
  dir: {
    type: String as PropType<Direction>,
    default: 'ltr',
  },
  orientation: {
    type: String as PropType<DataOrientation>,
    default: 'vertical',
  },
  disabled: {
    type: Boolean as PropType<AccordionRootProps['disabled']>,
    default: false,
  },
  collapsible: {
    type: Boolean as PropType<AccordionRootProps['collapsible']>,
    default: false,
  },
  defaultValue: {
    type: [String, Array] as PropType<
        | AccordionRootProps['defaultValue']>,
    default: undefined,
  },
  modelValue: {
    type: [String, Array] as PropType<
        AccordionRootProps['value']>,
    default: undefined,
  },
  type: {
    type: String as PropType<Type>,
    default: 'single',
  },
  asChild: {
    type: Boolean as PropType<AccordionRootProps['asChild']>,
    default: false,
  },
  onValueChange: {
    type: Function as PropType<(value: string) => void>,
    required: false,
  },
}

const accordion = defineComponent({
  name: ACCORDION_NAME,
  inheritAttrs: false,
  props: {
    ...accordionRootProps,
    ...primitiveProps,
    ...scopeAccordionProps,
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const { dir, orientation, collapsible, modelValue: valueProp, defaultValue, onValueChange } = toRefs(props)

    const direction = useDirection(dir.value)

    const forwardedRef = useForwardRef()

    const modelValue = useModel(props, 'modelValue')

    const { state, updateValue } = useControllable({
      prop: computed(() => modelValue.value ?? valueProp.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result: any) => {
        emit('update:modelValue', result)
        onValueChange.value?.(result)
      },
    })

    accordionProvider({
      dir: direction,
      scope: props.scopeOkuAccordion,
      orientation,
      collapsible,
      isSingle: computed(() => props.type === 'single'),
      modelValue,
      onValueChange: updateValue,
      value: state,
      disabled: props.disabled,
    })

    return () =>
      h(
        Primitive.div,
        {
          'dir': props.dir,
          'data-orientation': props.orientation,
          'asChild': props.asChild,
          ...attrs,
          'ref': forwardedRef,
        },
        { default: () => slots.default?.() },
      )
  },
})

const OkuAccordion = accordion as typeof accordion &
(new () => {
  $props: ScopeAccordion<Partial<AccordionElement>>
})

export { OkuAccordion }

export type { AccordionRootProps }
