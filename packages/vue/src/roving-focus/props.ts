import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { CollectionPropsType } from '@oku-ui/collection'
import { createCollection } from '@oku-ui/collection'
import type { ComputedRef, PropType, Ref } from 'vue'
import type { AriaAttributes, OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { primitiveProps } from '@oku-ui/primitive'

export const GROUP_NAME = 'OkuRovingFocusGroup'
export const ITEM_NAME = 'OkuRovingFocusGroupItem'

export type ScopedPropsInterface<P> = P & { scopeOkuRovingFocusGroup?: Scope }
export const scopedProps = {
  scopeOkuRovingFocusGroup: {
    ...ScopePropObject,
  },
}

export interface RovingFocusGroupOptions {
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
}

export const rovingFocusGroupOptionsProps = {
  props: {
    orientation: {
      type: String as PropType<Orientation | undefined>,
      default: undefined,
    },
    dir: {
      type: String as PropType<Direction | undefined>,
      default: undefined,
    },
    loop: {
      type: Boolean,
      default: false,
    },
  },
}

export type Orientation = AriaAttributes['aria-orientation']
export type Direction = 'ltr' | 'rtl'

/* -------------------------------------------------------------------------------------------------
 *  RovingFocusGroupImpl - rovingFocusGroupImpl.ts
 * ----------------------------------------------------------------------------------------------- */

export const ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus'
export const EVENT_OPTIONS = { bubbles: false, cancelable: true }

export type RovingFocusGroupImplNaviteElement = OkuElement<'div'>
export type RovingFocusGroupImplElement = HTMLDivElement

export interface RovingFocusGroupImplProps extends RovingFocusGroupOptions {
  currentTabStopId?: string | null
  defaultCurrentTabStopId?: string
}

export type RovingFocusGroupImplEmits = {
  currentTabStopIdChange: [tabStopId: string | null]
  entryFocus: [event: Event]
  mousedown: [event: MouseEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}

export const rovingFocusGroupImplProps = {
  props: {
    currentTabStopId: {
      type: String as PropType<string | null>,
    },
    defaultCurrentTabStopId: {
      type: String as PropType<string>,
      default: null,
    },
    ...rovingFocusGroupOptionsProps.props,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    entryFocus: (event: Event) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    currentTabStopIdChange: (tabStopId: string | null) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    mousedown: (event: MouseEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focus: (event: FocusEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    blur: (event: FocusEvent) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  RovingFocusGroupItem - rovingFocusGroupItem.ts
 * ----------------------------------------------------------------------------------------------- */

export type RovingFocusGroupItemNaviteElement = OkuElement<'span'>
export type RovingFocusGroupItemElement = HTMLSpanElement

export interface RovingFocusItemProps extends PrimitiveProps {
  tabStopId?: string
  focusable?: boolean
  active?: boolean
}

export type RovingFocusGroupItemEmits = {
  focus: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  mousedown: [event: MouseEvent]
}

export const rovingFocusItemProps = {
  props: {
    tabStopId: {
      type: String,
    },
    focusable: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    focus: (event: FocusEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    mousedown: (event: MouseEvent) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  RovingFocusGroup - rovingFocusGroup.ts
 * ----------------------------------------------------------------------------------------------- */

export interface ItemData extends CollectionPropsType {
  id: string
  focusable: boolean
  active: boolean
}

export const { CollectionItemSlot, CollectionProvider, CollectionSlot, useCollection, createCollectionScope } = createCollection<
  HTMLSpanElement,
  ItemData
>(GROUP_NAME, {
  id: {
    type: String,
  },
  focusable: {
    type: Boolean,
  },
  active: {
    type: Boolean,
  },
})

export const [createRovingFocusGroupProvide, createRovingFocusGroupScope] = createProvideScope(
  GROUP_NAME,
  [createCollectionScope],
)

// RovingFocusGroupOptions extends
type RovingProvideValue = {
  /**
   * The orientation of the group.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   */
  orientation?: Ref<Orientation | undefined>
  /**
   * The direction of navigation between items.
   */
  dir?: Ref<Direction | undefined>
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: Ref<boolean | undefined>

  currentTabStopId: ComputedRef<string | null>
  onItemFocus(tabStopId: string): void
  onItemShiftTab(): void
  onFocusableItemAdd(): void
  onFocusableItemRemove(): void
}

export const [rovingFocusProvider, useRovingFocusInject]
  = createRovingFocusGroupProvide<RovingProvideValue>(GROUP_NAME)

export type RovingFocusGroupNaviteElement = RovingFocusGroupImplNaviteElement
export type RovingFocusGroupElement = RovingFocusGroupImplElement

export interface RovingFocusGroupProps extends RovingFocusGroupImplProps { }

export type RovingFocusGroupEmits = RovingFocusGroupImplEmits

export const rovingFocusGroupProps = {
  ...rovingFocusGroupImplProps,
}
