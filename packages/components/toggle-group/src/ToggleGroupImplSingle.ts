import { computed, defineComponent, h, mergeProps, ref, toRefs, useModel } from 'vue'
import type { PropType } from 'vue'
import { useControllable, useForwardRef } from '@oku-ui/use-composable'

import type { ScopeToggleGroup } from './utils'
import { scopeToggleGroupProps } from './utils'
import { OkuToggleGroupImpl, type ToggleGroupImplElement, type ToggleGroupImplIntrinsicElement, type ToggleGroupImplProps, toggleGroupImplProps } from './ToggleGroupImpl'
import { toggleGroupValueProvider } from './ToggleGroup'

const TOGGLE_GROUP_NAME = 'OkuToggleGroupImplSingle'

export type ToggleGroupImplSingleIntrinsicElement = ToggleGroupImplIntrinsicElement
export type ToggleGroupImplSingleElement = ToggleGroupImplElement

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

export type ToggleGroupImplSingleEmits = {
  'update:modelValue': [value: string]
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
      required: false,
    },
    value: {
      type: [String] as PropType<string | undefined>,
      default: undefined,
      required: false,
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

const toggleGroupImplSingle = defineComponent({
  name: TOGGLE_GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...toggleGroupImplSingleProps.props,
    ...scopeToggleGroupProps,
  },
  emits: toggleGroupImplSingleProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      dir,
      disabled,
      loop,
      orientation,
      rovingFocus,
      value: valueProp,
      defaultValue,

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

    toggleGroupValueProvider({
      scope: props.scopeOkuToggleGroup,
      value: computed(() => state.value ? [state.value] : []),
      onItemActivate: (value: string) => {
        updateValue(value)
      },
      onItemDeactivate: () => {
        updateValue('')
      },
      type: ref('single'),
    })

    return () => h(OkuToggleGroupImpl, {
      ...mergeProps(attrs),
      dir: dir.value,
      disabled: disabled.value,
      loop: loop.value,
      orientation: orientation.value,
      rovingFocus: rovingFocus.value,
      scopeOkuToggleGroup: props.scopeOkuToggleGroup,
      ref: forwardedRef,
    }, slots)
  },
})

export const OkuToggleGroupImplSingle = toggleGroupImplSingle as typeof toggleGroupImplSingle &
(new () => {
  $props: ScopeToggleGroup<Partial<ToggleGroupImplSingleElement>>
})
