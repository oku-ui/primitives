import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { computed, defineComponent, h, toRefs } from 'vue'
import type { PropType } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuToggle, toggleProps } from '@oku-ui/toggle'
import type { ToggleElement, ToggleElementNaviteElement, ToggleEmits, ToggleProps } from '@oku-ui/toggle'

import { scopeToggleGroupProps } from './utils'
import { useToggleGroupValueInject } from './ToggleGroup'
import { TOGGLE_ITEM_NAME } from './ToggleGroupItem'

const TOGGLE_GROUP_NAME = 'OkuToggleGroupItemImpl'

export type ToggleGroupItemImplNaviteElement = ToggleElementNaviteElement
export type ToggleGroupItemImplElement = ToggleElement

interface ToggleGroupItemImplProps extends Omit<ToggleProps, 'defaultPressed' | 'onPressedChange'> {
  /**
   * A string value for the toggle group item. All items within a toggle group should use a unique value.
   */
  value: string
}

export type ToggleGroupItemImplEmits = Omit<ToggleEmits, 'update:modelValue' | 'pressedChange'>

export const toggleGroupItemImplProps = {
  props: {
    /**
    * A string value for the toggle group item. All items within a toggle group should use a unique value.
   */
    value: {
      type: [String] as PropType<string>,
      required: true,
    },
    ...propsOmit(toggleProps.props, ['defaultPressed']),
    ...primitiveProps,
  },
  emits: {
    ...propsOmit(toggleProps.emits, ['update:modelValue', 'pressedChange']),
  },
}

const toggleGroupItemImpl = defineComponent({
  name: TOGGLE_GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...toggleGroupItemImplProps.props,
    ...scopeToggleGroupProps,
  },
  emits: toggleGroupItemImplProps.emits,
  setup(props, { slots, emit, attrs }) {
    const { pressed, disabled, value, scopeOkuToggleGroup, asChild } = toRefs(props)
    const valueInject = useToggleGroupValueInject(TOGGLE_ITEM_NAME, scopeOkuToggleGroup.value)
    const singleProps = computed(() => {
      return { 'role': 'radio', 'ariaChecked': pressed.value, 'aria-pressed': undefined } as ToggleElementNaviteElement
    })
    const typeProps = computed(() => valueInject.type.value === 'single' ? singleProps.value : undefined)

    const forwardedRef = useForwardRef()

    return () => h(OkuToggle, {
      ...attrs,
      ...typeProps.value as any,
      pressed: pressed.value,
      disabled: disabled.value,
      asChild: asChild.value,
      ref: forwardedRef,
      onClick: (e: ToggleEmits['click'][0]) => {
        emit('click', e)
      },
      onPressedChange: (pressed: boolean) => {
        if (pressed)
          valueInject.onItemActivate(value.value!)

        else
          valueInject.onItemDeactivate(value.value!)
      },
    }, slots)
  },
})

export const OkuToggleGroupItemImpl = toggleGroupItemImpl as typeof toggleGroupItemImpl &
(new () => {
  $props: ToggleGroupItemImplNaviteElement
})

export type { ToggleGroupItemImplProps }
