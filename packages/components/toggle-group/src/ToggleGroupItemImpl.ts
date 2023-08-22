import type { ElementType } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, toRefs } from 'vue'
import type { PropType } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuToggle, toggleProps } from '@oku-ui/toggle'
import type { ToggleProps } from '@oku-ui/toggle'

import type { ScopeToggleGroup } from './utils'
import { scopeToggleGroupProps } from './utils'
import { useToggleGroupValueInject } from './ToggleGroup'
import { TOGGLE_ITEM_NAME } from './ToggleGroupItem'

const TOGGLE_GROUP_NAME = 'OkuToggleGroupItemImpl'

export type ToggleGroupItemImplIntrinsicElement = ElementType<'div'>
export type ToggleGroupItemImplElement = HTMLDivElement

interface ToggleGroupItemImplProps extends Omit<ToggleProps, 'defaultPressed' | 'onPressedChange'> {
  /**
   * A string value for the toggle group item. All items within a toggle group should use a unique value.
   */
  value: string
}

const { defaultPressed, modelValue, ...omitToggleProps } = toggleProps

export const toggleGroupItemImplProps = {
  /**
   * A string value for the toggle group item. All items within a toggle group should use a unique value.
  */
  value: {
    type: [String] as PropType<string>,
    required: true,
  },
  ...omitToggleProps,
}

const toggleGroupItemImpl = defineComponent({
  name: TOGGLE_GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...toggleGroupItemImplProps,
    ...scopeToggleGroupProps,
    ...primitiveProps,
  },
  emits: {
    pressedChange: (value: boolean) => true,
  },
  setup(props, { slots, emit, attrs }) {
    const { pressed, disabled, value } = toRefs(props)
    const valueInject = useToggleGroupValueInject(TOGGLE_ITEM_NAME, props.scopeOkuToggleGroup)
    const singleProps = computed(() => {
      return { 'role': 'radio', 'aria-checked': pressed.value, 'aria-pressed': undefined }
    })
    const typeProps = computed(() => valueInject.type.value === 'single' ? singleProps.value : undefined)

    const forwardedRef = useForwardRef()

    return () => h(OkuToggle, {
      ...typeProps.value,
      ...attrs,
      disabled: disabled.value,
      ref: forwardedRef,
      onPressedChange: (pressed: boolean) => {
        if (pressed)
          valueInject.onItemActivate(value.value!)

        else
          valueInject.onItemDeactivate(value.value!)
      },
    })
  },
})

export const OkuToggleGroupItemImpl = toggleGroupItemImpl as typeof toggleGroupItemImpl &
(new () => {
  $props: ScopeToggleGroup<Partial<ToggleGroupItemImplElement>>
})

export type { ToggleGroupItemImplProps }
