import { primitiveProps } from '@oku-ui/primitive'
import { defineComponent, h, mergeProps, toRef } from 'vue'
import type { Ref } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'

import { createProvideScope } from '@oku-ui/provide'
import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'

import { scopeToggleGroupProps } from './utils'

import type { ToggleGroupImplElement, ToggleGroupImplIntrinsicElement } from './ToggleGroupImpl'
import type { ToggleGroupImplItemEmits, ToggleGroupImplItemProps } from './ToggleGroupImplItem'
import { OkuToggleGroupImplItem, toggleGroupImplItemProps } from './ToggleGroupImplItem'

export const TOGGLE_GROUP_NAME = 'OkuRadioGroup'

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

export type ToggleGroupProps = ToggleGroupImplItemProps
export type ToggleGroupEmits = ToggleGroupImplItemEmits

export type ToggleGroupElement = ToggleGroupImplElement
export type ToggleGroupIntrinsicElement = ToggleGroupImplIntrinsicElement

export const toggleGroupProps = {
  props: {
    ...toggleGroupImplItemProps.props,
  },
  emits: {
    ...toggleGroupImplItemProps.emits,
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
    const type = toRef(props, 'type')
    return () => {
      if (!type.value)
        throw new Error(`Missing prop \`type\` expected on \`${TOGGLE_GROUP_NAME}\``)

      return h(OkuToggleGroupImplItem, {
        ...mergeProps(attrs, props),
        ref: forwardedRef,
      }, slots)
    }
  },
})

export const OkuToggleGroup = toggleGroup as typeof toggleGroup &
(new () => {
  $props: Partial<ToggleGroupElement>
})
