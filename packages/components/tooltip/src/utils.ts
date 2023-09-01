import { createProvideScope } from '@oku-ui/provide'
import { createPopperScope } from '@oku-ui/popper'
import type { Point, Polygon, Side } from './types'

export const [createTooltipProvide, createTooltipScope] = createProvideScope('Tooltip', [
  createPopperScope,
])

export const DEFAULT_DELAY_DURATION = 700
export const TOOLTIP_OPEN = 'tooltip.open'

export const usePopperScope = createPopperScope()

export function getExitSideFromRect(point: Point, rect: DOMRect): Side {
  const top = Math.abs(rect.top - point.y)
  const bottom = Math.abs(rect.bottom - point.y)
  const right = Math.abs(rect.right - point.x)
  const left = Math.abs(rect.left - point.x)

  switch (Math.min(top, bottom, right, left)) {
    case left:
      return 'left'
    case right:
      return 'right'
    case top:
      return 'top'
    case bottom:
      return 'bottom'
    default:
      throw new Error('unreachable')
  }
}

export function getPaddedExitPoints(exitPoint: Point, exitSide: Side, padding = 5) {
  const paddedExitPoints: Point[] = []
  switch (exitSide) {
    case 'top':
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y + padding },
        { x: exitPoint.x + padding, y: exitPoint.y + padding },
      )
      break
    case 'bottom':
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y - padding },
        { x: exitPoint.x + padding, y: exitPoint.y - padding },
      )
      break
    case 'left':
      paddedExitPoints.push(
        { x: exitPoint.x + padding, y: exitPoint.y - padding },
        { x: exitPoint.x + padding, y: exitPoint.y + padding },
      )
      break
    case 'right':
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y - padding },
        { x: exitPoint.x - padding, y: exitPoint.y + padding },
      )
      break
  }
  return paddedExitPoints
}

export function getPointsFromRect(rect: DOMRect) {
  const { top, right, bottom, left } = rect
  return [
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom },
  ]
}

// Determine if a point is inside of a polygon.
// Based on https://github.com/substack/point-in-polygon
export function isPointInPolygon(point: Point, polygon: Polygon) {
  const { x, y } = point
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x
    const yi = polygon[i].y
    const xj = polygon[j].x
    const yj = polygon[j].y

    // prettier-ignore
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
    if (intersect)
      inside = !inside
  }

  return inside
}

// Returns a new array of points representing the convex hull of the given set of points.
// https://www.nayuki.io/page/convex-hull-algorithm
export function getHull<P extends Point>(points: Readonly<Array<P>>): Array<P> {
  const newPoints: Array<P> = points.slice()
  newPoints.sort((a: Point, b: Point) => {
    if (a.x < b.x)
      return -1
    else if (a.x > b.x)
      return +1
    else if (a.y < b.y)
      return -1
    else if (a.y > b.y)
      return +1
    else return 0
  })
  return getHullPresorted(newPoints)
}

// Returns the convex hull, assuming that each points[i] <= points[i + 1]. Runs in O(n) time.
export function getHullPresorted<P extends Point>(points: Readonly<Array<P>>): Array<P> {
  if (points.length <= 1)
    return points.slice()

  const upperHull: Array<P> = []
  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1]
      const r = upperHull[upperHull.length - 2]
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
        upperHull.pop()
      else break
    }
    upperHull.push(p)
  }
  upperHull.pop()

  const lowerHull: Array<P> = []
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i]
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1]
      const r = lowerHull[lowerHull.length - 2]
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
        lowerHull.pop()
      else break
    }
    lowerHull.push(p)
  }
  lowerHull.pop()

  if (
    upperHull.length === 1
    && lowerHull.length === 1
    && upperHull[0].x === lowerHull[0].x
    && upperHull[0].y === lowerHull[0].y
  )
    return upperHull

  else
    return upperHull.concat(lowerHull)
}
