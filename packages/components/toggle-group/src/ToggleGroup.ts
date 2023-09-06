import { primitiveProps } from '@oku-ui/primitive'
import { defineComponent, h, mergeProps } from 'vue'
import type { Ref } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'

import { createProvideScope } from '@oku-ui/provide'
import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'

import { scopeToggleGroupProps } from './utils'

import type { ToggleGroupImplElement, ToggleGroupImplNaviteElement } from './ToggleGroupImpl'
import type { ToggleGroupVariantEmits, ToggleGroupVariantProps } from './ToggleGroupVariant'
import { OkuToggleGroupVariant, toggleGroupVariantProps } from './ToggleGroupVariant'

export const TOGGLE_GROUP_NAME = 'OkuToggleGroup'

export const [createToggleGroupProvide, createToggleGroupScope] = createProvideScope(TOGGLE_GROUP_NAME, [
  createRovingFocusGroupScope,
])

type ToggleGroupValueProvide = {
  type: Ref<'single' | 'multiple'>
  value: Ref<string[]>
  onItemActivate(value: string): void
  onItemDeactivate(value: string): void
}

export const [toggleGroupValueProvider, useToggleGroupValueInject]
  = createToggleGroupProvide<ToggleGroupValueProvide>(TOGGLE_GROUP_NAME)

type ToggleGroupProvide = {
  rovingFocus: Ref<boolean>
  disabled: Ref<boolean>
}

export const [toggleGroupProvide, useToggleGroupInject]
  = createToggleGroupProvide<ToggleGroupProvide>(TOGGLE_GROUP_NAME)

export const useRovingFocusGroupScope = createRovingFocusGroupScope()

export type ToggleGroupProps = ToggleGroupVariantProps
export type ToggleGroupEmits = ToggleGroupVariantEmits

export type ToggleGroupElement = ToggleGroupImplElement
export type ToggleGroupNaviteElement = ToggleGroupImplNaviteElement

export const toggleGroupProps = {
  props: {
    ...toggleGroupVariantProps.props,
  },
  emits: {
    ...toggleGroupVariantProps.emits,
  },
}

const toggleGroup = defineComponent({
  name: TOGGLE_GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...toggleGroupProps.props,
    ...scopeToggleGroupProps,
    ...primitiveProps,
  },
  emits: toggleGroupProps.emits,
  setup(props, { slots, attrs }) {
    const forwardedRef = useForwardRef()
    return () => {
      return h(OkuToggleGroupVariant, {
        ...mergeProps(attrs, props),
        ref: forwardedRef,
      }, slots)
    }
  },
})

export const OkuToggleGroup = toggleGroup as typeof toggleGroup &
(new () => {
  $props: ToggleGroupNaviteElement
})
