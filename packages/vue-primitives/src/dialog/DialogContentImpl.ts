import type { EmitsToHookProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { hideOthers } from 'aria-hidden'
import { onBeforeUnmount } from 'vue'
import { type DismissableLayerEmits, useDismissableLayer, type UseDismissableLayerProps } from '../dismissable-layer/index.ts'
import { useFocusGuards } from '../focus-guards/index.ts'
import { useFocusScope } from '../focus-scope/index.ts'
import { useRef } from '../hooks/useRef.ts'
import { mergeHooksAttrs } from '../shared/index.ts'
import { useDialogContext } from './DialogRoot.ts'

export type DialogContentImplEmits = DialogContentImplPublicEmits & Omit<DismissableLayerEmits, 'dismiss'>

// eslint-disable-next-line ts/consistent-type-definitions
export type DialogContentImplPublicEmits = {
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
}

export interface UseDialogContentProps extends Omit<UseDialogContentInnerImplProps, 'trapFocus' | 'disableOutsidePointerEvents'> { }

export function useDialogContentImpl(props: UseDialogContentProps): RadixPrimitiveReturns {
  const context = useDialogContext('DialogContent')

  const useDialogContentImpl = context.modal ? useDialogContentModal : useDialogContentNonModal

  const dialogContentImpl = useDialogContentImpl({
    onOpenAutoFocus: props.onOpenAutoFocus,
    onCloseAutoFocus: props.onCloseAutoFocus,
    onEscapeKeydown: props.onEscapeKeydown,
    onPointerdownOutside: props.onPointerdownOutside,
    onFocusOutside: props.onFocusOutside,
    onInteractOutside: props.onInteractOutside,
  })

  return {
    attrs(extraAttrs = []) {
      const attrs = dialogContentImpl.attrs()

      if (extraAttrs) {
        mergeHooksAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}

export function useDialogContentModal(props: UseDialogContentProps): RadixPrimitiveReturns {
  const el = useRef<HTMLElement>()
  const setTemplateEl = (value: HTMLElement | undefined) => el.value = value

  const context = useDialogContext('DialogContentModal')

  // aria-hide everything except the content (better supported equivalent to setting aria-modal)
  onBeforeUnmount(() => {
    if (el.value)
      hideOthers(el.value)
  })

  const dialogContentImpl = useDialogContentInnerImpl({
    trapFocus: false,
    disableOutsidePointerEvents: false,
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

  return {
    attrs(extraAttrs = []) {
      const attrs = {
        ref: setTemplateEl,
      }

      if (extraAttrs) {
        mergeHooksAttrs(attrs, [dialogContentImpl.attrs(), ...extraAttrs])
      }

      return attrs
    },
  }
}

export function useDialogContentNonModal(props: UseDialogContentProps): RadixPrimitiveReturns {
  const context = useDialogContext('DialogContentNonModal')

  let hasInteractedOutsideRef = false
  let hasPointerDownOutsideRef = false

  const dialogContentImpl = useDialogContentInnerImpl({
    trapFocus: false,
    disableOutsidePointerEvents: false,
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
      hasPointerDownOutsideRef = false
    },
    onOpenAutoFocus: props.onOpenAutoFocus,
    onInteractOutside(event) {
      props.onInteractOutside?.(event)

      if (!event.defaultPrevented) {
        hasInteractedOutsideRef = true
        if (event.detail.originalEvent.type === 'pointerdown') {
          hasPointerDownOutsideRef = true
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
      if (event.detail.originalEvent.type === 'focusin' && hasPointerDownOutsideRef) {
        event.preventDefault()
      }
    },
    onPointerdownOutside: props.onPointerdownOutside,
    onFocusOutside: props.onFocusOutside,
    onEscapeKeydown: props.onEscapeKeydown,
  })

  return {
    attrs(extraAttrs = []) {
      const attrs = dialogContentImpl.attrs()

      if (extraAttrs) {
        mergeHooksAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}

export interface UseDialogContentInnerImplProps extends EmitsToHookProps<DialogContentImplPublicEmits>, Omit<UseDismissableLayerProps, 'el' | 'onDismiss'> {
  trapFocus?: boolean
}

export function useDialogContentInnerImpl(props: UseDialogContentInnerImplProps): RadixPrimitiveReturns {
  const context = useDialogContext('DialogContentNonModal')

  // Make sure the whole tree has focus guards as our `Dialog` will be
  // the last element in the DOM (because of the `Portal`)
  useFocusGuards()

  const dismissableLayer = useDismissableLayer({
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
    loop: true,
    trapped: props.trapFocus,
    onMountAutoFocus: props.onOpenAutoFocus,
    onUnmountAutoFocus: props.onCloseAutoFocus,
  })

  return {
    attrs(extraAttrs = []) {
      const attrs = {
        'role': 'dialog',
        'id': context.contentId,
        'aria-describedby': context.descriptionId,
        'aria-labelledby': context.titleId,
        'data-state': context.open.value ? 'open' : 'closed',
      }

      mergeHooksAttrs(attrs, [dismissableLayer.attrs(), focusScope.attrs(), ...extraAttrs])
      console.error('Content attrs', attrs)

      return attrs
    },
  }
}
