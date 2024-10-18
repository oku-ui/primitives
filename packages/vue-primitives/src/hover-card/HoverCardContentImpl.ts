import type { EmitsToHookProps, PrimitiveDefaultProps } from '../shared/index.ts'
import { onBeforeUnmount, onMounted, onWatcherCleanup, shallowRef, watchEffect } from 'vue'
import { type DismissableLayerEmits, useDismissableLayer } from '../dismissable-layer/index.ts'
import { type PopperContentProps, usePopperContent, type UsePopperContentProps, usePopperContext } from '../popper/index.ts'
import { useHoverCardContext } from './HoverCardRoot.ts'
import { getTabbableNodes } from './utils.ts'

export interface HoverCardContentImplProps extends PopperContentProps { }

export const DEFAULT_HOVER_CARD_CONTENT_IMPL_PROPS = {
  avoidCollisions: undefined,
  hideWhenDetached: undefined,
} satisfies PrimitiveDefaultProps<HoverCardContentImplProps>

export type HoverCardContentImplEmits = {
  /**
   * Event handler called when the escape key is down.
   * Can be prevented.
   */
  escapeKeydown: DismissableLayerEmits['escapeKeydown']
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `HoverCard`.
   * Can be prevented.
   */
  pointerdownOutside: DismissableLayerEmits['pointerdownOutside']
  /**
   * Event handler called when the focus moves outside of the `HoverCard`.
   * Can be prevented.
   */
  focusOutside: DismissableLayerEmits['focusOutside']
  /**
   * Event handler called when an interaction happens outside the `HoverCard`.
   * Specifically, when a `pointerdown` event happens outside or focus moves outside of it.
   * Can be prevented.
   */
  interactOutside: DismissableLayerEmits['interactOutside']
}

let originalBodyUserSelect: string

export interface UseHoverCardContentImplProps extends EmitsToHookProps<HoverCardContentImplEmits> {
  popperProps?: Omit<UsePopperContentProps, 'onPlaced'>
}

export function useHoverCardContentImpl(props: UseHoverCardContentImplProps = {}): ReturnType<typeof usePopperContent> {
  const context = useHoverCardContext('HoverCardContentImpl')
  const popperContext = usePopperContext('HoverCardContentImpl')

  function onPointerenter(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    if (event.pointerType === 'touch')
      return
    context.onOpen()
  }

  function onpointerleave(event: PointerEvent) {
    if (event.defaultPrevented)
      return
    if (event.pointerType === 'touch')
      return
    context.onClose()
  }

  const containSelection = shallowRef(false)

  watchEffect(() => {
    if (!containSelection.value)
      return

    const body = document.body

    // Safari requires prefix
    originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect

    body.style.userSelect = 'none'
    body.style.webkitUserSelect = 'none'

    onWatcherCleanup(() => {
      body.style.userSelect = originalBodyUserSelect
      body.style.webkitUserSelect = originalBodyUserSelect
    })
  })

  function handlePointerUp() {
    containSelection.value = false
    context.isPointerDownOnContentRef.value = false

    // Delay a frame to ensure we always access the latest selection
    setTimeout(() => {
      const hasSelection = document.getSelection()?.toString() !== ''
      if (hasSelection)
        context.hasSelectionRef.value = true
    })
  }

  onMounted(() => {
    if (!popperContext.content.value)
      return

    document.addEventListener('pointerup', handlePointerUp)

    const tabbables = getTabbableNodes(popperContext.content.value)

    for (const tabbable of tabbables) {
      tabbable.setAttribute('tabindex', '-1')
    }
  })

  onBeforeUnmount(() => {
    document.removeEventListener('pointerup', handlePointerUp)
    context.hasSelectionRef.value = false
    context.isPointerDownOnContentRef.value = false
  })

  function onPointerdown(event: PointerEvent) {
    // Contain selection to current layer
    if ((event.currentTarget as HTMLElement)?.contains(event.target as HTMLElement)) {
      containSelection.value = true
    }
    context.hasSelectionRef.value = false
    context.isPointerDownOnContentRef.value = true
  }

  const dismissableLayer = useDismissableLayer({
    el: popperContext.content,
    disableOutsidePointerEvents() {
      return false
    },
    onInteractOutside: props.onInteractOutside,
    onEscapeKeydown: props.onEscapeKeydown,
    onPointerdownOutside: props.onPointerdownOutside,
    onFocusOutside(event) {
      props.onFocusOutside?.(event)
      if (event.defaultPrevented)
        return
      event.preventDefault()
    },
    onDismiss: context.onDismiss,
  })

  const popperContent = usePopperContent(props.popperProps)

  return {
    wrapperAttrs: popperContent.wrapperAttrs,
    attrs(extraAttrs = []) {
      const popperAttrs = {
        'data-state': context.open.value ? 'open' : 'closed',
        onPointerenter,
        onpointerleave,
        onPointerdown,
      }

      return popperContent.attrs([dismissableLayer.attrs(), popperAttrs, ...extraAttrs])
    },
  }
}
