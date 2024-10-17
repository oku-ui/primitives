import type { DismissableLayerEmits, DismissableLayerProps } from '@oku-ui/dismissable-layer'
import type { FocusScopeEmits, FocusScopeProps } from '@oku-ui/focus-scope'
import type { PopperAnchorElement, PopperAnchorNaviteElement, PopperAnchorProps, PopperArrowElement, PopperArrowNaviteElement, PopperArrowProps, PopperContentEmits, PopperContentProps } from '@oku-ui/popper'
import type { PortalProps } from '@oku-ui/portal'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { dismissableLayerProps } from '@oku-ui/dismissable-layer'
import { createPopperScope, popperAnchorProps, popperContentProps } from '@oku-ui/popper'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { createScope, ScopePropObject } from '@oku-ui/provide'
import { type PropType, type Ref, ref } from 'vue'

export type ScopePopover<T> = T & { scopeOkuPopover?: Scope }

export const scopePopoverProps = {
  scopeOkuPopover: {
    ...ScopePropObject,
  },
}

export const ANCHOR_NAME = 'OkuPopoverAnchor'
export const POPOVER_NAME = 'OkuPopover'
export const ARROW_NAME = 'PopoverArrow'
export const CLOSE_NAME = 'OkuPopoverClose'
export const CONTENT_NAME = 'OkuPopoverContent'
export const CONTENT_IMPL_NAME = 'OkuPopoverContentImpl'
export const CONTENT_MODAL_NAME = 'OkuPopoverContentModal'
export const CONTENT_NON_MODAL_NAME = 'OkuPopoverContentNonModal'
export const TRIGGER_NAME = 'OkuPopoverTrigger'
export const PORTAL_NAME = 'OkuPopoverPortal'

/* -------------------------------------------------------------------------- */
/*                           OkuPopover - popover.ts                          */
/* -------------------------------------------------------------------------- */

export const [createPopoverProvide, createPopoverScope] = createScope(POPOVER_NAME, [
  createPopperScope,
])

export const usePopperScope = createPopperScope()

export type PopoverProvideValue = {
  triggerRef: Ref<HTMLButtonElement | null>
  contentId: Ref<string>
  open: Ref<boolean>
  onOpenChange: (open: boolean) => void
  onOpenToggle: () => void
  hasCustomAnchor: Ref<boolean>
  onCustomAnchorAdd: () => void
  onCustomAnchorRemove: () => void
  modal: Ref<boolean>
}

export const [popoverProvide, usePopoverInject]
  = createPopoverProvide<PopoverProvideValue>(POPOVER_NAME)

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

export interface PopoverEmits {
  openChange: [open: boolean]
}

export const popoverProps = {
  props: {
    modelValue: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    open: {
      type: Boolean,
      default: undefined,
    },
    defaultOpen: {
      type: Boolean,
      default: undefined,
    },
    modal: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (open: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (open: boolean) => true,
  },
}

/* -------------------------------------------------------------------------- */
/*                        OkuPopoverAnchor - popoverAnchor.ts                 */
/* -------------------------------------------------------------------------- */

export type PopoverAnchorNaviteElement = PopperAnchorNaviteElement
export type PopoverAnchorElement = PopperAnchorElement

export interface PopoverAnchorProps extends PopperAnchorProps { }

export const popoverAnchorProps = {
  props: {
    ...popperAnchorProps.props,
  },
  emits: {
    ...popperAnchorProps.emits,
  },
}

/* -------------------------------------------------------------------------- */
/*                          OkuPopoverArrow - popoverArrow.ts                 */
/* -------------------------------------------------------------------------- */

export type PopoverArrowNaviteElement = PopperArrowNaviteElement
export type PopoverArrowElement = PopperArrowElement

export interface PopoverArrowProps extends PopperArrowProps { }

export const popoverArrowProps = {
  props: {
    ...popperAnchorProps.props,
  },
  emits: {
    ...popperAnchorProps.emits,
  },
}

/* -------------------------------------------------------------------------- */
/*                           OkuPopoverClose - popoverClose.ts                */
/* -------------------------------------------------------------------------- */

export type PopoverCloseNaviteElement = OkuElement<'button'>
export type PopoverCloseElement = HTMLButtonElement

export interface PopoverCloseProps extends PrimitiveProps { }

export type PopoverCloseEmits = {
  click: [event: MouseEvent]
}

export const popoverCloseProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
  },
}

