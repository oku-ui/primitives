import { primitiveProps } from '@oku-ui/primitive'
import { defineComponent, h, mergeProps, toRefs } from 'vue'
import type { PropType, Ref } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'

import { createProvideScope } from '@oku-ui/provide'
import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'

import type { ScopeToggleGroup } from './utils'
import { scopeToggleGroupProps } from './utils'
import { OkuToggleGroupImplSingle, type ToggleGroupImplSingleElement, type ToggleGroupImplSingleIntrinsicElement, type ToggleGroupImplSingleProps, toggleGroupImplSingleProps } from './ToggleGroupImplSingle'
import { OkuToggleGroupImplMultiple, type ToggleGroupImplMultipleElement, type ToggleGroupImplMultipleProps, toggleGroupImplMultipleProps } from './ToggleGroupImplMultiple'
import type { ToggleGroupImplIntrinsicElement } from './ToggleGroupImpl'

export const TOGGLE_GROUP_NAME = 'OkuRadioGroup'

export type RadioGroupIntrinsicElement = ToggleGroupImplSingleIntrinsicElement | ToggleGroupImplIntrinsicElement
export type RadioGroupElement = ToggleGroupImplSingleElement | ToggleGroupImplMultipleElement

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

interface ToggleGroupSingleProps extends ToggleGroupImplSingleProps {
  type: 'single'
}

interface ToggleGroupMultipleProps extends ToggleGroupImplMultipleProps {
  type: 'multiple'
}

type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps

const toggleGroupPropsObject = {
  type: {
    type: [String] as PropType<'single' | 'multiple'>,
    required: true,
  },
}

const toggleGroup = defineComponent({
  name: TOGGLE_GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...toggleGroupPropsObject,
    ...toggleGroupImplSingleProps.props,
    ...toggleGroupImplMultipleProps.props,
    ...scopeToggleGroupProps,
    ...primitiveProps,
  },
  setup(props, { slots, attrs }) {
    const { type } = toRefs(props)
    const forwardedRef = useForwardRef()

    return () => {
      if (type.value === 'single') {
        const singleProps = props as ToggleGroupImplSingleProps
        const { dir, disabled, loop, orientation, rovingFocus, value } = toRefs(singleProps)

        return h(OkuToggleGroupImplSingle, {
          ...attrs,
          asChild: props.asChild,
          ref: forwardedRef,
          dir: dir?.value,
          disabled: disabled?.value,
          loop: loop?.value,
          orientation: orientation?.value,
          rovingFocus: rovingFocus?.value,
          value: value?.value,
          scopeOkuToggleGroup: props.scopeOkuToggleGroup,
        }, slots)
      }

      if (type.value === 'multiple') {
        const multipleProps = props as ToggleGroupImplMultipleProps
        const { dir, disabled, loop, orientation, rovingFocus, value } = toRefs(multipleProps)

        return h(OkuToggleGroupImplMultiple, {
          ...mergeProps(attrs),
          asChild: props.asChild,
          ref: forwardedRef,
          dir: dir?.value,
          disabled: disabled?.value,
          loop: loop?.value,
          orientation: orientation?.value,
          rovingFocus: rovingFocus?.value,
          value: value?.value,
          scopeOkuToggleGroup: props.scopeOkuToggleGroup,

        }, slots)
      }

      throw new Error(`Missing prop \`type\` expected on \`${TOGGLE_GROUP_NAME}\``)
    }
  },
})

export const OkuToggleGroup = toggleGroup as typeof toggleGroup &
(new () => {
  $props: ScopeToggleGroup<Partial<RadioGroupElement>>
})

export type { ToggleGroupProps }
