import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { PropType } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
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
    ...propsOmit(toggleProps.emits, ['pressedChange']),
  },
}

const toggleGroupItemImpl = defineComponent({
  name: TOGGLE_GROUP_NAME,
  components: {
    OkuToggle,
  },
  inheritAttrs: false,
  props: {
    ...toggleGroupItemImplProps.props,
    ...scopeToggleGroupProps,
  },
  emits: toggleGroupItemImplProps.emits,
  setup(props, { slots, attrs }) {
    const { scopeOkuToggleGroup, value, ...itemProps } = toRefs(props)
    const _reactive = reactive(itemProps)
    const reactiveItemProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const valueInject = useToggleGroupValueInject(TOGGLE_ITEM_NAME, scopeOkuToggleGroup.value)
    const singleProps = computed(() => {
      return { 'role': 'radio', 'ariaChecked': itemProps.pressed.value, 'aria-pressed': undefined } as ToggleElementNaviteElement
    })
    const typeProps = computed(() => valueInject.type === 'single' ? singleProps.value : undefined)

    const forwardedRef = useForwardRef()
    return () =>
      h(OkuToggle, {
        ...typeProps.value,
        ...mergeProps(attrs, reactiveItemProps),
        ref: forwardedRef,
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
