import { type AriaAttributes, type MaybeRefOrGetter, type Ref, shallowRef } from 'vue'
import { createCollection } from '../collection/index.ts'
import { type Direction, useDirection } from '../direction/index.ts'
import { createContext, type MutableRefObject, useRef } from '../hooks/index.ts'
import { useControllableStateV2 } from '../hooks/index.ts'
import { type EmitsToHookProps, focusFirst, mergePrimitiveAttrs, type RadixPrimitiveReturns, wrapArray } from '../shared/index.ts'
import { ENTRY_FOCUS, EVENT_OPTIONS, getFocusIntent } from './utils.ts'

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

export type RovingFocusGroupRootEmits = {
  'update:currentTabStopId': [tabStopId: string | undefined]
  'entryFocus': [event: Event]
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
  const elRef = props.elRef || useRef<HTMLElement>()
  const setTemplateEl = props.elRef ? undefined : (value: HTMLElement | undefined) => elRef.value = value

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

  function onFocus(event: FocusEvent) {
    if (event.defaultPrevented)
      return

    // We normally wouldn't need this check, because we already check
    // that the focus is on the current target and not bubbling to it.
    // We do this because Safari doesn't focus buttons when clicked, and
    // instead, the wrapper will get focused and not through a bubbling event.
    const isKeyboardFocus = !isClickFocus

    // TODO: event.target === event.currentTarget всегда равно true
    if (isKeyboardFocus && !isTabbingBackOut.value) {
      const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS)
      // event.currentTarget!.dispatchEvent(entryFocusEvent)
      props.onEntryFocus?.(entryFocusEvent)

      if (!entryFocusEvent.defaultPrevented) {
        const items = getItems().filter(item => item.$$rcid.rfg.focusable)
        const activeItem = items.find(item => item.$$rcid.rfg.active)
        const currentItem = items.find(item => item.$$rcid.rfg.id === currentTabStopId.value)
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
    loop: props.loop ?? false,
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

  function onKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement
    if (!target.matches('[data-radix-collection-item]')) {
      return
    }
    if (event.key === 'Tab' && event.shiftKey) {
      isTabbingBackOut.value = true
      return
    }

    // if (event.target !== event.currentTarget)
    //   return

    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
      return

    const focusIntent = getFocusIntent(event, props.orientation, dir.value)

    if (!focusIntent)
      return

    event.preventDefault()
    let candidateNodes = getItems().filter(item => item.$$rcid.rfg.focusable)

    if (focusIntent === 'last') {
      candidateNodes.reverse()
    }
    else if (focusIntent === 'prev' || focusIntent === 'next') {
      if (focusIntent === 'prev')
        candidateNodes.reverse()
      const currentIndex = (candidateNodes as HTMLElement[]).indexOf(event.target as HTMLElement)
      candidateNodes = props.loop ?? false
        ? wrapArray(candidateNodes, currentIndex + 1)
        : candidateNodes.slice(currentIndex + 1)
    }

    // TODO: wip
    /**
     * Imperative focus during keydown is risky so we prevent React's batching updates
     * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
     */
    setTimeout(() => {
      focusFirst(candidateNodes)
    })
  }

  return {
    attrs(extraAttrs) {
      const attrs = {
        'elRef': setTemplateEl,
        'dir': dir.value,
        'tabindex': isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0,
        'data-orientation': props.orientation,
        'style': 'outline: none;',
        onMousedown,
        onFocus,
        onFocusout,
        onKeydown,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
