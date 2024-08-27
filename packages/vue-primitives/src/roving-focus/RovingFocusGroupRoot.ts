import type { AriaAttributes, Ref } from 'vue'
import { createCollection } from '../collection/index.ts'
import { createContext } from '../hooks/index.ts'
import type { Direction } from '../direction/index.ts'

type Orientation = AriaAttributes['aria-orientation']

export interface RovingFocusGroupRootProps {
  /**
   * The orientation of the group.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   */
  orientation?: Orientation
  /**
   * The direction of navigation between items.
   */
  dir?: Direction
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: boolean

  currentTabStopId?: string | undefined
  defaultCurrentTabStopId?: string
  preventScrollOnEntryFocus?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type RovingFocusGroupRootEmits = {
  'update:currentTabStopId': [tabStopId: string | undefined]
  'entryFocus': [event: CustomEvent]
  'mousedown': [event: MouseEvent]
  'focus': [event: FocusEvent]
  'focusout': [event: FocusEvent]
}

export interface ItemData {
  id: string
  focusable: boolean
  active: boolean
}

export const [Collection, useCollection] = createCollection<HTMLElement, ItemData>('RovingFocusGroup')

export interface RovingContext {
  /**
   * The orientation of the group.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   */
  orientation: () => Orientation
  /**
   * The direction of navigation between items.
   */
  dir: Ref<Direction>
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop: () => boolean
  currentTabStopId: Ref<string | null>
  onItemFocus: (tabStopId: string) => void
  onItemShiftTab: () => void
  onFocusableItemAdd: () => void
  onFocusableItemRemove: () => void
}

export const [provideRovingFocusContext, useRovingFocusContext] = createContext<RovingContext>('RovingFocusGroup')
