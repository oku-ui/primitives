import type { DismissableLayerEmits, UseDismissableLayerProps } from '../dismissable-layer/index.ts'
import type { EmitsToHookProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { hideOthers } from 'aria-hidden'
import { onBeforeUnmount, onMounted, shallowRef } from 'vue'
import { useDismissableLayer } from '../dismissable-layer/index.ts'
import { useFocusGuards } from '../focus-guards/index.ts'
import { useFocusScope } from '../focus-scope/index.ts'
import { useDialogContext } from './DialogRoot.ts'

export type DialogContentImplEmits = {
  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  openAutoFocus: [event: Event]
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: Event]
} & Omit<DismissableLayerEmits, 'dismiss'>

export interface UseDialogContentImplProps extends Omit<UseDialogContentImplSharedProps, 'trapFocus' | 'disableOutsidePointerEvents'> { }

export function useDialogContentImpl(props: UseDialogContentImplProps): RadixPrimitiveReturns {
  const context = useDialogContext('DialogContent')

  const useDialogContent = context.modal ? useDialogContentImplModal : useDialogContentImplNonModal

  return useDialogContent(props)
}

export function useDialogContentImplModal(props: UseDialogContentImplProps): RadixPrimitiveReturns {
  const context = useDialogContext('DialogContentModal')

  // aria-hide everything except the content (better supported equivalent to setting aria-modal)
  let clearHideOthers: (() => void) | undefined

  onMounted(() => {
    if (context.content.value)
      clearHideOthers = hideOthers(context.content.value)
  })

  onBeforeUnmount(() => {
    clearHideOthers?.()
    clearHideOthers = undefined
  })

  return useDialogContentImplShared({
    trapFocus() {
      return context.open.value
    },
    disableOutsidePointerEvents() {
      return true
    },
    onCloseAutoFocus(event) {
      props.onCloseAutoFocus?.(event)
      if (event.defaultPrevented)
        return

      event.preventDefault()
      context.triggerRef.value?.focus()
    },
    onOpenAutoFocus: props.onOpenAutoFocus,
    onInteractOutside: props.onInteractOutside,
    onPointerdownOutside(event) {
      props.onPointerdownOutside?.(event)
      if (event.defaultPrevented)
        return
      const originalEvent = event.detail.originalEvent
      const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true
      const isRightClick = originalEvent.button === 2 || ctrlLeftClick

      // If the event is a right-click, we shouldn't close because
      // it is effectively as if we right-clicked the `Overlay`.
      if (isRightClick)
        event.preventDefault()
    },
    onFocusOutside(event) {
      props.onFocusOutside?.(event)
      if (event.defaultPrevented)
        return

      event.preventDefault()
    },
    onEscapeKeydown: props.onEscapeKeydown,
  })
}

export function useDialogContentImplNonModal(props: UseDialogContentImplProps): RadixPrimitiveReturns {
  const context = useDialogContext('DialogContentNonModal')

  let hasInteractedOutsideRef = false
  let hasPointerdownOutsideRef = false

  return useDialogContentImplShared({
    trapFocus() {
      return false
    },
    disableOutsidePointerEvents() {
      return false
    },
    onCloseAutoFocus(event) {
      props.onCloseAutoFocus?.(event)

      if (!event.defaultPrevented) {
        if (!hasInteractedOutsideRef) {
          context.triggerRef.value?.focus()
        }
        // Always prevent auto focus because we either focus manually or want user agent focus
        event.preventDefault()
      }

      hasInteractedOutsideRef = false
      hasPointerdownOutsideRef = false
    },
    onOpenAutoFocus: props.onOpenAutoFocus,
    onInteractOutside(event) {
      props.onInteractOutside?.(event)

      if (!event.defaultPrevented) {
        hasInteractedOutsideRef = true
        if (event.detail.originalEvent.type === 'pointerdown') {
          hasPointerdownOutsideRef = true
        }
      }

      // Prevent dismissing when clicking the trigger.
      // As the trigger is already setup to close, without doing so would
      // cause it to close and immediately open.
      const target = event.target as HTMLElement
      const targetIsTrigger = context.triggerRef.value?.contains(target)
      if (targetIsTrigger)
        event.preventDefault()

      // On Safari if the trigger is inside a container with tabIndex={0}, when clicked
      // we will get the pointer down outside event on the trigger, but then a subsequent
      // focus outside event on the container, we ignore any focus outside event when we've
      // already had a pointer down outside event.
      if (event.detail.originalEvent.type === 'focusin' && hasPointerdownOutsideRef) {
        event.preventDefault()
      }
    },
    onPointerdownOutside: props.onPointerdownOutside,
    onFocusOutside: props.onFocusOutside,
    onEscapeKeydown: props.onEscapeKeydown,
  })
}

export interface UseDialogContentImplSharedProps extends EmitsToHookProps<DialogContentImplEmits>, Omit<UseDismissableLayerProps, 'onDismiss'> {
  trapFocus?: () => boolean
}

export function useDialogContentImplShared(props: UseDialogContentImplSharedProps): RadixPrimitiveReturns {
  const context = useDialogContext('DialogContentNonModal')

  const el = props.el || shallowRef<HTMLElement>()
  const setElRef = props.el
    ? undefined
    : (value: HTMLElement | undefined) => {
        el.value = value
        context.content.value = value
      }

  // Make sure the whole tree has focus guards as our `Dialog` will be
  // the last element in the DOM (because of the `Portal`)
  useFocusGuards()

  const dismissableLayer = useDismissableLayer({
    el,
    disableOutsidePointerEvents: props.disableOutsidePointerEvents,
    onPointerdownOutside: props.onPointerdownOutside,
    onFocusOutside: props.onFocusOutside,
    onInteractOutside: props.onInteractOutside,
    onEscapeKeydown: props.onEscapeKeydown,
    onDismiss() {
      context.onOpenChange(false)
    },
  })

  const focusScope = useFocusScope({
    el,
    loop: true,
    trapped: props.trapFocus,
    onMountAutoFocus: props.onOpenAutoFocus,
    onUnmountAutoFocus: props.onCloseAutoFocus,
  })

  return {
    attrs(extraAttrs = []) {
      const dismissableAttrs = {
        'elRef': setElRef,
        'role': 'dialog',
        'id': context.contentId,
        'aria-describedby': context.descriptionId,
        'aria-labelledby': context.titleId,
        'data-state': context.open.value ? 'open' : 'closed',
      }

      return dismissableLayer.attrs([focusScope.attrs(), dismissableAttrs, ...extraAttrs])
    },
  }
}
