import type { DismissableLayerEmits } from '../dismissable-layer/index.ts'
import type { PopperContentProps, UsePopperContentProps } from '../popper/PopperContent.ts'
import type { EmitsToHookProps, PrimitiveDefaultProps } from '../shared/index.ts'
import { onBeforeUnmount, onMounted } from 'vue'
import { useDismissableLayer } from '../dismissable-layer/index.ts'
import { createContext } from '../hooks/index.ts'
import { usePopperContext } from '../popper/index.ts'
import { usePopperContent } from '../popper/PopperContent.ts'
import { useTooltipProviderContext } from './TooltipProvider.ts'
import { TOOLTIP_OPEN, useTooltipContext } from './TooltipRoot.ts'
import { useGraceArea } from './useGraceArea.ts'

export interface TooltipContentImplProps extends PopperContentProps {
  /**
   * A more descriptive label for accessibility purpose
   */
  ariaLabel?: string
}

export const DEFAULT_TOOLTIP_CONTENT_IMPL_PROPS = {
  avoidCollisions: undefined,
  hideWhenDetached: undefined,
} satisfies PrimitiveDefaultProps<TooltipContentImplProps>

export type TooltipContentImplEmits = {
  /** Event handler called when focus moves to the destructive action after opening. It can be prevented by calling `event.preventDefault` */
  escapeKeydown: DismissableLayerEmits['escapeKeydown']
  /** Event handler called when a pointer event occurs outside the bounds of the component. It can be prevented by calling `event.preventDefault`. */
  pointerdownOutside: DismissableLayerEmits['pointerdownOutside']
}

export interface TooltipContentContext {
  id: string
  ariaLabel?: string | undefined
}

export const [provideTooltipContentContext, useTooltipContentContext] = createContext<TooltipContentContext>('TooltipContent')

export interface UseTooltipContentImplProps extends EmitsToHookProps<TooltipContentImplEmits>, Omit<UsePopperContentProps, 'onPlaced'> {
  ariaLabel?: string | undefined
}

export function useTooltipContentImpl(props: UseTooltipContentImplProps): ReturnType<typeof usePopperContent> {
  const context = useTooltipContext('TooltipContentImpl')
  const popperContext = usePopperContext('TooltipContentImpl')

  if (!context.disableHoverableContent) {
    const providerContext = useTooltipProviderContext('TooltipContentHoverable')

    useGraceArea({
      onPointerInTransitChange: providerContext.onPointerInTransitChange,
      onClose: context.onClose,
    })
  }

  // Close the tooltip if the trigger is scrolled
  function handleScroll(event: Event) {
    const target = event.target as HTMLElement
    if (target?.contains(context.trigger.value ?? null))
      context.onClose()
  }

  onMounted(() => {
    // Close this tooltip if another one opens
    document.addEventListener(TOOLTIP_OPEN, context.onClose)
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true })
  })

  onBeforeUnmount(() => {
    document.removeEventListener(TOOLTIP_OPEN, context.onClose)
    window.removeEventListener('scroll', handleScroll, { capture: true })
  })

  provideTooltipContentContext({
    id: context.contentId,
    ariaLabel: props.ariaLabel,
  })

  const dismissableLayer = useDismissableLayer({
    el: popperContext.content,
    disableOutsidePointerEvents() {
      return false
    },
    onEscapeKeydown: props.onEscapeKeydown,
    onDismiss: context.onClose,
    onFocusOutside(event) {
      event.preventDefault()
    },
    onPointerdownOutside: props.onPointerdownOutside,
  })

  const popperContent = usePopperContent({
    ...props,
    side: props.side ?? 'top',
  })

  return {
    wrapperAttrs: popperContent.wrapperAttrs,
    attrs(extraAttrs = []) {
      const popperAttrs = {
        'data-state': context.stateAttribute(),
        'style': {
          '--radix-tooltip-content-transform-origin': 'var(--radix-popper-transform-origin)',
          '--radix-tooltip-content-available-width': 'var(--radix-popper-available-width)',
          '--radix-tooltip-content-available-height': 'var(--radix-popper-available-height)',
          '--radix-tooltip-trigger-width': 'var(--radix-popper-anchor-width)',
          '--radix-tooltip-trigger-height': 'var(--radix-popper-anchor-height)',
        },
      }

      return popperContent.attrs([dismissableLayer.attrs(), popperAttrs, ...extraAttrs])
    },
  }
}
