import { computed, defineComponent, h, mergeProps, ref, toRefs, useModel } from 'vue'
import type { PropType } from 'vue'
import { useControllable, useForwardRef } from '@oku-ui/use-composable'

import type { ScopeToggleGroup } from './utils'
import { scopeToggleGroupProps } from './utils'
import { OkuToggleGroupImpl, type ToggleGroupImplElement, type ToggleGroupImplIntrinsicElement, type ToggleGroupImplProps, toggleGroupImplProps } from './ToggleGroupImpl'
import { toggleGroupValueProvider } from './ToggleGroup'

const TOGGLE_GROUP_NAME = 'OkuToggleGroupImplMultiple'

export type ToggleGroupImplMultipleIntrinsicElement = ToggleGroupImplIntrinsicElement
export type ToggleGroupImplMultipleElement = ToggleGroupImplElement

export interface ToggleGroupImplMultipleProps extends ToggleGroupImplProps {
  /**
   * The controlled stateful value of the items that are pressed.
   */
  value?: string[]
  /**
   * The value of the items that are pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string[]
  /**
   * The callback that fires when the state of the toggle group changes.
   */
  onValueChange?(value: string[]): void
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
  setup(props, { emit, attrs, slots }) {
    const {
      value: valueProp,
      defaultValue, dir, disabled,
      loop, orientation, rovingFocus,
    } = toRefs(props)
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
      initialValue: [],
    })

    const handleButtonActivate = (itemValue: string) => {
      updateValue([...state.value || [], itemValue])
    }

    const handleButtonDeactivate = (itemValue: string) => {
      updateValue(state.value?.filter(value => value !== itemValue))
    }

    toggleGroupValueProvider({
      value: computed(() => state.value || []),
      onItemDeactivate: handleButtonDeactivate,
      onItemActivate: handleButtonActivate,
      scope: props.scopeOkuToggleGroup,
      type: ref('multiple'),
    })

    return () => h(OkuToggleGroupImpl, {
      ...mergeProps(attrs),
      asChild: props.asChild,
      dir: dir.value,
      disabled: disabled.value,
      loop: loop.value,
      orientation: orientation.value,
      ref: forwardedRef,
      rovingFocus: rovingFocus.value,
    }, slots)
  },
})

export const OkuToggleGroupImplMultiple = toggleGroupImplMultiple as typeof toggleGroupImplMultiple &
(new () => {
  $props: ScopeToggleGroup<Partial<ToggleGroupImplMultipleElement>>
})
