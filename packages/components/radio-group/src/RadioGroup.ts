import type { ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { computed, defineComponent, h, toRefs, useModel } from 'vue'
import type { ComputedRef, PropType } from 'vue'
import { createProvideScope } from '@oku-ui/provide'
import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import { useControllable, useForwardRef, useId } from '@oku-ui/use-composable'
import { useDirection } from '@oku-ui/direction'

const TAB_NAME = 'OkuRadioGroup' as const

type TabsElement = ElementType<'div'>
export type _TabsEl = HTMLDivElement

interface RadioGroupProvideValue {
  name?: string
  required: boolean
  disabled: boolean
  value?: ComputedRef<string | undefined>
  onValueChange(value: string): void
}

interface TabsProps extends ScopedPropsInterface<IPrimitiveProps> {
  name?: RadioGroupProvideValue['name']
  required?: Radix.ComponentPropsWithoutRef<typeof Radio>['required']
  disabled?: Radix.ComponentPropsWithoutRef<typeof Radio>['disabled']
  dir?: RovingFocusGroupProps['dir']
  orientation?: RovingFocusGroupProps['orientation']
  loop?: RovingFocusGroupProps['loop']
  defaultValue?: string
  value?: RadioGroupContextValue['value']
  onValueChange?: RadioGroupContextValue['onValueChange']
}

export const [createTabsProvider, _createTabsScope] = createProvideScope(TAB_NAME, [
  createRovingFocusGroupScope,
])

export const [TabsProvider, useTabsInject]
  = createTabsProvider<RadioGroupProvideValue>(TAB_NAME)

export const useRovingFocusGroupScope = createRovingFocusGroupScope()

const Tabs = defineComponent({
  name: TAB_NAME,
  inheritAttrs: false,
  props: {
    value: {
      type: String as PropType<string>,
      required: false,
    },
    defaultValue: {
      type: String as PropType<string>,
      default: undefined,
    },
    orientation: {
      type: String as PropType<Orientation>,
      default: 'horizontal',
    },
    dir: {
      type: String as PropType<Direction>,
      default: 'ltr',
      required: false,
    },
    activationMode: {
      type: String as PropType<ActivationMode>,
      default: 'automatic',
      required: false,
    },
    modelValue: {
      type: String as PropType<string>,
      required: false,
    },
    onValueChange: {
      type: Function as PropType<(value: string) => void>,
      required: false,
    },
    asChild: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    ...ScopedProps,
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const {
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation,
      dir,
      activationMode,
    } = toRefs(props)

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

    TabsProvider({
      onValueChange: updateValue,
      orientation: orientation.value,
      dir: direction,
      value: state,
      activationMode: activationMode.value,
      baseId: useId(),
      scope: props.scopeTabs,
    })

    return () =>
      h(
        Primitive.div,
        {
          'dir': direction,
          'data-orientation': props.orientation,
          'ref': forwardedRef,
          ...attrs,
          'asChild': props.asChild,
        }, slots,
      )
  },
})

type _TabsProps = MergeProps<TabsProps, TabsElement>
export type IstanceTabsType = InstanceTypeRef<typeof Tabs, _TabsEl>

const OkuTabs = Tabs as typeof Tabs & (new () => { $props: _TabsProps })

export { OkuTabs }

export type { TabsProps }
