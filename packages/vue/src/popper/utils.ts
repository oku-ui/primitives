import type { Middleware, Placement } from '@floating-ui/vue'
import type { Measurable } from '@oku-ui/utils'
import type { Ref } from 'vue'
import { createScope } from '@oku-ui/provide'

export const SIDE_OPTIONS = ['top', 'right', 'bottom', 'left'] as const
export const ALIGN_OPTIONS = ['start', 'center', 'end'] as const

export type Side = typeof SIDE_OPTIONS[number]
export type Align = typeof ALIGN_OPTIONS[number]

export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

export function isNotNull<T>(value: T | null): value is T {
  return value !== null
}

export function transformOrigin(options: { arrowWidth: number, arrowHeight: number }): Middleware {
  return {
    name: 'transformOrigin',
    options,
    fn(data) {
      const { placement, rects, middlewareData } = data

      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0
      const isArrowHidden = cannotCenterArrow
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight

      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement)
      const noArrowAlign = { start: '0%', center: '50%', end: '100%' }[placedAlign]

      const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2
      const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2

      let x = ''
      let y = ''

      if (placedSide === 'bottom') {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`
        y = `${-arrowHeight}px`
      }
      else if (placedSide === 'top') {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`
        y = `${rects.floating.height + arrowHeight}px`
      }
      else if (placedSide === 'right') {
        x = `${-arrowHeight}px`
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`
      }
      else if (placedSide === 'left') {
        x = `${rects.floating.width + arrowHeight}px`
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`
      }
      return { data: { x, y } }
    },
  }
}

export function getSideAndAlignFromPlacement(placement: Placement) {
  const [side, align = 'center'] = placement.split('-')
  return [side as Side, align as Align] as const
}

export type PopperContext = {
  anchor: Ref<Measurable | null>
  onAnchorChange: (anchor: Measurable | null) => void
}

export type PopperContentContext = {
  placedSide: Ref<Side | undefined>
  onArrowChange: (arrow: HTMLSpanElement | null) => void
  arrowX?: Ref<number | undefined>
  arrowY?: Ref<number | undefined>
  shouldHideArrow: Ref<boolean | undefined>
}

export const [createPopperProvide, createPopperScope]
  = createScope<'OkuPopper' | 'OkuPopperContent'>('OkuPopper')

export const [usePopperProvide, usePopperInject]
  = createPopperProvide<PopperContext>('OkuPopper')

export const [usePopperContentProvide, usePopperContentInject]
  = createPopperProvide<PopperContentContext>('OkuPopper')
