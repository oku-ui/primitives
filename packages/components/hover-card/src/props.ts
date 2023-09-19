import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { PropType, Ref } from 'vue'

import type { Scope } from '@oku-ui/provide'
import type { OkuElement } from '@oku-ui/primitive'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import type { PopperContentProps as OkuPopperContentProps, PopperArrowElement, PopperArrowNaviteElement, PopperArrowProps, PopperContentElement, PopperContentEmits, PopperContentNaviteElement } from '@oku-ui/popper'
import { createPopperScope, popperArrowProps, popperContentProps } from '@oku-ui/popper'
import type { PortalProps as OkuPortalProps, PortalElement, PortalElementNaviteElement } from '@oku-ui/portal'
import { type DismissableLayerEmits, type DismissableLayerProps as OkuDismissableLayerProps } from '@oku-ui/dismissable-layer'
import { createHoverCardProvide } from './utils'

export type ScopeHoverCard<T> = T & { scopeOkuHoverCard?: Scope }

export const scopeHoverCardProps = {
  scopeOkuHoverCard: {
    ...ScopePropObject,
  },
}

/* -------------------------------------------------------------------------- */
/*                            OkuHoverCard - hoverCard.ts                     */
/* -------------------------------------------------------------------------- */

export const HOVERCARD_NAME = 'OkuHoverCard'

export const [createHoverCardProvider, createHoverCardScope] = createProvideScope(HOVERCARD_NAME, [
  createPopperScope,
])

export const usePopperScope = createPopperScope()

export type HoverCardProvideValue = {
  open: Ref<boolean>
  onOpenChange(open: boolean): void
  onOpen(): void
  onClose(): void
  onDismiss(): void
  hasSelectionRef: Ref<boolean>
  isPointerDownOnContentRef: Ref<boolean>
}

export const [hoverCardProvide, useHoverCardInject]
  = createHoverCardProvider<HoverCardProvideValue>(HOVERCARD_NAME)

export interface HoverCardProps {
  open?: boolean
  defaultOpen?: boolean
  openDelay?: number
  closeDelay?: number
}

export type HoverCardEmits = {
  'update:modelValue': [open: boolean]
  'openChange': [open: boolean]
}

export const hoverCardProps = {
  props: {
    modelValue: {
      type: [Boolean] as PropType<boolean | undefined>,
      default: undefined,
    },
    open: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    defaultOpen: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    openDelay: {
      type: Number as PropType<number | undefined>,
      default: 700,
    },
    closeDelay: {
      type: Number as PropType<number | undefined>,
      default: 300,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (open: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (open: boolean) => true,
  },
}

/* -------------------------------------------------------------------------- */
/*                         OkuHoverCardTrigger - hoverCardTrigger.ts          */
/* -------------------------------------------------------------------------- */

export const HOVERCARD_TRIGGER_NAME = 'OkuHoverCardTrigger'

export type HoverCardTriggerNativeElement = OkuElement<'a'>
export type HoverCardTriggerElement = HTMLAnchorElement

export interface HoverCardTriggerProps { }

export const hoverCardTriggerProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerenter: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerleave: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focus: (event: FocusEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    blur: (event: FocusEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    touchstart: (event: MouseEvent) => true,
  },
}

/* -------------------------------------------------------------------------- */
/*                         OkuHoverCardPortal - hoverCardPortal.ts            */
/* -------------------------------------------------------------------------- */

export const PORTAL_NAME = 'OkuHoverCardPortal'

export type HoverCardPortalElement = PortalElement
export type HoverCardPortalNaviteElement = PortalElementNaviteElement

export type PortalProvide = {
  forceMount?: Ref<true | undefined>
}

export const [portalProvider, usePortalInject] = createHoverCardProvide<PortalProvide>(PORTAL_NAME, {
  forceMount: undefined,
})

export type PortalProps = OkuPortalProps

// export { usePortalInject }

export interface HoverCardPortalProps {
  /**
     * Specify a container element to portal the content into.
     */
  container?: PortalProps['container']
  /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
  forceMount?: true
}

export const hoverCardPortalProps = {
  props: {
    container: {
      type: Object as PropType<PortalProps['container']>,
      default: undefined,
    },
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
    ...primitiveProps,
  },
}

/* -------------------------------------------------------------------------- */
/*                         OkuHoverCardContentImpl - hoverCardContentImpl.ts  */
/* -------------------------------------------------------------------------- */

export const CONTENT_NAME_IMPL = 'OkuHoverCardContentImpl'

export type HoverCardContentImplNaviteElement = PopperContentNaviteElement
export type HoverCardContentImplElement = PopperContentElement
export type DismissableLayerProps = OkuDismissableLayerProps
export type PopperContentProps = OkuPopperContentProps

export interface HoverCardContentImplProps extends PopperContentProps { }

export type HoverCardContentImplEmits = Omit<PopperContentEmits, 'placed'> & {
  /**
     * Event handler called when the escape key is down.
     * Can be prevented.
     */
  escapeKeyDown: [event: DismissableLayerEmits['escapeKeyDown'][0]]
  /**
     * Event handler called when the a `pointerdown` event happens outside of the `Tooltip`.
     * Can be prevented.
     */
  pointerdownOutside: [event: DismissableLayerEmits['pointerdownOutside'][0]]
  /***
     *
     */
  focusoutSide: [event: DismissableLayerEmits['focusoutSide'][0]]
  interactOutside: [event: DismissableLayerEmits['interactOutside'][0]]
  pointerdown: [event: PointerEvent]
  close: []
}

export const hoverCardContentImplProps = {
  props: {
    ...popperContentProps.props,
    ...primitiveProps,
  },
  emits: {
    ...propsOmit(popperContentProps.emits, ['placed']),
    // eslint-disable-next-line unused-imports/no-unused-vars
    escapeKeyDown: (event: DismissableLayerEmits['escapeKeyDown'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdownOutside: (event: DismissableLayerEmits['pointerdownOutside'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focusoutSide: (event: DismissableLayerEmits['focusoutSide'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    interactOutside: (event: DismissableLayerEmits['interactOutside'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdown: (event: MouseEvent) => true,
    close: () => true,
  },
}

/* -------------------------------------------------------------------------- */
/*                         OkuHoverCardContent - hoverCardContent.ts          */
/* -------------------------------------------------------------------------- */

export const CONTENT_NAME = 'OkuHoverCardContent'

export type HoverCardContentNaviteElement = HoverCardContentImplNaviteElement
export type HoverCardContentElement = HoverCardContentImplElement

export interface HoverCardContentProps extends HoverCardContentImplProps {
  /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
  forceMount?: true
}

export type HoverCardContentEmits = {
  pointerenter: [event: PointerEvent]
  pointerleave: [event: PointerEvent]
} & HoverCardContentImplEmits

export const hoverCardContentProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
    ...hoverCardContentImplProps.props,
  },
  emits: {
    ...hoverCardContentImplProps.emits,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerenter: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerleave: (event: PointerEvent) => true,
  },
}

/* -------------------------------------------------------------------------- */
/*                         OkuHoverCardArrow - hoverCardArrow.ts              */
/* -------------------------------------------------------------------------- */

export const ARROW_NAME = 'OkuHoverCardArrow'

export type HoverCardArrowNaviteElement = PopperArrowNaviteElement
export type HoverCardArrowElement = PopperArrowElement
export interface HoverCardArrowProps extends PopperArrowProps { }

export const hoverCardArrowProps = {
  props: {
    ...popperArrowProps.props,
  },
  emits: {
    ...popperArrowProps.emits,
  },
}
