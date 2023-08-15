import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { Primitive, PrimitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, toRefs, useModel } from 'vue'
import type { ComputedRef, PropType, Ref } from 'vue'
import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import { OkuRovingFocusGroup, createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import { useControllable, useForwardRef } from '@oku-ui/use-composable'
import { useDirection } from '@oku-ui/direction'
import type { RovingFocusGroupPropsType } from '@oku-ui/roving-focus'

import { type RadioProps, createRadioScope } from './Radio'

const RADIO_GROUP_NAME = 'OkuRadioGroup'

export type ScopedRadioGroupType<P> = P & { scopeRadioGroup?: Scope }
export const scopedRadioGroupProps = {
  scopeRadioGroup: {
    ...ScopePropObject,
  },
}

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

interface RadioGroupProps extends ScopedRadioGroupType<IPrimitiveProps> {
  name?: RadioGroupProvideValue['name']
  required?: RadioProps['required']
  disabled?: RadioProps['disabled']
  dir?: RovingFocusGroupPropsType['dir']
  orientation?: RovingFocusGroupPropsType['orientation']
  loop?: RovingFocusGroupPropsType['loop']
  defaultValue?: string
  value?: RadioGroupProvideValue['value']
  onValueChange?: RadioGroupProvideValue['onValueChange']
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
    type: String as PropType<RovingFocusGroupPropsType['dir']>,
    default: undefined,
  },
  orientation: {
    type: String as PropType<RovingFocusGroupPropsType['orientation']>,
    default: undefined,
  },
  loop: {
    type: Boolean as PropType<RovingFocusGroupPropsType['loop']>,
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
  onValueChange: {
    type: Function as PropType<(value: string) => void>,
    default: undefined,
  },
  ...scopedRadioGroupProps,
  ...PrimitiveProps,
}

const RadioGroup = defineComponent({
  name: RADIO_GROUP_NAME,
  inheritAttrs: false,
  props: RadioGroupPropsObject,
  emits: ['update:modelValue'],
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
      onValueChange,
    } = toRefs(props)

    const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeRadioGroup)
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

    RadioGroupProvider({
      scope: props.scopeRadioGroup,
      name,
      required,
      disabled,
      value: state,
      onValueChange: updateValue,
    })

    return () =>
      h(OkuRovingFocusGroup, {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: orientation.value,
        dir: direction,
        loop: loop.value,
      }, {
        default: () => h(Primitive.div, {
          'role': 'radiogroup',
          'aria-required': required.value,
          'aria-oriented': orientation.value,
          'data-disabled': disabled.value,
          'dir': direction,
          ...attrs,
          'ref': forwardedRef,
        }, {
          default: () => slots.default?.(),
        }),
      })
  },
})

type _RadioGroupProps = MergeProps<RadioGroupProps, Partial<RadioGroupIntrinsicElement>>
export type IstanceRadioGroupType = InstanceTypeRef<typeof RadioGroup, RadioElement>

const OkuRadioGroup = RadioGroup as typeof RadioGroup & (new () => { $props: _RadioGroupProps })

export { OkuRadioGroup }

export type { RadioGroupProps }
