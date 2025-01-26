import type { AriaAttributes, MaybeRefOrGetter, Ref } from 'vue'
import type { Direction } from '../direction/index.ts'
import type { MutableRefObject } from '../hooks/index.ts'
import type { EmitsToHookProps, PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { computed, shallowRef } from 'vue'
import { createCollection } from '../collection/index.ts'
import { useDirection } from '../direction/index.ts'
import { createContext, useControllableStateV2, useRef } from '../hooks/index.ts'
import { focusFirst, mergePrimitiveAttrs } from '../shared/index.ts'
import { ENTRY_FOCUS, EVENT_OPTIONS } from './utils.ts'

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

export const DEFAULT_ROVING_FOCUS_GROUP_ROOT_PROPS = {
  loop: undefined,
  preventScrollOnEntryFocus: undefined,
} satisfies PrimitiveDefaultProps<RovingFocusGroupRootProps>

export type RovingFocusGroupRootEmits = {
  'update:currentTabStopId': [tabStopId: string | undefined]
  'entryFocus': [event: Event]
}

export interface ItemData {
  $rfg: {
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
  orientation?: Orientation
  /**
   * The direction of navigation between items.
   */
  dir: Ref<Direction>
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop: boolean
  currentTabStopId: Ref<string | null>
  onItemFocus: (tabStopId: string) => void
  onItemShiftTab: () => void
  onFocusableItemAdd: () => void
  onFocusableItemRemove: () => void
}

export const [provideRovingFocusContext, useRovingFocusContext] = createContext<RovingContext>('RovingFocusGroup')

export interface UseRovingFocusGroupRootProps extends EmitsToHookProps<RovingFocusGroupRootEmits> {
  elRef?: MutableRefObject<HTMLElement | undefined>
  currentTabStopId?: () => string | undefined
  defaultCurrentTabStopId?: string
  orientation?: Orientation
  loop?: boolean
  dir?: MaybeRefOrGetter<Direction | undefined>
  preventScrollOnEntryFocus?: boolean
}

export function useRovingFocusGroupRoot(props: UseRovingFocusGroupRootProps): RadixPrimitiveReturns {
  const {
    loop = false,
  } = props
  const elRef = props.elRef || useRef<HTMLElement>()
  const setElRef = props.elRef ? undefined : (value: HTMLElement | undefined) => elRef.value = value

  const dir = useDirection(props.dir)

  const currentTabStopId = useControllableStateV2(props.currentTabStopId, props.onUpdateCurrentTabStopId, props.defaultCurrentTabStopId)

  const collectionContext = Collection.provideCollectionContext(elRef)
  const getItems = useCollection(collectionContext)
  const isTabbingBackOut = shallowRef(false)
  let isClickFocus = false
  const focusableItemsCount = shallowRef(0)

  function onMousedown(event: MouseEvent) {
    if (event.defaultPrevented)
      return
    isClickFocus = true
  }

  function onFocusin(event: FocusEvent) {
    if (event.defaultPrevented)
      return

    // We normally wouldn't need this check, because we already check
    // that the focus is on the current target and not bubbling to it.
    // We do this because Safari doesn't focus buttons when clicked, and
    // instead, the wrapper will get focused and not through a bubbling event.
    const isKeyboardFocus = !isClickFocus

    if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut.value) {
      const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS)
      // event.currentTarget!.dispatchEvent(entryFocusEvent)
      props.onEntryFocus?.(entryFocusEvent)

      if (!entryFocusEvent.defaultPrevented) {
        const items = getItems().filter(item => item.$$rcid.$rfg.focusable)
        const activeItem = items.find(item => item.$$rcid.$rfg.active)
        const _currentTabStopId = currentTabStopId.value
        const currentItem = items.find(item => item.$$rcid.$rfg.id === _currentTabStopId)
        const candidateItems = [activeItem, currentItem, ...items].filter(Boolean) as typeof items
        focusFirst(candidateItems, props.preventScrollOnEntryFocus ?? false)
      }
    }

    isClickFocus = false
  }

  function onFocusout(event: FocusEvent) {
    if (event.defaultPrevented)
      return
    isTabbingBackOut.value = false
  }

  provideRovingFocusContext({
    orientation: props.orientation,
    dir,
    loop,
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

  const tabindex = computed(() => isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0)

  const style = { outline: 'none' }

  return {
    attrs(extraAttrs) {
      const attrs = {
        'elRef': setElRef,
        'dir': dir.value,
        'tabindex': tabindex.value,
        'data-orientation': props.orientation,
        'style': style,
        onMousedown,
        onFocusin,
        onFocusout,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
