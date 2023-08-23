import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, mergeProps, toRefs, useModel } from 'vue'
import type { ComputedRef, PropType, Ref } from 'vue'
import { createProvideScope } from '@oku-ui/provide'
import { OkuRovingFocusGroup, createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import { useControllable, useForwardRef } from '@oku-ui/use-composable'
import { useDirection } from '@oku-ui/direction'
import type { RovingFocusGroupProps } from '@oku-ui/roving-focus'

import { type RadioProps, createRadioScope } from './Radio'
import type { ScopeRadioGroup } from './utils'
import { scopeRadioGroupProps } from './utils'

const RADIO_GROUP_NAME = 'OkuRadioGroup'

export const [createRadioGroupProvider, createRadioGroupScope] = createProvideScope(RADIO_GROUP_NAME, [
  createRovingFocusGroupScope,
  createRadioScope,
])

export const [RadioGroupProvider, useRadioGroupInject]
  = createRadioGroupProvider<RadioGroupProvideValue>(RADIO_GROUP_NAME)

export const useRovingFocusGroupScope = createRovingFocusGroupScope()

export type RadioGroupIntrinsicElement = ElementType<'div'>
export type RadioElement = HTMLDivElement

interface RadioGroupProvideValue {
  name?: Ref<string | undefined>
  required: Ref<boolean>
  disabled: Ref<boolean>
  value?: ComputedRef<string | undefined>
  onValueChange(value: string): void
}

interface RadioGroupProps extends PrimitiveProps {
  name?: RadioGroupProvideValue['name']
  required?: RadioProps['required']
  disabled?: RadioProps['disabled']
  dir?: RovingFocusGroupProps['dir']
  orientation?: RovingFocusGroupProps['orientation']
  loop?: RovingFocusGroupProps['loop']
  defaultValue?: string
  value?: RadioGroupProvideValue['value']
}

const RadioGroupPropsObject = {
  modelValue: {
    type: [String] as PropType<
      string | undefined
    >,
    default: undefined,
  },
  name: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  required: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  dir: {
    type: String as PropType<RovingFocusGroupProps['dir']>,
    default: undefined,
  },
  orientation: {
    type: String as PropType<RovingFocusGroupProps['orientation']>,
    default: undefined,
  },
  loop: {
    type: Boolean as PropType<RovingFocusGroupProps['loop']>,
    default: true,
  },
  defaultValue: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  value: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
}

const RadioGroup = defineComponent({
  name: RADIO_GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...RadioGroupPropsObject,
    ...scopeRadioGroupProps,
    ...primitiveProps,
  },
  emits: {
    'update:modelValue': (value: string) => true,
    'valueChange': (value: string) => true,
  },
  setup(props, { slots, emit, attrs }) {
    const {
      name,
      defaultValue,
      value: valueProp,
      required,
      disabled,
      orientation,
      dir,
      loop,
    } = toRefs(props)

    const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuRadioGroup)
    const direction = useDirection(dir.value)

    const forwardedRef = useForwardRef()
    const modelValue = useModel(props, 'modelValue')
    const proxyChecked = computed({
      get: () => modelValue.value !== undefined ? modelValue.value : valueProp.value !== undefined ? valueProp.value : undefined,
      set: () => {
      },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result: any) => {
        emit('update:modelValue', result)
        emit('valueChange', result)
      },
    })

    RadioGroupProvider({
      scope: props.scopeOkuRadioGroup,
      name,
      required,
      disabled,
      value: state,
      onValueChange(value: string) {
        updateValue(value)
      },
    })

    return () =>
      h(OkuRovingFocusGroup, {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: orientation.value,
        dir: direction.value,
        loop: loop.value,
      }, {
        default: () => h(Primitive.div, {
          'role': 'radiogroup',
          'aria-required': required.value,
          'aria-oriented': orientation.value,
          'data-disabled': disabled.value,
          'dir': direction.value,
          ...mergeProps(attrs),
          'asChild': props.asChild,
          'ref': forwardedRef,
        }, {
          default: () => slots.default?.(),
        }),
      })
  },
})

export const OkuRadioGroup = RadioGroup as typeof RadioGroup &
(new () => {
  $props: ScopeRadioGroup<Partial<RadioElement>>
})

export type { RadioGroupProps }
