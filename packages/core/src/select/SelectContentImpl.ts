import type { CollectionItemWithData } from '../collection'
import type { PopperContentProps, UsePopperContentProps } from '../popper'
import type { IAttrsData, PrimitiveDefaultProps, PrimitiveElAttrs, RadixPrimitiveGetAttrs, RadixPrimitiveReturns } from '../shared'
import { isClient } from '@vueuse/core'
import { hideOthers } from 'aria-hidden'
import { onBeforeUnmount, onMounted, onWatcherCleanup, shallowRef, watch, watchEffect } from 'vue'
import { type DismissableLayerEmits, useDismissableLayer, type UseDismissableLayerProps } from '../dismissable-layer'
import { useFocusGuards } from '../focus-guards'
import { type FocusScopeEmits, useFocusScope, type UseFocusScopeProps } from '../focus-scope'
import { useRef } from '../hooks'
import { provideSelectContentContext } from './SelectContent'
import { useSelectItemAlignedPosition } from './SelectItemAlignedPosition'
import { useSelectPopperPosition } from './SelectPopperPosition'
import { type ItemData, useCollection, useSelectContext } from './SelectRoot'
import { findNextItem, useTypeaheadSearch } from './utils'

export interface SelectContetImplProps extends PopperContentProps {
  position?: 'item-aligned' | 'popper'
}

export type SelectContetImplEmits = {
  unmountAutoFocus: FocusScopeEmits['unmountAutoFocus']
  escapeKeydown: DismissableLayerEmits['escapeKeydown']
  pointerdownOutside: DismissableLayerEmits['pointerdownOutside']
}

export const CONTENT_MARGIN = 10

export const DEFAULT_SELECT_CONTENT_IMPL_PROPS = {
  align: 'start',
  position: 'item-aligned',
  collisionPadding: CONTENT_MARGIN,
  avoidCollisions: undefined,
  hideWhenDetached: undefined,
} satisfies PrimitiveDefaultProps<SelectContetImplProps>

