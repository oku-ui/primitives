import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import type { PropType } from 'vue'
import { useControllable, useForwardRef } from '@oku-ui/use-composable'

import { scopeToggleGroupProps } from './utils'
import { OkuToggleGroupImpl, type ToggleGroupImplElement, type ToggleGroupImplNaviteElement, type ToggleGroupImplProps, toggleGroupImplProps } from './ToggleGroupImpl'
import { toggleGroupValueProvider } from './ToggleGroup'

const TOGGLE_GROUP_NAME = 'OkuToggleGroupImplSingle'

export type ToggleGroupVariantNaviteElement = ToggleGroupImplNaviteElement
export type ToggleGroupVariantElement = ToggleGroupImplElement

export interface ToggleGroupImplSingleProps extends ToggleGroupImplProps {
  /**
   * The controlled stateful value of the item that is pressed.
   */
  value?: string
  /**
   * The value of the item that is pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string
}

export type ToggleGroupVariantEmits = {
  /**
   * The callback that fires when the value of the toggle group changes.
   */
  'valueChange': [value: string]
}

export const toggleGroupImplSingleProps = {
  props: {
    modelValue: {
      type: [String] as PropType<string | undefined>,
      default: undefined,
    },
    value: {
      type: [String] as PropType<string | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: [String] as PropType<string | undefined>,
      default: undefined,
    },
    ...toggleGroupImplProps.props,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: string) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'valueChange': (value: string) => true,
  },
}

const groupImplSingle = defineComponent({
  name: TOGGLE_GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...toggleGroupImplSingleProps.props,
    ...scopeToggleGroupProps,
  },
  emits: toggleGroupImplSingleProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      value: valueProp,
      defaultValue,
      onValueChange: _onValueChange,
      ...toggleGroupVariant
    } = toRefs(props)
    const reactiveToggleGroupVariant = reactive(toggleGroupVariant)
    const forwardedRef = useForwardRef()

    const modelValue = useModel(props, 'modelValue')

    const proxyChecked = computed({
      get: () => modelValue.value !== undefined
        ? modelValue.value
        : valueProp.value !== undefined ? valueProp.value : undefined,
      set: () => {
      },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result) => {
        emit('valueChange', result)
        modelValue.value = result
      },
    })

    toggleGroupValueProvider({
      scope: props.scopeOkuToggleGroup,
      value: computed(() => state.value ? [state.value] : []),
      onItemActivate: (value: string) => {
        updateValue(value)
      },
      onItemDeactivate: () => {
        updateValue('')
      },
      type: 'single',
    })

    return () => h(OkuToggleGroupImpl, {
      ...mergeProps(attrs, reactiveToggleGroupVariant),
      ref: forwardedRef,
    }, slots)
  },
})

export const OkuToggleGroupImplSingle = groupImplSingle as typeof groupImplSingle &
(new () => {
  $props: ToggleGroupVariantNaviteElement
})
