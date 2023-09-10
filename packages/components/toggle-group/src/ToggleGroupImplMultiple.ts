import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import type { PropType } from 'vue'
import { reactiveOmit, useControllable, useForwardRef } from '@oku-ui/use-composable'

import { scopeToggleGroupProps } from './utils'
import { OkuToggleGroupImpl, type ToggleGroupImplElement, type ToggleGroupImplNaviteElement, type ToggleGroupImplProps, toggleGroupImplProps } from './ToggleGroupImpl'
import { toggleGroupValueProvider } from './ToggleGroup'

const TOGGLE_GROUP_NAME = 'OkuToggleGroupImplSingle'

export type ToggleGroupVariantNaviteElement = ToggleGroupImplNaviteElement
export type ToggleGroupVariantElement = ToggleGroupImplElement

export interface ToggleGroupImplMultipleProps extends ToggleGroupImplProps {
  /**
   * The controlled stateful value of the item that is pressed.
   */
  value?: string[]
  /**
   * The value of the item that is pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string[]
}

export type ToggleGroupVariantEmits = {
  'update:modelValue': [value: string[]]
  /**
   * The callback that fires when the value of the toggle group changes.
   */
  'valueChange': [value: string[]]
}

export const toggleGroupImplMultipleProps = {
  props: {
    modelValue: {
      type: [Array] as PropType<string[] | undefined>,
      default: undefined,
    },
    value: {
      type: [Array] as PropType<string[] | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: [Array] as PropType<string[] | undefined>,
      default: undefined,
    },
    ...toggleGroupImplProps.props,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: string[]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'valueChange': (value: string[]) => true,
  },
}

const toggleGroupImplMultiple = defineComponent({
  name: TOGGLE_GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...toggleGroupImplMultipleProps.props,
    ...scopeToggleGroupProps,
  },
  emits: toggleGroupImplMultipleProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      modelValue: _modelValue,
      value: valueProp,
      defaultValue,
      ...toggleGroupMultipleProps
    } = toRefs(props)
    const _reactive = reactive(toggleGroupMultipleProps)
    const reactiveGroupMultipleProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const modelValue = useModel(props, 'modelValue')
    const proxyChecked = computed({
      get: () => modelValue.value !== undefined
        ? modelValue.value
        : valueProp.value !== undefined ? valueProp.value : undefined,
      set: () => {
      },
    })

    const { state, updateValue } = useControllable<Array<string>>({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result: any) => {
        emit('valueChange', result)
        modelValue.value = result
      },
      initialValue: [],
    })

    const handleButtonActivate = (itemValue: string) => {
      updateValue([...state.value, itemValue])
    }

    const handleButtonDeactivate = (itemValue: string) => {
      updateValue(state.value.filter(value => value !== itemValue))
    }

    toggleGroupValueProvider({
      scope: props.scopeOkuToggleGroup,
      value: state,
      onItemActivate: handleButtonActivate,
      onItemDeactivate: handleButtonDeactivate,
      type: 'multiple',
    })

    return () => h(OkuToggleGroupImpl, {
      ...mergeProps(attrs, reactiveGroupMultipleProps),
      ref: forwardedRef,
    }, slots)
  },
})

export const OkuToggleGroupImplMultiple = toggleGroupImplMultiple as typeof toggleGroupImplMultiple &
(new () => {
  $props: ToggleGroupVariantNaviteElement
})