export interface UseSelectContentImplProps extends UsePopperContentProps {
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  onCloseAutoFocus?: UseFocusScopeProps['onUnmountAutoFocus']
  /**
   * Event handler called when the escape key is down.
   * Can be prevented.
   */
  onEscapeKeyDown?: UseDismissableLayerProps['onEscapeKeydown']
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`.
   * Can be prevented.
   */
  onPointerdownOutside?: UseDismissableLayerProps['onPointerdownOutside']

  position?: 'item-aligned' | 'popper'
}

export function useSelectContentImpl(props: UseSelectContentImplProps = {}): RadixPrimitiveReturns<{
  wrapperAttrs: () => IAttrsData
  attrs: RadixPrimitiveGetAttrs
}> {
  const {
    position = 'item-aligned',

    //
    // PopperContent props
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    avoidCollisions,
  } = props

  const context = useSelectContext('SelectContentImpl')
  const content = shallowRef<HTMLElement>()
  const viewport = shallowRef<HTMLElement>()
  const selectedItem = shallowRef<HTMLElement>()
  const selectedItemText = shallowRef<HTMLElement>()
  const getItems = useCollection()
  const isPositioned = shallowRef(false)
  const firstValidItemFoundRef = useRef(false)

  // aria-hide everything except the content (better supported equivalent to setting aria-modal)
  let clearHideOthers: (() => void) | undefined

  const { onOpenChange, triggerPointerDownPosRef } = context

  const close = () => onOpenChange(false)
  onMounted(() => {
    if (content.value) {
      clearHideOthers = hideOthers(content.value)
    }

    window.addEventListener('blur', close)
    window.addEventListener('resize', close)
  })

  onBeforeUnmount(() => {
    clearHideOthers?.()
    clearHideOthers = undefined

    window.removeEventListener('blur', close)
    window.removeEventListener('resize', close)
  })

  // Make sure the whole tree has focus guards as our `Select` may be
  // the last element in the DOM (because of the `Portal`)
  useFocusGuards()

  function focusFirst(candidates: Array<HTMLElement | undefined>) {
    const [firstItem, ...restItems] = getItems()
    const [lastItem] = restItems.slice(-1)
    const viewportEL = viewport.value

    const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement
    for (const candidate of candidates) {
      // if focus is already where we want to go, we don't want to keep going through the candidates
      if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
        return
      candidate?.scrollIntoView({ block: 'nearest' })
      // viewport might have padding so scroll to its edges when focusing first/last items.
      if (candidate === firstItem && viewportEL)
        viewportEL.scrollTop = 0
      if (candidate === lastItem && viewportEL)
        viewportEL.scrollTop = viewportEL.scrollHeight
      candidate?.focus()
      if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
        return
    }
  }

  watch(isPositioned, () => {
    if (selectedItem.value || content.value) {
      focusFirst([selectedItem.value, content.value])
    }
  })

  // prevent selecting items on `pointerup` in some cases after opening from `pointerdown`
  // and close on `pointerup` outside.

  if (isClient) {
    let pointerMoveDelta = { x: 0, y: 0 }

    function onPointermove(event: PointerEvent) {
      pointerMoveDelta = {
        x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.value?.x ?? 0)),
        y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.value?.y ?? 0)),
      }
    }

    function onPointerup(event: PointerEvent) {
      // Prevent options from being untappable on touch devices
      // https://github.com/unovue/reka-ui/issues/804
      if (event.pointerType === 'touch')
        return

      // If the pointer hasn't moved by a certain threshold then we prevent selecting item on `pointerup`.
      if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
        event.preventDefault()
      }
      else {
      // otherwise, if the event was outside the content, close.
        if (!content.value?.contains(event.target as HTMLElement))
          onOpenChange(false)
      }
      document.removeEventListener('pointermove', onPointermove)
      triggerPointerDownPosRef.value = undefined
    }

    watchEffect(() => {
      if (!content.value)
        return

      if (triggerPointerDownPosRef.value !== undefined) {
        document.addEventListener('pointermove', onPointermove)
        document.addEventListener('pointerup', onPointerup, { capture: true, once: true })
      }

      onWatcherCleanup(() => {
        pointerMoveDelta = { x: 0, y: 0 }
        document.removeEventListener('pointermove', onPointermove)
        document.removeEventListener('pointerup', onPointerup, { capture: true })
      })
    })
  }

  const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search) => {
    const enabledItems: Array<CollectionItemWithData<HTMLElement, ItemData>> = []
    let currentItem: CollectionItemWithData<HTMLElement, ItemData> | undefined
    const activeElement = document.activeElement

    for (const item of getItems()) {
      const data = item.$$rcid.$select
      if (!data.disabled) {
        enabledItems.push(item)

        if (item === activeElement) {
          currentItem = item
        }
      }
    }
    const nextItem = findNextItem(enabledItems, search, currentItem)
    if (nextItem) {
      /**
       * Imperative focus during keydown is risky so we prevent React's batching updates
       * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
       */
      setTimeout(() => nextItem.focus())
    }
  })

  function handleItemLeave() {
    content.value?.focus()
  }

  provideSelectContentContext({
    content,
    viewport,
    onViewportChange: (node) => {
      viewport.value = node
    },
    itemRefCallback(node: HTMLElement | undefined, value: string, disabled: boolean) {
      const isFirstValidItem = !firstValidItemFoundRef.value && !disabled
      const isSelectedItem = context.value.value !== undefined && context.value.value === value
      if (isSelectedItem || isFirstValidItem) {
        selectedItem.value = node

        if (isFirstValidItem)
          firstValidItemFoundRef.value = true
      }
    },
    selectedItem,
    onItemLeave: handleItemLeave,
    itemTextRefCallback(node: HTMLElement | undefined, value: string, disabled: boolean) {
      const isFirstValidItem = !firstValidItemFoundRef.value && !disabled
      const isSelectedItem = context.value.value !== undefined && context.value.value === value

      if (isSelectedItem || isFirstValidItem) {
        selectedItemText.value = node
      }
    },
    focusSelectedItem: () => {
      selectedItem.value?.focus()
    },
    selectedItemText,
    position,
    isPositioned,
    searchRef,
  })

  const useSelectPosition = position === 'popper' ? useSelectPopperPosition : useSelectItemAlignedPosition

  // Silently ignore props that are not supported by `SelectItemAlignedPosition`

  const selectPosition = useSelectPosition({
    onPlaced() {
      oncontextmenu
      isPositioned.value = true
    },
    ...(position === 'popper'
      ? {
          side,
          sideOffset,
          align,
          alignOffset,
          arrowPadding,
          collisionBoundary,
          collisionPadding,
          sticky,
          hideWhenDetached,
          avoidCollisions,
        }
      : {}),
  })

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return
    }
    const isModifierKey = event.ctrlKey || event.altKey || event.metaKey

    // select should not be navigated using tab key so we prevent it
    if (event.key === 'Tab')
      event.preventDefault()

    if (!isModifierKey && event.key.length === 1)
      handleTypeaheadSearch(event.key)

    if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      let candidateNodes = getItems().filter(item => !item.$$rcid.$select.disabled)

      if (['ArrowUp', 'End'].includes(event.key)) {
        candidateNodes = candidateNodes.slice().reverse()
      }
      if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
        const currentElement = event.target as CollectionItemWithData<HTMLElement, ItemData>
        const currentIndex = candidateNodes.indexOf(currentElement)
        candidateNodes = candidateNodes.slice(currentIndex + 1)
      }

      /**
       * Imperative focus during keydown is risky so we prevent React's batching updates
       * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
       */
      setTimeout(() => focusFirst(candidateNodes))

      event.preventDefault()
    }
  }

  function onContextmenu(event: Event) {
    event.preventDefault()
  }

  const focusScope = useFocusScope({
    // we make sure we're not trapping once it's been closed
    // (closed !== unmounted when animating out)
    trapped() {
      return context.open.value
    },
    onMountAutoFocus(event) {
      // we prevent open autofocus because we manually focus the selected item
      event.preventDefault()
    },
    onUnmountAutoFocus(event) {
      props.onCloseAutoFocus?.(event)
      if (event.defaultPrevented) {
        return
      }

      context.trigger.value?.focus({ preventScroll: true })
      event.preventDefault()
    },
  })

  const dismissableLayer = useDismissableLayer({
    disableOutsidePointerEvents() {
      return true
    },
    onEscapeKeydown: props.onEscapeKeyDown,
    onPointerdownOutside: props.onPointerdownOutside,
    onFocusOutside(event) {
      event.preventDefault()
    },
    onDismiss() {
      context.onOpenChange(false)
    },
  })

  const style: PrimitiveElAttrs['style'] = {
    // flex layout so we can place the scroll buttons properly
    display: 'flex',
    flexDirection: 'column',
    // reset the outline by default as the content MAY get focused
    outline: 'none',
  }

  return {
    wrapperAttrs: selectPosition.wrapperAttrs,
    attrs(extraAttrs = []) {
      const selectPositionAttrs: PrimitiveElAttrs = {
        'role': 'listbox',
        'id': context.contentId,
        'data-state': context.open.value ? 'open' : 'closed',
        style,
        onContextmenu,
        onKeydown,
      }

      return selectPosition.attrs([dismissableLayer.attrs(), focusScope.attrs(), selectPositionAttrs, ...extraAttrs])
    },
  }
}
