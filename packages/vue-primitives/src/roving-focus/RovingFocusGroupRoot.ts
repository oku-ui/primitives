import { type AriaAttributes, type Ref, shallowRef } from 'vue'
import { createCollection } from '../collection/index.ts'
import { createContext, type MutableRefObject } from '../hooks/index.ts'
import { useControllableStateV2 } from '../hooks/index.ts'
import { focusFirst } from '../utils/focusFirst.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { ENTRY_FOCUS, EVENT_OPTIONS } from './utils.ts'
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
  'entryFocus': [event: Event]
  'mousedown': [event: MouseEvent]
  'focus': [event: FocusEvent]
  'focusout': [event: FocusEvent]
}

export interface ItemData {
  rfg: {
    id: string
    focusable: boolean
    active: boolean
  }
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

export interface UseRovingFocusGroupRootProps {
  currentTabStopId?: () => string | undefined
  defaultCurrentTabStopId?: string
  orientation: (() => Orientation)
  loop: (() => boolean)
  dir: Ref<Direction>
  preventScrollOnEntryFocus?: boolean

}

export interface UseRovingFocusGroupRootEmits {
  onMousedown?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onFocusout?: (event: FocusEvent) => void
  updateCurrentTabStopId?: (tabStopId: string) => void
  onEntryFocus?: (event: CustomEvent) => void
}

export function useRovingFocusGroupRoot(
  elRef: MutableRefObject<HTMLElement | undefined>,
  props: UseRovingFocusGroupRootProps,
  emits: UseRovingFocusGroupRootEmits,
) {
  const currentTabStopId = useControllableStateV2(props.currentTabStopId, emits.updateCurrentTabStopId, props.defaultCurrentTabStopId)

  const collectionContext = Collection.provideCollectionContext(elRef)
  const getItems = useCollection(collectionContext)
  const isTabbingBackOut = shallowRef(false)
  let isClickFocus = false
  const focusableItemsCount = shallowRef(0)

  const onMousedown = composeEventHandlers<MouseEvent>(emits.onMousedown, () => {
    isClickFocus = true
  })

  const onFocus = composeEventHandlers<FocusEvent>(emits.onFocus, () => {
  // We normally wouldn't need this check, because we already check
  // that the focus is on the current target and not bubbling to it.
  // We do this because Safari doesn't focus buttons when clicked, and
  // instead, the wrapper will get focused and not through a bubbling event.
    const isKeyboardFocus = !isClickFocus

    // TODO: event.target === event.currentTarget всегда равно true
    if (isKeyboardFocus && !isTabbingBackOut.value) {
      const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS)
      // event.currentTarget!.dispatchEvent(entryFocusEvent)
      emits.onEntryFocus?.(entryFocusEvent)

      if (!entryFocusEvent.defaultPrevented) {
        const items = getItems().filter(item => item.$$rcid.rfg.focusable)
        const activeItem = items.find(item => item.$$rcid.rfg.active)
        const currentItem = items.find(item => item.$$rcid.rfg.id === currentTabStopId.value)
        const candidateItems = [activeItem, currentItem, ...items].filter(Boolean) as typeof items
        const candidateNodes = candidateItems.map(item => item)
        focusFirst(candidateNodes, props.preventScrollOnEntryFocus ?? false)
      }
    }

    isClickFocus = false
  })

  const onFocusout = composeEventHandlers<FocusEvent>(emits.onFocusout, () => {
    isTabbingBackOut.value = false
  })

  provideRovingFocusContext({
    orientation: props.orientation,
    dir: props.dir,
    loop: props.loop,
    currentTabStopId,
    onItemFocus(tabStopId) {
      currentTabStopId.value = tabStopId
    },
    onItemShiftTab() {
      isTabbingBackOut.value = true
    },
    onFocusableItemAdd() {
      focusableItemsCount.value += 1
    },
    onFocusableItemRemove() {
      focusableItemsCount.value -= 1
    },
  })

  return {
    onMousedown,
    onFocus,
    onFocusout,
    tabindex() {
      return isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0
    },
  }
}
