import { primitiveProps } from '@oku-ui/primitive'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { PropType, Ref } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'

import { createProvideScope } from '@oku-ui/provide'
import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'

import { scopeToggleGroupProps } from './utils'

import { toggleGroupImplProps } from './ToggleGroupImpl'
import type { ToggleGroupImplElement, ToggleGroupImplNaviteElement, ToggleGroupImplProps } from './ToggleGroupImpl'
import { OkuToggleGroupImplSingle } from './ToggleGroupImplSingle'
import { OkuToggleGroupImplMultiple } from './ToggleGroupImplMultiple'

export const TOGGLE_GROUP_NAME = 'OkuToggleGroup'

export const [createToggleGroupProvide, createToggleGroupScope] = createProvideScope(TOGGLE_GROUP_NAME, [
  createRovingFocusGroupScope,
])

type ToggleGroupValueProvide = {
  type: 'single' | 'multiple'
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

export interface ToggleGroupVariantProps extends ToggleGroupImplProps {
  type: 'single' | 'multiple'
  /**
   * The controlled stateful value of the item that is pressed.
   */
  value?: string | string[]
  /**
   * The value of the item that is pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string | string[]
}

export type ToggleGroupVariantEmits = {
  /**
   * The callback that fires when the value of the toggle group changes.
   */
  'valueChange': [value: string | string[]]
}

export const toggleGroupVariantProps = {
  props: {
    type: {
      type: [String] as PropType<'single' | 'multiple'>,
      required: true,
    },
    modelValue: {
      type: [String, Array] as PropType<string | string[] | undefined>,
      default: undefined,
    },
    value: {
      type: [String, Array] as PropType<string | string[] | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: [String, Array] as PropType<string | string[] | undefined>,
      default: undefined,
    },
    ...toggleGroupImplProps.props,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    valueChange: (value: string | string[]) => true,
  },
}

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
  components: {
    OkuToggleGroupImplSingle,
    OkuToggleGroupImplMultiple,
  },
  inheritAttrs: false,
  props: {
    ...toggleGroupProps.props,
    ...scopeToggleGroupProps,
    ...primitiveProps,
  },
  setup(props, { slots, attrs }) {
    const { type, ...toggleGroupProps } = toRefs(props)
    const _reactive = reactive(toggleGroupProps)

    const forwardedRef = useForwardRef()
    return () => {
      if (type.value === 'single') {
        const singleProps = reactiveOmit(_reactive, (key, _value) => key === undefined)
        return h(OkuToggleGroupImplSingle, {
          ...mergeProps(attrs, singleProps),
          ref: forwardedRef,
        }, slots)
      }

      if (type.value === 'multiple') {
        const multipleProps = reactiveOmit(_reactive, (key, _value) => key === undefined)
        return h(OkuToggleGroupImplMultiple, {
          ...mergeProps(attrs, multipleProps),
          ref: forwardedRef,
        }, slots)
      }

      throw new Error(`Missing prop \`type\` expected on \`${TOGGLE_GROUP_NAME}\``)
    }
  },
})

export const OkuToggleGroup = toggleGroup as typeof toggleGroup &
  (new () => {
    $props: ToggleGroupNaviteElement
  })
