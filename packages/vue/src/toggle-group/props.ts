import type { PropType, Ref } from 'vue'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { Scope } from '@oku-ui/provide'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import type { RovingFocusGroupProps } from '@oku-ui/roving-focus'
import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import { toggleProps } from '@oku-ui/toggle'
import type { ToggleElement, ToggleEmits, ToggleNativeElement, ToggleProps } from '@oku-ui/toggle'

export type ScopeToggleGroup<T> = T & { scopeOkuToggleGroup?: Scope }

export const scopeToggleGroupProps = {
  scopeOkuToggleGroup: {
    ...ScopePropObject,
  },
}

export const TOGGLE_GROUP_NAME = 'OkuToggleGroup'
export const TOGGLE_GROUP_IMPL_NAME = 'OkuToggleGroupImpl'
export const TOGGLE_GROUP_IMPL_SINGLE_NAME = 'OkuToggleGroupImplSingle'
export const TOGGLE_GROUP_IMPL_MULTIPLE_NAME = 'OkuToggleGroupImplMultiple'
export const TOGGLE_GROUP_ITEM_IMPL_NAME = 'OkuToggleGroupItemImpl'
export const TOGGLE_GROUP_ITEM_NAME = 'OkuToggleGroupItem'

/* -------------------------------------------------------------------------------------------------
 * ToggleGroup - toggle-group.ts
 * ----------------------------------------------------------------------------------------------- */

export type ToggleGroupNativeElement = ToggleGroupImplSingleNativeElement | ToggleGroupImplMultipleNativeElement
export type ToggleGroupElement = ToggleGroupImplSingleElement | ToggleGroupImplMultipleElement

export const [createToggleGroupProvider, createToggleGroupScope] = createProvideScope(TOGGLE_GROUP_NAME, [
  createRovingFocusGroupScope,
])

export const useRovingFocusGroupScope = createRovingFocusGroupScope()

export interface ToggleGroupSingleProps extends ToggleGroupImplSingleProps {
  type: 'single'
}

export interface ToggleGroupMultipleProps extends ToggleGroupImplMultipleProps {
  type: 'multiple'
}

export const toggleGroupProps = {
  props: {
    type: {
      type: String as PropType<ToggleGroupSingleProps['type'] | ToggleGroupMultipleProps['type']>,
      required: true,
    },
  },
  emits: { },
}

/* -------------------------------------------------------------------------------------------------
 * ToggleGroupImpl - toggle-group-impl.ts
 * ----------------------------------------------------------------------------------------------- */

export type ToggleGroupImplNativeElement = OkuElement<'div'>
export type ToggleGroupImplElement = HTMLDivElement

type ToggleGroupProviderValue = {
  rovingFocus: Ref<boolean | undefined>
  disabled: Ref<boolean | undefined>
}

export const [toggleGroupProvider, useToggleGroupInject]
  = createToggleGroupProvider<ToggleGroupProviderValue>(TOGGLE_GROUP_NAME)

export interface ToggleGroupImplProps extends PrimitiveProps {
  /**
   * Whether the group is disabled from user interaction.
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * Whether the group should maintain roving focus of its buttons.
   * @defaultValue true
   */
  rovingFocus?: boolean
  loop?: RovingFocusGroupProps['loop']
  orientation?: RovingFocusGroupProps['orientation']
  dir?: RovingFocusGroupProps['dir']
}

export const toggleGroupImplProps = {
  props: {
    disabled: {
      type: Boolean as PropType<ToggleGroupImplProps['disabled']>,
      default: false,
    },
    rovingFocus: {
      type: Boolean as PropType<ToggleGroupImplProps['rovingFocus']>,
      default: true,
    },
    loop: {
      type: Boolean as PropType<ToggleGroupImplProps['loop']>,
      default: true,
    },
    orientation: {
      type: String as PropType<ToggleGroupImplProps['orientation']>,
    },
    dir: {
      type: String as PropType<ToggleGroupImplProps['dir']>,
    },
    ...primitiveProps,
  },
  emits: { },
}

/* -------------------------------------------------------------------------------------------------
 * ToggleGroupImplSingle - toggle-group-impl-single.ts
 * ----------------------------------------------------------------------------------------------- */

export type ToggleGroupImplSingleNativeElement = ToggleGroupImplNativeElement
export type ToggleGroupImplSingleElement = ToggleGroupImplElement

