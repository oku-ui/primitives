import type { Side } from '@floating-ui/utils'
import type { IAttrsData } from '../shared/mergeProps.ts'
import type { EmitsToHookProps, PrimitiveElAttrs, RadixPrimitiveGetAttrs } from '../shared/typeUtils.ts'
import { hideOthers } from 'aria-hidden'
import { onBeforeUnmount, shallowRef } from 'vue'
import { type DismissableLayerEmits, type DismissableLayerProps, useDismissableLayer } from '../dismissable-layer/index.ts'
import { useFocusGuards } from '../focus-guards/FocusGuards.ts'
import { type FocusScopeProps, useFocusScope } from '../focus-scope/index.ts'
import { useBodyScrollLock, useRef } from '../hooks/index.ts'
import { createContext, type MutableRefObject } from '../hooks/index.ts'
import { type PopperContentProps, usePopperContent, type UsePopperContentProps, usePopperContext } from '../popper/index.ts'
import { type RovingFocusGroupRootEmits, useRovingFocusGroupRoot } from '../roving-focus/index.ts'
import { focusFirst } from '../shared/focusFirst.ts'
import { Collection, FIRST_LAST_KEYS, LAST_KEYS, useCollection, useMenuContext, useMenuRootContext } from './MenuRoot.ts'

import { getNextMatch, type GraceIntent, isPointerInGraceArea } from './utils.ts'

export interface MenuContentImplProps extends Omit<PopperContentProps, 'dir'> {
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: boolean
}

export type MenuContentImplEmits = UseMenuContentImplSharedEmits
export interface MenuContentContext {
  onItemEnter: (event: PointerEvent) => void
  onItemLeave: (event: PointerEvent) => void
  onTriggerLeave: (event: PointerEvent) => void
  searchRef: MutableRefObject<string>
  pointerGraceTimerRef: MutableRefObject<number>
  onPointerGraceIntentChange: (intent: GraceIntent | undefined) => void
}

export const [provideMenuContentContext, useMenuContentContext] = createContext<MenuContentContext>('MenuContent')

export interface UseMenuContentImplProps extends Omit<UseMenuContentImplSharedProps, keyof UseMenuContentImplSharedPrivateProps> { }

export function useMenuContentImpl(props: UseMenuContentImplProps = {}): UseMenuContentImplSharedPeturns {
  const context = useMenuRootContext('MenuContentImpl')

  const useMenuContent = context.modal ? useMenuContentImplModal : useMenuContentImplNonModal

  return useMenuContent(props)
}

export function useMenuContentImplModal(props: UseMenuContentImplProps = {}): UseMenuContentImplSharedPeturns {
  const context = useMenuContext('MenuContentImpl')
  const popperContext = usePopperContext('MenuContentImpl')

  // Hide everything from ARIA except the `MenuContent`
  onBeforeUnmount(() => {
    if (popperContext.content.value)
      hideOthers(popperContext.content.value)
  })

  return useMenuContentImplShared({
    ...props,
    trapFocus() {
      return context.open()
    },
    disableOutsidePointerEvents() {
      return true
    },
    disableOutsideScroll: true,
    // When focus is trapped, a `focusout` event may still happen.
    // We make sure we don't trigger our `onDismiss` in such case.
    onFocusOutside(event) {
      event.preventDefault()
    },
    onDismiss() {
      context.onOpenChange(false)
    },
  })
}

export function useMenuContentImplNonModal(props: UseMenuContentImplProps = {}): UseMenuContentImplSharedPeturns {
  const context = useMenuContext('MenuContentImpl')

  return useMenuContentImplShared({
    ...props,
    trapFocus() {
      return false
    },
    disableOutsidePointerEvents() {
      return false
    },
    disableOutsideScroll: false,
    onDismiss() {
      context.onOpenChange(false)
    },
  })
}

export type UseMenuContentImplSharedEmits = {
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: Event]

  entryFocus: RovingFocusGroupRootEmits['entryFocus']

  escapeKeydown: DismissableLayerEmits['escapeKeydown']

  pointerdownOutside: DismissableLayerEmits['pointerdownOutside']

  focusOutside: DismissableLayerEmits['focusOutside']

  interactOutside: DismissableLayerEmits['interactOutside']
}

