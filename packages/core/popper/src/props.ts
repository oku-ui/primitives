import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { Measurable } from '@oku-ui/utils'
import type { PropType, Ref } from 'vue'

import type { Scope } from '@oku-ui/provide'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import type { Padding } from '@floating-ui/vue'
import type { ArrowElement, ArrowNaviteElement, ArrowProps } from '@oku-ui/arrow'
import { arrowProps } from '@oku-ui/arrow'
import type { Align, Side } from './utils'
import { ALIGN_OPTIONS, SIDE_OPTIONS } from './utils'

export type ScopePopper<T> = T & { scopeOkuPopper?: Scope }

export const scopePopperProps = {
  scopeOkuPopper: {
    ...ScopePropObject,
  },
}

/* -------------------------------------------------------------------------- */
/*                            OkuPopper - popper.ts                           */
/* -------------------------------------------------------------------------- */

export const POPPER_NAME = 'OkuPopper'

export const [createPopperProvider, createPopperScope]
  = createProvideScope(POPPER_NAME)

export type PopperProvideValue = {
  anchor: Ref<Measurable | null>
  onAnchorChange(anchor: Measurable | null): void
}

export const [popperProvider, usePopperInject]
  = createPopperProvider<PopperProvideValue>(POPPER_NAME)

export interface PopperProps {
}

/* -------------------------------------------------------------------------- */
/*                         OkuPopperAnchor - popperAnchor.ts                  */
/* -------------------------------------------------------------------------- */

export const ANCHOR_NAME = 'OkuPopperAnchor'

export type PopperAnchorNaviteElement = OkuElement<'div'>
export type PopperAnchorElement = HTMLDivElement

export interface PopperAnchorProps extends PrimitiveProps {
  virtualRef?: Ref<Measurable | null>
}

export const popperAnchorProps = {
  props: {
    virtualRef: {
      type: Object as unknown as PropType<Measurable | null>,
      required: false,
      default: undefined,
    },
    ...primitiveProps,

  },
  emits: {},
}

/* -------------------------------------------------------------------------- */
/*                         OkuPopperContent - popperContent.ts                */
/* -------------------------------------------------------------------------- */

export const CONTENT_NAME = 'OkuPopperContent'

type PopperContentContextValue = {
  placedSide: Ref<Side | undefined>
  onArrowChange(arrow: HTMLSpanElement | null): void
  arrowX?: Ref<number | undefined>
  arrowY?: Ref<number | undefined>
  shouldHideArrow: Ref<boolean | undefined>
}

export const [popperContentProvider, usePopperContentInject] = createPopperProvider<PopperContentContextValue>(CONTENT_NAME)

type Boundary = Element | null

export type PopperContentNaviteElement = OkuElement<'div'>
export type PopperContentElement = HTMLDivElement

export interface PopperContentProps extends PrimitiveProps {
  side?: Side
  sideOffset?: number
  align?: Align
  alignOffset?: number
  arrowPadding?: number
  avoidCollisions?: boolean
  collisionBoundary?: Boundary | Boundary[]
  collisionPadding?: Padding
  sticky?: 'partial' | 'always'
  hideWhenDetached?: boolean
  updatePositionStrategy?: 'optimized' | 'always'
}

export type PopperContentEmits = {
  placed: [void]
}

export const popperContentProps = {
  props: {
    side: {
      type: String as unknown as PropType<Side>,
      required: false,
      default: 'bottom',
      validator: (value: Side) => SIDE_OPTIONS.includes(value),
    },
    sideOffset: {
      type: Number,
      required: false,
      default: 0,
    },
    align: {
      type: String as unknown as PropType<Align>,
      required: false,
      default: 'center',
      validator: (value: Align) => ALIGN_OPTIONS.includes(value),
    },
    alignOffset: {
      type: Number,
      required: false,
      default: 0,
    },
    arrowPadding: {
      type: Number,
      required: false,
      default: 0,
    },
    avoidCollisions: {
      type: Boolean,
      required: false,
      default: true,
    },
    collisionBoundary: {
      type: [Object, Array] as unknown as PropType<Boundary | Boundary[]>,
      required: false,
      default: () => [],
    },
    collisionPadding: {
      type: [Number, Object] as unknown as PropType<Padding>,
      required: false,
      default: 0,
    },
    sticky: {
      type: String as unknown as PropType<'partial' | 'always'>,
      required: false,
      default: 'partial',
    },
    hideWhenDetached: {
      type: Boolean,
      required: false,
      default: false,
    },
    updatePositionStrategy: {
      type: String as unknown as PropType<'optimized' | 'always'>,
      required: false,
      default: 'optimized',
    },
    layoutShift: {
      type: Boolean,
      required: false,
      default: true,
    },
    dir: {
      type: String as unknown as PropType<'ltr' | 'rtl'>,
    },
  },
  emits: {
    placed: () => true,
  },
}

/* -------------------------------------------------------------------------- */
/*                         OkuPopperArrow - popperArrow.ts                    */
/* -------------------------------------------------------------------------- */

export const ARROW_NAME = 'OkuPopperArrow'

export const OPPOSITE_SIDE: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}

export type PopperArrowNaviteElement = ArrowNaviteElement
export type PopperArrowElement = ArrowElement

export interface PopperArrowProps extends ArrowProps {
}

export const popperArrowProps = {
  props: {
    ...arrowProps.props,
  },
  emits: {},
}
