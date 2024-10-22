import type { PrimitiveProps } from '../primitive/index.ts'
import type { PrimitiveElAttrs, RadixPrimitiveGetAttrs, RadixPrimitiveReturns } from '../shared/typeUtils.ts'
import { isClient } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, onWatcherCleanup, type Ref, watchEffect } from 'vue'
import { useDismissableLayerBranch } from '../dismissable-layer/index.ts'
import { useRef } from '../hooks/useRef.ts'
import { focusFirst } from '../shared/focusFirst.ts'
import { type IAttrsData, mergePrimitiveAttrs } from '../shared/mergeProps.ts'
import { VISUALLY_HIDDEN_STYLE } from '../visually-hidden/VisuallyHidden.ts'
import { Collection, useCollection } from './collection.ts'
import { useToastProviderContext } from './ToastProvider.ts'
import { getTabbableCandidates } from './utils.ts'

export interface ToastViewportProps {
  as?: PrimitiveProps['as']
  /**
   * The keys to use as the keyboard shortcut that will move focus to the toast viewport.
   * @defaultValue ['F8']
   */
  hotkey?: string[]
  /**
   * An author-localized label for the toast viewport to provide context for screen reader users
   * when navigating page landmarks. The available `{hotkey}` placeholder will be replaced for you.
   * @defaultValue 'Notifications ({hotkey})'
   */
  label?: string
}

export const VIEWPORT_PAUSE = 'toast.viewportPause'
export const VIEWPORT_RESUME = 'toast.viewportResume'

export interface UseToastViewportProps {
  hotkey?: string[]
  label?: string
}