/* -------------------------------------------------------------------------- */
/*                     OkuPopoverContentImpl - popoverContentImpl.ts         */
/* -------------------------------------------------------------------------- */

export type PopoverContentImplNaviteElement = OkuElement<'label'>
export type PopoverContentImplElement = HTMLLabelElement

export interface PopoverContentImplProps
  extends PopperContentProps,
  DismissableLayerProps {
  /**
   * Whether focus should be trapped within the `Popover`
   * (default: false)
   */
  trapFocus?: FocusScopeProps['trapped']
}

export type PopoverContentImplEmits = {
  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  openAutoFocus: [event: FocusScopeEmits['mountAutoFocus'][0]]
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: FocusScopeEmits['unmountAutoFocus'][0]]
} & Omit<DismissableLayerEmits, 'dismiss'>
& Omit<PopperContentEmits, 'placed'>

export const popoverContentImplProps = {
  props: {
    ...popperContentProps.props,
    ...dismissableLayerProps.props,
    trapFocus: {
      type: Boolean as PropType<FocusScopeProps['trapped']>,
      default: false,
    },
  },
  emits: {
    ...propsOmit(popperContentProps.emits, ['placed']),
    ...propsOmit(dismissableLayerProps.emits, ['dismiss']),
    // eslint-disable-next-line unused-imports/no-unused-vars
    openAutoFocus: (event: FocusScopeEmits['mountAutoFocus'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    closeAutoFocus: (event: FocusScopeEmits['unmountAutoFocus'][0]) => true,
  },
}

/* -------------------------------------------------------------------------- */
/*                     OkuPopoverContentModal - popoverContentModal.ts       */
/* -------------------------------------------------------------------------- */

export type PopoverContentTypeNaviteElement = PopoverContentImplNaviteElement
export type PopoverContentTypeElement = PopoverContentImplElement

export interface PopoverContentTypeProps
  extends Omit<PopoverContentImplProps, 'trapFocus' | 'disableOutsidePointerEvents'> { }

export interface PopoverContentTypeEmits extends PopoverContentImplEmits { }

export const popoverContentTypeProps = {
  props: {
    ...propsOmit(popoverContentImplProps.props, ['trapFocus', 'disableOutsidePointerEvents']),
  },
  emits: {
    ...popoverContentImplProps.emits,
  },
}

/* -------------------------------------------------------------------------- */
/*                        OkuPopoverContent - popoverContent.ts              */
/* -------------------------------------------------------------------------- */

export interface PopoverContentProps extends PopoverContentTypeProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const popoverContentProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
    ...popoverContentTypeProps.props,
  },
  emits: {
    ...popoverContentTypeProps.emits,
  },
}

/* -------------------------------------------------------------------------- */
/*                   OkuPopoverContentNonModal - popoverContentNonModal.ts   */
/* -------------------------------------------------------------------------- */

export type PopoverTriggerNaviteElement = OkuElement<'button'>
export type PopoverTriggerElement = HTMLButtonElement

export interface PopoverTriggerProps extends PrimitiveProps {}

export interface PopoverTriggerEmits {
  click: [event: MouseEvent]
}

export const popoverTriggerProps = {
  props: {
    ...primitiveProps,
    ...scopePopoverProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
  },
}

/* -------------------------------------------------------------------------- */
/*                        OkuPopoverPortal - popoverPortal.ts                */
/* -------------------------------------------------------------------------- */

export type PortalInjectValue = {
  forceMount?: Ref<true | undefined>
}

export const [portalProvider, usePortalInject] = createPopoverProvide<PortalInjectValue>(PORTAL_NAME, {
  forceMount: ref(undefined),
})

export interface PopoverPortalProps {
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

export const popoverPortalProps = {
  props: {
    container: {
      type: Object as () => PortalProps['container'],
    },
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
  },
  emits: {},
}