export type UseMenuContentImplSharedPrivateEmits = {
  openAutoFocus: [event: Event]

  dismiss: DismissableLayerEmits['dismiss']
}

export interface UseMenuContentImplSharedPrivateProps extends EmitsToHookProps<UseMenuContentImplSharedPrivateEmits> {
  disableOutsidePointerEvents?: DismissableLayerProps['disableOutsidePointerEvents']

  disableOutsideScroll?: boolean

  trapFocus?: FocusScopeProps['trapped']
}

export interface UseMenuContentImplSharedProps extends EmitsToHookProps<MenuContentImplEmits & UseMenuContentImplSharedPrivateEmits> {
  disableOutsidePointerEvents?: () => boolean
  disableOutsideScroll?: boolean
  trapFocus?: () => boolean
  loop?: boolean

  popperProps?: Omit<UsePopperContentProps, 'dir' | 'onPlaced'>
}

export interface UseMenuContentImplSharedPeturns {
  wrapperAttrs: () => IAttrsData
  attrs: RadixPrimitiveGetAttrs
}

export function useMenuContentImplShared(props: UseMenuContentImplSharedProps = {}): UseMenuContentImplSharedPeturns {
  const context = useMenuContext('MenuContentImpl')
  const rootContext = useMenuRootContext('MenuContentImpl')
  const popperContext = usePopperContext('MenuContentImpl')

  const currentItemId = shallowRef<string>()

  const elRef = useRef<HTMLElement>()
  function setTemplateEl(value: HTMLElement | undefined) {
    elRef.value = value
    popperContext.content.value = value
  }

  const getItems = useCollection(Collection.provideCollectionContext(elRef))

  let timerRef = 0
  const searchRef = useRef('')
  const pointerGraceTimerRef = useRef(0)
  let pointerGraceIntentRef: GraceIntent | undefined
  let pointerDirRef: Side = 'right'
  let lastPointerXRef = 0

  const unlock = props.disableOutsideScroll ? useBodyScrollLock() : undefined

  function handleTypeaheadSearch(key: string) {
    const search = searchRef.value + key
    const items = getItems().filter(item => !item.$$rcid.menu.disabled)
    const currentItem = document.activeElement
    const currentMatch = items.find(item => item === currentItem)?.$$rcid.menu.textValue
    const values = items.map(item => item.$$rcid.menu.textValue)
    const nextMatch = getNextMatch(values, search, currentMatch)
    const newItem = items.find(item => item.$$rcid.menu.textValue === nextMatch);

    // Reset `searchRef` 1 second after it was last updated
    (function updateSearch(value: string) {
      searchRef.value = value
      window.clearTimeout(timerRef)
      timerRef = 0
      if (value !== '') {
        timerRef = window.setTimeout(() => {
          updateSearch('')
          timerRef = 0
        }, 1000)
      }
    })(search)

    if (newItem) {
      /**
       * Imperative focus during keydown is risky so we prevent React's batching updates
       * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
       */
      setTimeout(() => {
        ; (newItem as HTMLElement).focus()
      })
    }
  }

  onBeforeUnmount(() => {
    if (timerRef)
      window.clearTimeout(timerRef)
    unlock?.()
  })

  // Make sure the whole tree has focus guards as our `MenuContent` may be
  // the last element in the DOM (because of the `Portal`)
  useFocusGuards()

  function isPointerMovingToSubmenu(event: PointerEvent) {
    const isMovingTowards = pointerDirRef === pointerGraceIntentRef?.side

    return isMovingTowards && isPointerInGraceArea(event, pointerGraceIntentRef?.area)
  }

  provideMenuContentContext({
    onItemEnter(event) {
      if (isPointerMovingToSubmenu(event)) {
        event.preventDefault()
      }
    },
    onItemLeave(event) {
      if (isPointerMovingToSubmenu(event))
        return

      popperContext.content.value?.focus()
      currentItemId.value = undefined
    },
    onTriggerLeave(event) {
      if (isPointerMovingToSubmenu(event)) {
        event.preventDefault()
      }
    },
    searchRef,
    pointerGraceTimerRef,
    onPointerGraceIntentChange(intent) {
      pointerGraceIntentRef = intent
    },
  })

  // Hanldlers

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented)
      return
    // submenu key events bubble through portals. We only care about keys in this menu.
    const target = event.target as HTMLElement
    const isKeyDownInside = target.closest('[data-radix-menu-content]') === event.currentTarget
    const isModifierKey = event.ctrlKey || event.altKey || event.metaKey
    const isCharacterKey = event.key.length === 1

    if (isKeyDownInside) {
      // menus should not be navigated using tab key so we prevent it
      if (event.key === 'Tab') {
        event.preventDefault()
      }

      if (!isModifierKey && isCharacterKey)
        handleTypeaheadSearch(event.key)
    }

    // focus first/last item based on key pressed
    const content = popperContext.content.value

    if (event.target !== content)
      return

    if (!FIRST_LAST_KEYS.includes(event.key))
      return

    event.preventDefault()
    const candidateNodes = getItems().filter(item => !item.$$rcid.menu.disabled)

    if (LAST_KEYS.includes(event.key))
      candidateNodes.reverse()
    focusFirst(candidateNodes)
  }

  function onBlur(event: FocusEvent) {
    if (event.defaultPrevented)
      return
    // clear search buffer when leaving the menu
    if (!(event.currentTarget as HTMLElement | null)?.contains(event.target as HTMLElement | null)) {
      if (timerRef)
        window.clearTimeout(timerRef)
      searchRef.value = ''
    }
  }

  function onPointermove(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    if (event.pointerType !== 'mouse')
      return
    const target = event.target as HTMLElement
    const pointerXHasChanged = lastPointerXRef !== event.clientX

    // We don't use `event.movementX` for this check because Safari will
    // always return `0` on a pointer event.
    if ((event.currentTarget as HTMLElement | null)?.contains(target) && pointerXHasChanged) {
      const newDir = event.clientX > lastPointerXRef ? 'right' : 'left'
      pointerDirRef = newDir
      lastPointerXRef = event.clientX
    }
  }

  const focusScope = useFocusScope({
    el: popperContext.content,
    trapped: props.trapFocus,
    onMountAutoFocus(event) {
      props.onOpenAutoFocus?.(event)
      if (event.defaultPrevented)
        return
      // when opening, explicitly focus the content area only and leave
      // `onEntryFocus` in  control of focusing first item

      event.preventDefault()
      popperContext.content.value?.focus({ preventScroll: true })
    },
    onUnmountAutoFocus: props.onCloseAutoFocus,
  })

  const dismissableLayer = useDismissableLayer({
    el: popperContext.content,
    disableOutsidePointerEvents: props.disableOutsidePointerEvents,
    onInteractOutside: props.onInteractOutside,
    onEscapeKeydown: props.onEscapeKeydown,
    onDismiss: props.onDismiss,
    onFocusOutside: props.onFocusOutside,
    onPointerdownOutside: props.onPointerdownOutside,
  })

  const rovingFocusGroupRoot = useRovingFocusGroupRoot({
    elRef,
    currentTabStopId() {
      return currentItemId.value
    },
    onUpdateCurrentTabStopId(tabStopId) {
      currentItemId.value = tabStopId
    },
    preventScrollOnEntryFocus: true,
    orientation: 'vertical',
    loop: props.loop,
    dir: rootContext.dir,
    onEntryFocus(event) {
      props.onEntryFocus?.(event)
      if (event.defaultPrevented)
        return
      // only focus first item when using keyboard
      if (!rootContext.isUsingKeyboardRef.value) {
        event.preventDefault()
      }
    },
  })

  const popperContent = usePopperContent(props.popperProps)

  return {
    wrapperAttrs: popperContent.wrapperAttrs,
    attrs(extraAttrs = []) {
      const popperAttrs: PrimitiveElAttrs = {
        'elRef': setTemplateEl,
        'role': 'menu',
        'aria-orientation': 'vertical',
        'data-state': context.open() ? 'open' : 'closed',
        'data-radix-menu-content': '',
        'dir': rootContext.dir.value,
        'style': {
          outline: 'none',
        },
        onKeydown,
        onBlur,
        onPointermove,
      }

      return popperContent.attrs([rovingFocusGroupRoot.attrs(), dismissableLayer.attrs(), focusScope.attrs(), popperAttrs, ...extraAttrs])
    },
  }
}
