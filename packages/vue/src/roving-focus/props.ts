import type { Scope } from '@oku-ui/provide'
import { createScope } from '@oku-ui/provide'
import type { CollectionPropsType } from '@oku-ui/collection'
import { createCollection } from '@oku-ui/collection'
import type { AriaAttributes, Ref } from 'vue'
import type { PrimitiveProps } from '@oku-ui/primitive'

export interface RovingFocusGroupProps extends PrimitiveProps {
  scopeOkuRovingFocusGroup?: Scope
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

export type Orientation = AriaAttributes['aria-orientation']
export type Direction = 'ltr' | 'rtl'

export const ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus'
export const EVENT_OPTIONS = { bubbles: false, cancelable: true }

export interface ItemData extends CollectionPropsType {
  id: string
  focusable: boolean
  active: boolean
}

export const { CollectionItemSlot, CollectionProvider, CollectionSlot, useCollection, createCollectionScope } = createCollection<
  {
    $el: HTMLSpanElement
  },
  ItemData
  >('OkuRovingFocusGroup', {
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

export const [createRovingFocusGroupProvide, createRovingFocusGroupScope] = createScope<'OkuRovingFocusGroup'>(
  'OkuRovingFocusGroup',
  [createCollectionScope],
)

type RovingContext = {
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

  currentTabStopId: Ref<string | null>
  onItemFocus(tabStopId: string): void
  onItemShiftTab(): void
  onFocusableItemAdd(): void
  onFocusableItemRemove(): void
}

export const [rovingFocusProvider, useRovingFocusInject]
  = createRovingFocusGroupProvide<RovingContext>('OkuRovingFocusGroup')