export function useToastViewport(props: UseToastViewportProps = {}): RadixPrimitiveReturns<{
  isShowFocusProxy: Ref<boolean>
  wrapperAttrs: () => PrimitiveElAttrs
  headFocusProxy: () => PrimitiveElAttrs
  tailFocusProxy: () => PrimitiveElAttrs
  attrs: RadixPrimitiveGetAttrs
}> {
  const {
    hotkey = ['F8'],
    label = 'Notifications ({hotkey})',
  } = props

  const context = useToastProviderContext('ToastViewport')

  const wrapperRef = useRef<HTMLElement>()
  function setWrapperEl(v: any) {
    wrapperRef.value = v
  }
  let headFocusProxyRef: HTMLElement | undefined
  function setHeadFocusProxyEl(v: any) {
    headFocusProxyRef = v
  }
  let tailFocusProxyRef: HTMLElement | undefined
  function setTailFocusProxyRef(v: any) {
    headFocusProxyRef = v
  }
  const viewportRef = useRef<HTMLElement>()

  const collеctionContext = Collection.provideCollectionContext(viewportRef)
  const getItems = useCollection(collеctionContext)

  function setViewportEl(v: HTMLElement | undefined) {
    viewportRef.value = v
    context.viewport.value = v
  }

  const ariaLabel = label.replace('{hotkey}', hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, ''))

  const hasToasts = computed(() => context.toastCount.value > 0)

  if (isClient) {
    function handlePause() {
      if (!context.isClosePausedRef.value) {
        const pauseEvent = new CustomEvent(VIEWPORT_PAUSE)
        viewportRef.value?.dispatchEvent(pauseEvent)
        context.isClosePausedRef.value = true
      }
    }

    function handleResume() {
      if (context.isClosePausedRef.value) {
        const resumeEvent = new CustomEvent(VIEWPORT_RESUME)
        viewportRef.value?.dispatchEvent(resumeEvent)
        context.isClosePausedRef.value = false
      }
    }

    function handleFocusOutResume(event: FocusEvent) {
      const isFocusMovingOutside = !wrapperRef.value?.contains(event.relatedTarget as HTMLElement)
      if (isFocusMovingOutside)
        handleResume()
    }

    function handlePointerLeaveResume() {
      const isFocusInside = wrapperRef.value?.contains(document.activeElement)
      if (!isFocusInside)
        handleResume()
    }

    watchEffect(() => {
      const wrapper = wrapperRef.value
      if (!hasToasts.value || !wrapper || !viewportRef.value)
        return

      // Toasts are not in the viewport React tree so we need to bind DOM events
      wrapper.addEventListener('focusin', handlePause)
      wrapper.addEventListener('focusout', handleFocusOutResume)
      wrapper.addEventListener('pointermove', handlePause)
      wrapper.addEventListener('pointerleave', handlePointerLeaveResume)
      window.addEventListener('blur', handlePause)
      window.addEventListener('focus', handleResume)

      onWatcherCleanup(() => {
        wrapper.removeEventListener('focusin', handlePause)
        wrapper.removeEventListener('focusout', handleFocusOutResume)
        wrapper.removeEventListener('pointermove', handlePause)
        wrapper.removeEventListener('pointerleave', handlePointerLeaveResume)
        window.removeEventListener('blur', handlePause)
        window.removeEventListener('focus', handleResume)
      })
    })
  }

  function getSortedTabbableCandidates({ tabbingDirection }: { tabbingDirection: 'forwards' | 'backwards' }) {
    const toastItems = getItems()

    const tabbableCandidates: HTMLElement[][] = []

    for (const toastItem of toastItems) {
      const toastNode = toastItem
      const toastTabbableCandidates = [toastNode, ...getTabbableCandidates(toastNode)]

      tabbableCandidates.push(tabbingDirection === 'forwards' ? toastTabbableCandidates : toastTabbableCandidates.reverse())
    }

    return (tabbingDirection === 'forwards' ? tabbableCandidates.reverse() : tabbableCandidates).flat()
  }

  function handleViewportKeydown(event: KeyboardEvent) {
    const isMetaKey = event.altKey || event.ctrlKey || event.metaKey
    const isTabKey = event.key === 'Tab' && !isMetaKey

    if (!isTabKey)
      return

    const focusedElement = document.activeElement
    const isTabbingBackwards = event.shiftKey
    const targetIsViewport = event.target === viewportRef.value

    // If we're back tabbing after jumping to the viewport then we simply
    // proxy focus out to the preceding document
    if (targetIsViewport && isTabbingBackwards) {
      headFocusProxyRef?.focus()
      return
    }

    const tabbingDirection = isTabbingBackwards ? 'backwards' : 'forwards'
    const sortedCandidates = getSortedTabbableCandidates({ tabbingDirection })
    const index = sortedCandidates.findIndex(candidate => candidate === focusedElement)

    if (focusFirst(sortedCandidates.slice(index + 1))) {
      event.preventDefault()
    }
    else {
      // If we can't focus that means we're at the edges so we
      // proxy to the corresponding exit point and let the browser handle
      // tab/shift+tab keypress and implicitly pass focus to the next valid element in the document
      if (isTabbingBackwards)
        headFocusProxyRef?.focus()
      else
        tailFocusProxyRef?.focus()
    }
  }

  function handleDocumentKeydown(event: KeyboardEvent) {
    // we use `event.code` as it is consistent regardless of meta keys that were pressed.
    // for example, `event.key` for `Control+Alt+t` is `†` and `t !== †`
    const isHotkeyPressed = hotkey.every(key => (event as any)[key] || event.code === key)
    if (isHotkeyPressed)
      viewportRef.value?.focus()
  }

  onMounted(() => {
    // We programmatically manage tabbing as we are unable to influence
    // the source order with portals, this allows us to reverse the
    // tab order so that it runs from most recent toast to least

    // Toasts are not in the viewport React tree so we need to bind DOM events
    viewportRef.value?.addEventListener('keydown', handleViewportKeydown)

    document.addEventListener('keydown', handleDocumentKeydown)
  })

  onBeforeUnmount(() => {
    viewportRef.value?.removeEventListener('keydown', handleViewportKeydown)

    document.removeEventListener('keydown', handleDocumentKeydown)
  })

  function useFocusProxyHandler(cb: () => void) {
    return (event: FocusEvent) => {
      const prevFocusedElement = event.relatedTarget as HTMLElement | null
      const isFocusFromOutsideViewport = !context.viewport.value?.contains(prevFocusedElement)
      if (!isFocusFromOutsideViewport)
        return
      cb()
    }
  }

  const handleHeadFocusProxyFocus = useFocusProxyHandler(() => {
    const tabbableCandidates = getSortedTabbableCandidates({
      tabbingDirection: 'forwards',
    })
    focusFirst(tabbableCandidates)
  })

  const handleTailFocusProxyFocus = useFocusProxyHandler(() => {
    const tabbableCandidates = getSortedTabbableCandidates({
      tabbingDirection: 'backwards',
    })
    focusFirst(tabbableCandidates)
  })

  const dismissableLayerBranch = useDismissableLayerBranch({ elRef: wrapperRef })

  const headFocusProxyAttrs: IAttrsData = {
    'ref': setHeadFocusProxyEl,
    'aria-hidden': true,
    'tabindex': 0,
    'style': {
      ...VISUALLY_HIDDEN_STYLE,
      position: 'fixed',
    },
    'onFocus': handleHeadFocusProxyFocus,
  }

  const tailFocusProxyAttrs: IAttrsData = {
    'ref': setTailFocusProxyRef,
    'aria-hidden': true,
    'tabindex': 0,
    'style': {
      ...VISUALLY_HIDDEN_STYLE,
      position: 'fixed',
    },
    'onFocus': handleTailFocusProxyFocus,
  }

  return {
    isShowFocusProxy: hasToasts,
    wrapperAttrs() {
      const attrs: IAttrsData = {
        'ref': setWrapperEl,
        'role': 'region',
        'aria-label': ariaLabel,
        'tabindex': -1,
        'style': {
          // incase list has size when empty (e.g. padding), we remove pointer events so
          // it doesn't prevent interactions with page elements that it overlays
          pointerEvents: hasToasts.value ? undefined : 'none',
        },
      }

      return dismissableLayerBranch.attrs([attrs])
    },
    headFocusProxy() {
      return headFocusProxyAttrs
    },
    tailFocusProxy() {
      return tailFocusProxyAttrs
    },
    attrs(extraAttrs) {
      const attrs = {
        elRef: setViewportEl,
        tabindex: -1,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
