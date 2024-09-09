import { computed, onWatcherCleanup, watch, watchEffect } from 'vue'
import { useId } from '../hooks/index.ts'
import { wrapArray } from '../utils/array.ts'
import { focusFirst } from '../utils/focusFirst.ts'
import { isFunction } from '../utils/is.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { Collection, type ItemData, useCollection, useRovingFocusContext } from './RovingFocusGroupRoot.ts'
import { getFocusIntent } from './utils.ts'
import type { PrimitiveProps } from '../primitive/index.ts'

export interface RovingFocusGroupItemProps {
  as?: PrimitiveProps['as']
  tabStopId?: string
  focusable?: boolean
  active?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
export type RovingFocusGroupItemEmits = {
  mousedown: [event: MouseEvent]
  focus: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}

export interface UseRovingFocusGroupItemProps {
  tabStopId?: (() => string) | string
  focusable?: (() => boolean) | boolean
  active?: (() => boolean) | boolean
}

export interface UseRovingFocusGroupItemEmits {
  onMousedown?: (event: MouseEvent) => void
  onFocus?: (event: FocusEvent) => void
  onKeydown?: (event: KeyboardEvent) => void
}

export function useRovingFocusGroupItem(
  props: UseRovingFocusGroupItemProps,
  emits: UseRovingFocusGroupItemEmits,
) {
  const focusable = () => isFunction(props.focusable) ? props.focusable() : props.focusable ?? true
  const active = () => isFunction(props.active) ? props.active() : props.active ?? false

  const id = computed(() => isFunction(props.tabStopId) ? props.tabStopId() : props.tabStopId ?? useId())
  const context = useRovingFocusContext('RovingFocusGroupItem')
  const isCurrentTabStop = computed(() => context.currentTabStopId.value === id.value)

  const getItems = useCollection()

  watch(focusable, (value) => {
    if (value) {
      context.onFocusableItemAdd()
      onWatcherCleanup(context.onFocusableItemRemove)
    }
  }, { immediate: true })

  const itemData: ItemData = { id: id.value, focusable: focusable(), active: active() }

  watchEffect(() => {
    itemData.active = active()
    itemData.focusable = focusable()
    itemData.id = id.value
  })

  const onMousedown = composeEventHandlers<MouseEvent>(emits.onMousedown, (event) => {
    // We prevent focusing non-focusable items on `mousedown`.
    // Even though the item has tabIndex={-1}, that only means take it out of the tab order.
    if (!focusable())
      event.preventDefault()
    // Safari doesn't focus a button when clicked so we run our logic on mousedown also
    else context.onItemFocus(id.value)
  })

  const onFocus = composeEventHandlers<FocusEvent>(emits.onFocus, () => context.onItemFocus(id.value))

  const onKeydown = composeEventHandlers<KeyboardEvent>(emits.onKeydown, (event) => {
    if (event.key === 'Tab' && event.shiftKey) {
      context.onItemShiftTab()
      return
    }

    if (event.target !== event.currentTarget)
      return

    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
      return

    const focusIntent = getFocusIntent(event, context.orientation(), context.dir.value)

    if (!focusIntent)
      return

    event.preventDefault()
    let candidateNodes = getItems().filter(item => item.$$rcid.focusable)

    if (focusIntent === 'last') {
      candidateNodes.reverse()
    }
    else if (focusIntent === 'prev' || focusIntent === 'next') {
      if (focusIntent === 'prev')
        candidateNodes.reverse()
      const currentIndex = (candidateNodes as HTMLElement[]).indexOf(event.currentTarget as HTMLElement)
      candidateNodes = context.loop()
        ? wrapArray(candidateNodes, currentIndex + 1)
        : candidateNodes.slice(currentIndex + 1)
    }

    // TODO: wip
    /**
     * Imperative focus during keydown is risky so we prevent React's batching updates
     * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
     */
    setTimeout(() => focusFirst(candidateNodes))
  })

  return {
    itemData,
    useCollectionItem: Collection.useCollectionItem,
    onFocus,
    onMousedown,
    onKeydown,
    isCurrentTabStop,
    orientation: context.orientation,
    tabindex() {
      return isCurrentTabStop.value ? 0 : -1
    },
  }
}
