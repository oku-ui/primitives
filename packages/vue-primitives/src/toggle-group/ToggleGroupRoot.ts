import type { Ref } from 'vue'
import type { RovingFocusGroupRootProps } from '../roving-focus/index.ts'
import { createContext } from '@oku-ui/hooks'

export type ToggleGroupType = 'single' | 'multiple' | undefined

export interface ToggleGroupProps<T extends ToggleGroupType> extends ToggleGroupImplProps {
  type: T

  value?: T extends 'multiple' ? ToggleGroupMultipleProps['value'] : ToggleGroupSingleProps['value']

  defaultValue?: T extends 'multiple' ? ToggleGroupMultipleProps['defaultValue'] : ToggleGroupSingleProps['defaultValue']
}

export type ToggleGroupEmits<T extends ToggleGroupType> = {
  /**
   * The callback that fires when the state of the toggle group changes.
   */
  'update:value': [value: T extends 'multiple' ? NonNullable<ToggleGroupMultipleProps['value']> : NonNullable<ToggleGroupSingleProps['value']>]
}

interface ToggleGroupSingleProps {
  /**
   * The controlled stateful value of the item that is pressed.
   */
  value?: string
  /**
   * The value of the item that is pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string
}

interface ToggleGroupMultipleProps {
  /**
   * The controlled stateful value of the items that are pressed.
   */
  value?: string[]
  /**
   * The value of the items that are pressed when initially rendered. Use
   * `defaultValue` if you do not need to control the state of a toggle group.
   */
  defaultValue?: string[]
}

interface ToggleGroupImplProps {
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
  loop?: RovingFocusGroupRootProps['loop']
  orientation?: RovingFocusGroupRootProps['orientation']
  dir?: RovingFocusGroupRootProps['dir']
}

export interface ToggleGroupContext {
  rovingFocus: () => boolean
  disabled: () => boolean
  type: () => ToggleGroupType
  value: Ref<string[]>
  onItemActivate: (value: string) => void
  onItemDeactivate: (value: string) => void
}

export const [provideToggleGroupContext, useToggleGroupContext] = createContext<ToggleGroupContext>('ToggleGroup')
