import { primitiveProps } from '@oku-ui/primitive'
import { computed, defineComponent, h, mergeProps, ref, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'

import { OkuRovingFocusGroupItem } from '@oku-ui/roving-focus'
import type { ScopeToggleGroup } from './utils'
import { scopeToggleGroupProps } from './utils'
import { OkuToggleGroupItemImpl, type ToggleGroupItemImplElement, type ToggleGroupItemImplIntrinsicElement, type ToggleGroupItemImplProps, toggleGroupItemImplProps } from './ToggleGroupItemImpl'
import { useRovingFocusGroupScope, useToggleGroupInject, useToggleGroupValueInject } from './ToggleGroup'

export const TOGGLE_ITEM_NAME = 'OkuToggleGroupItem'

export type ToggleGroupItemIntrinsicElement = ToggleGroupItemImplIntrinsicElement
export type ToggleGroupItemElement = ToggleGroupItemImplElement

interface ToggleGroupItemProps extends Omit<ToggleGroupItemImplProps, 'pressed'> {

}

const { pressed, ...omitToggleGroupItemImplProps } = toggleGroupItemImplProps
const toggleGroupItemPropsObject = {
  ...omitToggleGroupItemImplProps,
}

const toggleGroupItem = defineComponent({
  name: TOGGLE_ITEM_NAME,
  inheritAttrs: false,
  props: {
    ...toggleGroupItemPropsObject,
    ...scopeToggleGroupProps,
    ...primitiveProps,
  },
  emits: {
    'update:modelValue': (value: string) => true,
    'valueChange': (value: string) => true,
  },
  setup(props, { slots, emit, attrs }) {
    const { value, disabled } = toRefs(props)
    const valueInject = useToggleGroupValueInject(TOGGLE_ITEM_NAME, props.scopeOkuToggleGroup)
    const inject = useToggleGroupInject(TOGGLE_ITEM_NAME, props.scopeOkuToggleGroup)
    const rovingFocusGroupScope = useRovingFocusGroupScope(props.scopeOkuToggleGroup)
    const pressed = computed(() => valueInject?.value?.value.includes(value.value!))
    const _disabled = computed(() => inject.disabled.value || disabled.value)

    const commonProps = computed(() => {
      return {
        ...mergeProps(attrs),
        value: value.value,
        pressed: pressed.value,
        disabled: _disabled.value,
        scopeOkuToggleGroup: props.scopeOkuToggleGroup,
      }
    })
    const forwardedRef = useForwardRef()
    const _ref = ref<HTMLDivElement | null>(null)

    return () => inject.rovingFocus.value
      ? h(OkuRovingFocusGroupItem, {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !_disabled.value,
        active: pressed.value,
        ref: _ref,
      }, {
        default: () => h(OkuToggleGroupItemImpl, {
          ...commonProps.value,
          ref: forwardedRef,
        }, slots),
      })
      : h(OkuToggleGroupItemImpl, {
        ...commonProps.value,
        ref: forwardedRef,
      }, slots)
  },
})

export const OkuToggleGroupItem = toggleGroupItem as typeof toggleGroupItem &
(new () => {
  $props: ScopeToggleGroup<Partial<ToggleGroupItemElement>>
})

export type { ToggleGroupItemProps }
