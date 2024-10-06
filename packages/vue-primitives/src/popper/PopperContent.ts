import type { MaybeRefOrGetter, Ref } from 'vue'
import type { Direction } from '../direction/index.ts'
import { shallowRef, toValue, watch, watchEffect } from 'vue'

import {
  autoUpdate,
  flip,
  arrow as floatingUIarrow,
  hide,
  limitShift,
  offset,
  type Placement,
  shift,
  size,
  useFloating,
  type UseFloatingCofnig,
} from '../floating/index.ts'
import { createContext, useSize } from '../hooks/index.ts'
import { type EmitsToHookProps, type IAttrsData, mergePrimitiveAttrs, type RadixPrimitiveGetAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { usePopperContext } from './PopperRoot.ts'
import { getSideAndAlignFromPlacement, isNotNull, transformOrigin } from './utils.ts'

export interface PopperContentProps {
  side?: Side
  sideOffset?: number
  align?: Align
  alignOffset?: number
  arrowPadding?: number
  avoidCollisions?: boolean
  collisionBoundary?: Boundary | Boundary[]
  collisionPadding?: number | Partial<Record<Side, number>>
  sticky?: 'partial' | 'always'
  hideWhenDetached?: boolean
  updatePositionStrategy?: 'optimized' | 'always'
  dir?: Direction
}

export const PopperContentPropsDefaults = {
  side: 'bottom',
  sideOffset: 0,
  align: 'center',
  alignOffset: 0,
  arrowPadding: 0,
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: 'partial',
  hideWhenDetached: false,
  updatePositionStrategy: 'optimized',
} as const

export type PopperContentEmits = {
  placed: []
}

type Boundary = Element | undefined

export const SIDE_OPTIONS = ['top', 'right', 'bottom', 'left'] as const
export const ALIGN_OPTIONS = ['start', 'center', 'end'] as const

export type Side = (typeof SIDE_OPTIONS)[number]
export type Align = (typeof ALIGN_OPTIONS)[number]

export interface PopperContentContext {
  placedSide: Ref<Side>
  onArrowChange: (newArrow: HTMLSpanElement | undefined) => void
  arrowX: () => number | undefined
  arrowY: () => number | undefined
  shouldHideArrow: () => boolean
}

export const [provideContentContext, useContentContext] = createContext<PopperContentContext>('PopperContent')

export interface UsePopperContentProps extends EmitsToHookProps<PopperContentEmits> {
  side?: Side
  sideOffset?: number
  align?: Align
  alignOffset?: number
  arrowPadding?: number
  avoidCollisions?: boolean
  collisionBoundary?: () => Boundary | Boundary[]
  collisionPadding?: number | Partial<Record<Side, number>>
  sticky?: 'partial' | 'always'
  hideWhenDetached?: boolean
  updatePositionStrategy?: 'optimized' | 'always'
  dir?: MaybeRefOrGetter<Direction | undefined>
}

export function usePopperContent(props: UsePopperContentProps): RadixPrimitiveReturns<{
  wrapperAttrs: () => IAttrsData
  attrs: RadixPrimitiveGetAttrs
}> {
  const {
    side = 'bottom',
    sideOffset = 0,
    align = 'center',
    alignOffset = 0,
    arrowPadding = 0,
    avoidCollisions = true,
    collisionBoundary = () => [],
    collisionPadding: propCollisionPadding = 0,
    sticky = 'partial',
    hideWhenDetached = false,
    updatePositionStrategy = 'optimized',
  } = props

  const context = usePopperContext('PopperContent')

  function setTemplateContent(value: HTMLElement | undefined) {
    context.content.value = value
  }

  const floatingEl = shallowRef<HTMLElement>()

  function setTemplateFloating(value: any) {
    floatingEl.value = value
  }

  const arrow = shallowRef<HTMLSpanElement>()

  const arrowSize = useSize(arrow)

  function getDetectOverflowOptions() {
    const collisionPadding = typeof propCollisionPadding === 'number'
      ? propCollisionPadding
      : { top: 0, right: 0, bottom: 0, left: 0, ...propCollisionPadding }

    const _collisionBoundary = collisionBoundary()
    const boundary = Array.isArray(_collisionBoundary) ? _collisionBoundary : [_collisionBoundary]
    const hasExplicitBoundaries = boundary.length > 0

    return {
      padding: collisionPadding,
      boundary: boundary.filter(isNotNull),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: hasExplicitBoundaries,
    }
  }

  function floatingConfig(): UseFloatingCofnig {
    const detectOverflowOptions = getDetectOverflowOptions()

    const placement = (side + (align !== 'center' ? `-${align}` : '')) as Placement
    const arrowHeight = arrowSize.value?.height || 0
    const arrowWidth = arrowSize.value?.width || 0

    const middleware: UseFloatingCofnig['middleware'] = [
      offset({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
    ]

    if (avoidCollisions) {
      middleware.push(
        shift({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky === 'partial' ? limitShift() : undefined,
          ...detectOverflowOptions,
        }),
        flip(detectOverflowOptions),
      )
    }

    middleware.push(size({
      ...detectOverflowOptions,
      apply: (state) => {
        const { width: anchorWidth, height: anchorHeight } = state.rects.reference
        const contentStyle = state.elements.floating.style
        contentStyle.setProperty('--radix-popper-available-width', `${state.availableWidth}px`)
        contentStyle.setProperty('--radix-popper-available-height', `${state.availableHeight}px`)
        contentStyle.setProperty('--radix-popper-anchor-width', `${anchorWidth}px`)
        contentStyle.setProperty('--radix-popper-anchor-height', `${anchorHeight}px`)
      },
    }))

    if (arrow.value) {
      middleware.push(floatingUIarrow({ element: arrow, padding: arrowPadding }))
    }

    middleware.push(transformOrigin({ arrowWidth, arrowHeight }))

    if (hideWhenDetached) {
      middleware.push(hide({ strategy: 'referenceHidden', ...detectOverflowOptions }))
    }

    return {
      strategy: 'fixed',
      placement,
      middleware,
    }
  }

  const { floatingStyles, placement, isPositioned, middlewareData } = useFloating(
    {
      elements: {
        floatingEl,
        referenceEl: context.anchor,
      },
      whileElementsMounted(reference, floating, update) {
        return autoUpdate(reference, floating, update, {
          animationFrame: updatePositionStrategy === 'always',
        })
      },
    },
    floatingConfig,
  )

  const placedSide = shallowRef<Side>('bottom')
  const placedAlign = shallowRef<Align>('center')

  watchEffect(() => {
    const [side, align] = getSideAndAlignFromPlacement(placement.value)
    placedSide.value = side
    placedAlign.value = align
  })

  watchEffect(() => {
    if (isPositioned.value) {
      props.onPlaced?.()
    }
  }, { flush: 'post' })

  // TODO: z-index
  const contentZIndex = shallowRef('')

  watch(context.content, (contentVal) => {
    if (contentVal) {
      contentZIndex.value = window.getComputedStyle(contentVal).zIndex
    }
  })

  provideContentContext({
    placedSide,
    onArrowChange(newArrow) {
      arrow.value = newArrow
    },
    arrowX() {
      return middlewareData.value.arrow?.x ?? undefined
    },
    arrowY() {
      return middlewareData.value.arrow?.y ?? undefined
    },
    shouldHideArrow() {
      return middlewareData.value.arrow?.centerOffset !== 0
    },
  })

  return {
    wrapperAttrs() {
      const _middlewareData = middlewareData.value
      const _floatingStyles = floatingStyles.value
      const attrs = {
        'ref': setTemplateFloating,
        'data-radix-popper-content-wrapper': '',
        'style': {
          ..._floatingStyles,
          'transform': isPositioned.value ? _floatingStyles.transform : 'translate(0, -200%)', // keep off the page when measuring
          'minWidth': 'max-content',
          'zIndex': contentZIndex.value,
          '--radix-popper-transform-origin': [
            _middlewareData.transformOrigin?.x,
            _middlewareData.transformOrigin?.y,
          ].join(' '),

          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...(_middlewareData.hide?.referenceHidden && {
            visibility: 'hidden',
            pointerEvents: 'none',
          }),
        },
        'dir': toValue(props.dir),
      }

      return attrs
    },
    attrs(extraAttrs) {
      const attrs = {
        'elRef': setTemplateContent,
        'data-side': placedSide.value,
        'data-align': placedAlign.value,
        'style': {
          // if the PopperContent hasn't been placed yet (not all measurements done)
          // we prevent animations so that users's animation don't kick in too early referring wrong sides
          animation: !isPositioned.value ? 'none' : undefined,
        },
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
