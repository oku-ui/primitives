import type { EmitsToHookProps, IAttrsData, PrimitiveDefaultProps, RadixPrimitiveGetAttrs } from '../shared/index.ts'
import { hideOthers } from 'aria-hidden'
import { onBeforeUnmount } from 'vue'
import { type DismissableLayerEmits, useDismissableLayer } from '../dismissable-layer/index.ts'
import { useFocusGuards } from '../focus-guards/index.ts'
import { useFocusScope } from '../focus-scope/index.ts'
import { useBodyScrollLock } from '../hooks/index.ts'
import { type PopperContentProps, usePopperContent, type UsePopperContentProps, usePopperContext } from '../popper/index.ts'
import { usePopoverContext } from './PopoverRoot.ts'

export interface PopoverContentImplProps extends PopperContentProps { }

export const DEFAULT_POPOVER_CONTENT_IMPL_PROPS = {
  avoidCollisions: undefined,
  hideWhenDetached: undefined,
} satisfies PrimitiveDefaultProps<PopoverContentImplProps>

export type PopoverContentImplEmits = {
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

export interface UsePopoverContentImplProps extends Omit<UsePopoverContentImplSharedProps, 'trapFocus' | 'disableOutsidePointerEvents'> { }

export function usePopoverContentImpl(props: UsePopoverContentImplProps): UsePopoverContentImplSharedPeturns {
  const context = usePopoverContext('PopoverContentImpl')

  const usePopoverContent = context.modal ? usePopoverContentModal : usePopoverContentNonModal

  return usePopoverContent(props)
}

export function usePopoverContentModal(props: UsePopoverContentImplProps): UsePopoverContentImplSharedPeturns {
  const context = usePopoverContext('PopoverContentModal')
  const popperContext = usePopperContext('PopoverContentModal')
  let isRightClickOutsideRef = false

  const unlock = useBodyScrollLock()

  onBeforeUnmount(() => {
    unlock()
    if (popperContext.content.value)
      hideOthers(popperContext.content.value)
  })

  return usePopoverContentImplShared({
    ...props,
    onCloseAutoFocus(event) {
      if (event.defaultPrevented) {
        return
      }
      event.preventDefault()
      if (!isRightClickOutsideRef)
        context.triggerRef.value?.focus()
    },
    onPointerdownOutside(event) {
      props.onPointerdownOutside?.(event)
      const originalEvent = event.detail.originalEvent
      const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true
      const isRightClick = originalEvent.button === 2 || ctrlLeftClick

      isRightClickOutsideRef = isRightClick
    },
    // When focus is trapped, a `focusout` event may still happen.
    // We make sure we don't trigger our `onDismiss` in such case.
    onFocusOutside(event) {
      props.onFocusOutside?.(event)
      event.preventDefault()
    },
  })
}

export function usePopoverContentNonModal(props: UsePopoverContentImplProps): UsePopoverContentImplSharedPeturns {
  const context = usePopoverContext('PopoverContentNonModal')
  let hasInteractedOutsideRef = false
  let hasPointerdownOutsideRef = false

  return usePopoverContentImplShared({
    ...props,
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
    onInteractOutside(event: DismissableLayerEmits['interactOutside'][0]) {
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
  })
}

export interface UsePopoverContentImplSharedProps extends EmitsToHookProps<PopoverContentImplEmits>, Omit<UsePopperContentProps, 'onPlaced'> {

}

export interface UsePopoverContentImplSharedPeturns {
  wrapperAttrs: () => IAttrsData
  attrs: RadixPrimitiveGetAttrs
}

export function usePopoverContentImplShared(props: UsePopoverContentImplSharedProps): UsePopoverContentImplSharedPeturns {
  const context = usePopoverContext('PopoverContentImplShared')
  const popperContext = usePopperContext('PopoverContentImplShared')

  // Make sure the whole tree has focus guards as our `Popover` may be
  // composedRefs the last element in the DOM (because of the `Portal`)
  useFocusGuards()

  const focusScope = useFocusScope(
    {
      el: popperContext.content,
      loop: true,
      trapped() {
        return false
      },
      onMountAutoFocus: props.onOpenAutoFocus,
      onUnmountAutoFocus: props.onCloseAutoFocus,
    },
  )

  const dismissableLayer = useDismissableLayer({
    el: popperContext.content,
    disableOutsidePointerEvents() {
      return false
    },
    onInteractOutside: props.onInteractOutside,
    onEscapeKeydown: props.onEscapeKeydown,
    onFocusOutside: props.onFocusOutside,
    onPointerdownOutside: props.onPointerdownOutside,
    onDismiss() {
      context.onOpenChange(false)
    },
  })

  const popperContent = usePopperContent(props)

  return {
    wrapperAttrs: popperContent.wrapperAttrs,
    attrs(extraAttrs = []) {
      const popperAttrs = {
        'id': context.contentId,
        'data-state': context.open.value ? 'open' : 'closed',
        'role': 'dialog',
        'style': {
          '--radix-popover-content-transform-origin': 'var(--radix-popper-transform-origin)',
          '--radix-popover-content-available-width': 'var(--radix-popper-available-width)',
          '--radix-popover-content-available-height': 'var(--radix-popper-available-height)',
          '--radix-popover-trigger-width': 'var(--radix-popper-anchor-width)',
          '--radix-popover-trigger-height': 'var(--radix-popper-anchor-height)',
        },
      }

      return popperContent.attrs([dismissableLayer.attrs(), focusScope.attrs(), popperAttrs, ...extraAttrs])
    },
  }
}
