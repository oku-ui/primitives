import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { computed, defineComponent, h, mergeProps, ref, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'

import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import { scopeToggleGroupProps } from './utils'
import { OkuToggleGroupItemImpl, type ToggleGroupItemImplElement, type ToggleGroupItemImplIntrinsicElement, type ToggleGroupItemImplProps, toggleGroupItemImplProps } from './ToggleGroupItemImpl'
import { useRovingFocusGroupScope, useToggleGroupInject, useToggleGroupValueInject } from './ToggleGroup'

export const TOGGLE_ITEM_NAME = 'OkuToggleGroupItem'

export type ToggleGroupItemIntrinsicElement = ToggleGroupItemImplIntrinsicElement
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
  inheritAttrs: false,
  props: {
    ...toggleGroupItemProps.props,
    ...scopeToggleGroupProps,
  },
  emits: toggleGroupItemProps.emits,
  setup(props, { slots, emit, attrs }) {
    const {
      value,
      disabled,
      scopeOkuToggleGroup,
    } = toRefs(props)
    const valueInject = useToggleGroupValueInject(TOGGLE_ITEM_NAME, props.scopeOkuToggleGroup)
    const inject = useToggleGroupInject(TOGGLE_ITEM_NAME, scopeOkuToggleGroup.value)
    const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuToggleGroup)
    const pressed = computed(() => valueInject?.value?.value.includes(value.value!))
    const _disabled = computed(() => inject.disabled.value || disabled.value)

    const forwardedRef = useForwardRef()
    const _ref = ref<HTMLDivElement | null>(null)

    return () => inject.rovingFocus.value
      ? h(OkuRovingFocusGroupItem, {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !_disabled.value,
        active: true,
        ref: _ref,
      }, {
        default: () => h(OkuToggleGroupItemImpl, {
          ...mergeProps(attrs, props),
          pressed: pressed.value,
          disabled: _disabled.value,
          ref: forwardedRef,
          onClick: (e) => {
            emit('click', e)
          },
        }, slots),
      })
      : h(OkuToggleGroupItemImpl, {
        ...mergeProps(attrs, props),
        ref: forwardedRef,
      }, slots)
  },
})

export const OkuToggleGroupItem = toggleGroupItem as typeof toggleGroupItem &
(new () => {
  $props: Partial<ToggleGroupItemElement>
})