type ToggleGroupValueProviderValue = {
  type: 'single' | 'multiple'
  value: Ref<string[]>
  onItemActivate(value: string): void
  onItemDeactivate(value: string): void
}

export const [toggleGroupValueProvider, useToggleGroupValueInject]
  = createToggleGroupProvider<ToggleGroupValueProviderValue>(TOGGLE_GROUP_NAME)

export interface ToggleGroupImplSingleProps extends ToggleGroupImplProps {
  /**
   * The controlled stateful value of the item that is pressed.
   */
  value?: string
  /**
   * The value of the item that is pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string
  modelValue?: string
}

export type ToggleGroupImplSingleEmits = {
  /**
   * The callback that fires when the value of the toggle group changes.
   */
  'valueChange': [value: string]
  'update:modelValue': [value: string]
}

export const toggleGroupImplSingleProps = {
  props: {
    modelValue: {
      type: String as PropType<ToggleGroupImplSingleProps['modelValue']>,
      default: undefined,
    },
    value: {
      type: String as PropType<ToggleGroupImplSingleProps['value']>,
      default: undefined,
    },
    defaultValue: {
      type: String as PropType<ToggleGroupImplSingleProps['defaultValue']>,
      default: undefined,
    },
    ...toggleGroupImplProps.props,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'valueChange': (value: ToggleGroupImplSingleEmits['valueChange'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: ToggleGroupImplSingleEmits['update:modelValue'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * ToggleGroupImplMultiple - toggle-group-impl-multiple.ts
 * ----------------------------------------------------------------------------------------------- */

export type ToggleGroupImplMultipleNativeElement = ToggleGroupImplNativeElement
export type ToggleGroupImplMultipleElement = ToggleGroupImplElement

export interface ToggleGroupImplMultipleProps extends ToggleGroupImplProps {
  /**
   * The controlled stateful value of the items that are pressed.
   */
  value?: string[]
  /**
   * The value of the items that are pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string[]
  modelValue?: string[]
}

export type ToggleGroupImplMultipleEmits = {
  /**
   * The callback that fires when the state of the toggle group changes.
   */
  'valueChange': [value: string[]]
  'update:modelValue': [value: string[]]
}

export const toggleGroupImplMultipleProps = {
  props: {
    modelValue: {
      type: Array as PropType<ToggleGroupImplMultipleProps['modelValue']>,
      default: undefined,
    },
    value: {
      type: Array as PropType<ToggleGroupImplMultipleProps['value']>,
      default: undefined,
    },
    defaultValue: {
      type: Array as PropType<ToggleGroupImplMultipleProps['defaultValue']>,
      default: undefined,
    },
    ...toggleGroupImplProps.props,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'valueChange': (value: string[]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: string[]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * ToggleGroupItemImpl - toggle-group-item-impl.ts
 * ----------------------------------------------------------------------------------------------- */

export type ToggleGroupItemImplNativeElement = ToggleNativeElement
export type ToggleGroupItemImplElement = ToggleElement

export interface ToggleGroupItemImplProps extends Omit<ToggleProps, 'defaultPressed'> {
  /**
   * A string value for the toggle group item. All items within a toggle group should use a unique value.
   */
  value: string
}

export interface ToggleGroupItemImplEmits extends Omit<ToggleEmits, 'onPressedChange'> { }

export const toggleGroupItemImplProps = {
  props: {
    /**
     * A string value for the toggle group item. All items within a toggle group should use a unique value.
     */
    value: {
      type: String as PropType<ToggleGroupItemImplProps['value']>,
    },
    ...propsOmit(toggleProps.props, ['defaultPressed']),
  },
  emits: {
    ...propsOmit(toggleProps.emits, ['pressedChange']),
  },
}

/* -------------------------------------------------------------------------------------------------
 * ToggleGroupItem - toggle-group-item.ts
 * ----------------------------------------------------------------------------------------------- */

export type ToggleGroupItemNativeElement = ToggleGroupItemImplNativeElement
export type ToggleGroupItemElement = ToggleGroupItemImplElement

export interface ToggleGroupItemProps extends Omit<ToggleGroupItemImplProps, 'pressed'> { }
export interface ToggleGroupItemEmits extends ToggleGroupItemImplEmits { }

export const toggleGroupItemProps = {
  props: {
    ...propsOmit(toggleGroupItemImplProps.props, ['pressed']),
  },
  emits: {
    ...toggleGroupItemImplProps.emits,
  },
}
