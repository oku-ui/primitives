import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import type { PropType, Ref } from 'vue'
import { createProvideScope } from '@oku-ui/provide'
import { OkuRovingFocusGroup, createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import { reactiveOmit, useControllable, useForwardRef } from '@oku-ui/use-composable'
import { useDirection } from '@oku-ui/direction'
import type { RovingFocusGroupProps } from '@oku-ui/roving-focus'

import { type RadioProps, createRadioScope } from './Radio'
import { scopeRadioGroupProps } from './utils'

const RADIO_GROUP_NAME = 'OkuRadioGroup'

export const [createRadioGroupProvider, createRadioGroupScope] = createProvideScope(RADIO_GROUP_NAME, [
  createRovingFocusGroupScope,
  createRadioScope,
])

export const [RadioGroupProvider, useRadioGroupInject]
  = createRadioGroupProvider<RadioGroupProvideValue>(RADIO_GROUP_NAME)

export const useRovingFocusGroupScope = createRovingFocusGroupScope()

export type RadioGroupNaviteElement = OkuElement<'div'>
export type RadioElement = HTMLDivElement

export interface RadioGroupProvideValue {
  name?: Ref<string | undefined>
  required: Ref<boolean>
  disabled: Ref<boolean>
  value?: Ref<string | undefined>
  onValueChange: (value: string) => void
}

export type RadioGroupEmits = {
  'update:modelValue': [value: string | undefined]
  valueChange: [value: string | undefined]
}

export interface RadioGroupProps extends PrimitiveProps {
  modelValue?: string | undefined
  name?: RadioGroupProvideValue['name']
  required?: RadioProps['required']
  disabled?: RadioProps['disabled']
  dir?: RovingFocusGroupProps['dir']
  orientation?: RovingFocusGroupProps['orientation']
  loop?: RovingFocusGroupProps['loop']
  defaultValue?: string
  value?: RadioGroupProvideValue['value']
}

export const radioGroupProps = {
  props: {
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
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: string) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'valueChange': (value: string) => true,
  },
}

const radioGroup = defineComponent({
  name: RADIO_GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...radioGroupProps.props,
    ...scopeRadioGroupProps,
  },
  emits: radioGroupProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      scopeOkuRadioGroup,
      name,
      defaultValue,
      value: valueProp,
      required,
      disabled,
      orientation,
      dir,
      loop,
      ...groupProps
    } = toRefs(props)
    const _reactive = reactive(groupProps)
    const reactiveGroupProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const rovingFocusGroupScope = useRovingFocusGroupScope(scopeOkuRadioGroup.value)
    const direction = useDirection(dir.value)

    const forwardedRef = useForwardRef()
    const modelValue = useModel(props, 'modelValue')
    const proxyValue = computed(() => {
      if (modelValue.value !== undefined)
        return modelValue.value
      if (valueProp.value !== undefined)
        return valueProp.value
      return undefined
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyValue.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result) => {
        emit('valueChange', result)
        modelValue.value = result
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
          'data-disabled': disabled.value ? '' : undefined,
          'dir': direction.value,
          ...mergeProps(attrs, reactiveGroupProps),
          'ref': forwardedRef,
        }, {
          default: () => slots.default?.(),
        }),
      })
  },
})

export const OkuRadioGroup = radioGroup as typeof radioGroup &
(new () => {
  $props: RadioGroupNaviteElement
})
