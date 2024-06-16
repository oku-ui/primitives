import type { AriaAttributes, Ref } from 'vue'
import { createCollection } from '../collection/index.ts'
import { createContext } from '../hooks/createContext.ts'
import type { PrimitiveProps } from '../primitive'

type Orientation = AriaAttributes['aria-orientation']
type Direction = 'ltr' | 'rtl'

export interface RovingFocusGroupProps extends PrimitiveProps {
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
export type RovingFocusGroupEmits = {
  'update:currentTabStopId': [tabStopId: string | undefined]
  'entryFocus': [event: CustomEvent]
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
  orientation: Ref<Orientation | undefined>
  /**
   * The direction of navigation between items.
   */
  dir: Ref<Direction | undefined>
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop: Ref<boolean | undefined>
  currentTabStopId: Ref<string | null>
  onItemFocus: (tabStopId: string) => void
  onItemShiftTab: () => void
  onFocusableItemAdd: () => void
  onFocusableItemRemove: () => void
}

export const [provideRovingFocusContext, useRovingFocusContext] = createContext<RovingContext>('RovingFocusGroup')
