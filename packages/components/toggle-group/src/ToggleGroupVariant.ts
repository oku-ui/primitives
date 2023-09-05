import { computed, defineComponent, h, toRefs, useModel } from 'vue'
import type { PropType } from 'vue'
import { useControllable, useForwardRef } from '@oku-ui/use-composable'

import { scopeToggleGroupProps } from './utils'
import { OkuToggleGroupImpl, type ToggleGroupImplElement, type ToggleGroupImplNaviteElement, type ToggleGroupImplProps, toggleGroupImplProps } from './ToggleGroupImpl'
import { toggleGroupValueProvider } from './ToggleGroup'

const TOGGLE_GROUP_NAME = 'OkuToggleGroupImplSingle'

export type ToggleGroupVariantNaviteElement = ToggleGroupImplNaviteElement
export type ToggleGroupVariantElement = ToggleGroupImplElement

export interface ToggleGroupVariantProps extends ToggleGroupImplProps {
  type: 'single' | 'multiple'
  /**
   * The controlled stateful value of the item that is pressed.
   */
  value?: string | string[]
  /**
   * The value of the item that is pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string | string[]
}

export type ToggleGroupVariantEmits = {
  'update:modelValue': [value: string | string[]]
  /**
   * The callback that fires when the value of the toggle group changes.
   */
  'valueChange': [value: string | string[]]
}

export const toggleGroupVariantProps = {
  props: {
    type: {
      type: [String] as PropType<'single' | 'multiple'>,
      required: true,
    },
    modelValue: {
      type: [String, Array] as PropType<string | string[] | undefined>,
      default: undefined,
      required: false,
    },
    value: {
      type: [String, Array] as PropType<string | string[] | undefined>,
      default: undefined,
      required: false,
    },
    defaultValue: {
      type: [String, Array] as PropType<string | string[] | undefined>,
      default: undefined,
    },
    ...toggleGroupImplProps.props,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: string | string[]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'valueChange': (value: string | string[]) => true,
  },
}

const toggleGroupVariant = defineComponent({
  name: TOGGLE_GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...toggleGroupVariantProps.props,
    ...scopeToggleGroupProps,
  },
  emits: toggleGroupVariantProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      value: valueProp,
      defaultValue,
      type,
      dir,
      disabled,
      loop,
      asChild,
      orientation,
      rovingFocus,
    } = toRefs(props)
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
      onChange: (result: any) => {
        emit('update:modelValue', result)
        emit('valueChange', result)
      },
    })

    const handleButtonActivate = (itemValue: string) => {
      if (type.value === 'multiple')
        updateValue([...state.value || [], itemValue])
      else
        updateValue(itemValue)
    }

    const handleButtonDeactivate = (itemValue: string) => {
      if (type.value === 'multiple' && typeof state.value === 'object')
        updateValue(state.value?.filter(value => value !== itemValue))
      else
        updateValue('')
    }

    toggleGroupValueProvider({
      scope: props.scopeOkuToggleGroup,
      value: computed(() => {
        if (type.value === 'single' && typeof state.value === 'string')
          return state.value ? [state.value] : []
        else if (typeof state.value === 'object')
          return state.value || []
        else
          return []
      }),
      onItemActivate: (value: string) => {
        handleButtonActivate(value)
      },
      onItemDeactivate: (value: string) => {
        if (type.value === 'single')
          handleButtonDeactivate('')
        else if (type.value === 'multiple')
          handleButtonDeactivate(value)
      },
      type: computed(() => type.value || 'single'),
    })

    return () => h(OkuToggleGroupImpl, {
      ...attrs,
      dir: dir.value,
      disabled: disabled.value,
      loop: loop.value,
      asChild: asChild.value,
      orientation: orientation.value,
      rovingFocus: rovingFocus.value,
      scopeOkuToggleGroup: props.scopeOkuToggleGroup,
      ref: forwardedRef,
    }, slots)
  },
})

export const OkuToggleGroupVariant = toggleGroupVariant as typeof toggleGroupVariant &
(new () => {
  $props: ToggleGroupVariantNaviteElement
})
