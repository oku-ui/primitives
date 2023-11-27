import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { computed, defineComponent, h, mergeProps, reactive, ref } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'

import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { scopeToggleGroupProps } from './utils'
import { OkuToggleGroupItemImpl, type ToggleGroupItemImplElement, type ToggleGroupItemImplNaviteElement, type ToggleGroupItemImplProps, toggleGroupItemImplProps } from './ToggleGroupItemImpl'
import { useRovingFocusGroupScope, useToggleGroupInject, useToggleGroupValueInject } from './ToggleGroup'

export const TOGGLE_ITEM_NAME = 'OkuToggleGroupItem'

export type ToggleGroupItemNaviteElement = ToggleGroupItemImplNaviteElement
export type ToggleGroupItemElement = ToggleGroupItemImplElement

export interface ToggleGroupItemProps extends Omit<ToggleGroupItemImplProps, 'pressed'> {

}

export const toggleGroupItemProps = {
  props: {
    ...propsOmit(toggleGroupItemImplProps.props, ['pressed']),
    ...primitiveProps,
  },
  emits: {
    ...toggleGroupItemImplProps.emits,
  },
}

const toggleGroupItem = defineComponent({
  name: TOGGLE_ITEM_NAME,
  components: {
    OkuToggleGroupItemImpl,
    OkuRovingFocusGroupItem,
  },
  inheritAttrs: false,
  props: {
    ...toggleGroupItemProps.props,
    ...scopeToggleGroupProps,
  },
  emits: toggleGroupItemProps.emits,
  setup(props, { slots, attrs }) {
    const _reactive = reactive(props)
    const reactiveGroupProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const valueInject = useToggleGroupValueInject(TOGGLE_ITEM_NAME, props.scopeOkuToggleGroup)
    const inject = useToggleGroupInject(TOGGLE_ITEM_NAME, props.scopeOkuToggleGroup)
    const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuToggleGroup)
    const pressed = computed(() => valueInject?.value.value.includes(props.value!))
    const disable = computed(() => inject.disabled.value || props.disabled)

    const forwardedRef = useForwardRef()
    const _ref = ref<HTMLDivElement | null>(null)

    return () => inject.rovingFocus.value
      ? h(OkuRovingFocusGroupItem, {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disable.value,
        active: pressed.value,
        ref: _ref,
      }, {
        default: () => h(OkuToggleGroupItemImpl, {
          ...mergeProps(attrs, reactiveGroupProps),
          pressed: pressed.value,
          disabled: disable.value,
          ref: forwardedRef,
        }, slots),
      })
      : h(OkuToggleGroupItemImpl, {
        ...mergeProps(attrs, reactiveGroupProps),
        pressed: pressed.value,
        disabled: disable.value,
        ref: forwardedRef,
      }, slots)
  },
})

export const OkuToggleGroupItem = toggleGroupItem as typeof toggleGroupItem &
  (new () => {
    $props: ToggleGroupItemNaviteElement
  })
