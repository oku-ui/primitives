import type { CheckedState } from './props'

function getOpenState(open: boolean) {
  return open ? 'open' : 'closed'
}

function isIndeterminate(checked?: CheckedState): checked is 'indeterminate' {
  return checked === 'indeterminate'
}

function getCheckedState(checked: CheckedState) {
  return isIndeterminate(checked) ? 'indeterminate' : checked ? 'checked' : 'unchecked'
}

function focusFirst(candidates: HTMLElement[]) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement
  for (const candidate of candidates) {
    // if focus is already where we want to go, we don't want to keep going through the candidates
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
      return
    candidate.focus()
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
      return
  }
}

/**
 * Wraps an array around itself at a given start index
 * Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
 */
function wrapArray<T>(array: T[], startIndex: number) {
  return array.map((_, index) => array[(startIndex + index) % array.length])
}

/**
 * This is the "meat" of the typeahead matching logic. It takes in all the values,
 * the search and the current match, and returns the next match (or `undefined`).
 *
 * We normalize the search because if a user has repeatedly pressed a character,
 * we want the exact same behavior as if we only had that one character
 * (ie. cycle through options starting with that character)
 *
 * We also reorder the values by wrapping the array around the current match.
 * This is so we always look forward from the current match, and picking the first
 * match will always be the correct one.
 *
 * Finally, if the normalized search is exactly one character, we exclude the
 * current match from the values because otherwise it would be the first to match always
 * and focus would never move. This is as opposed to the regular case, where we
 * don't want focus to move if the current match still matches.
 */
function getNextMatch(values: string[], search: string, currentMatch?: string) {
  const isRepeated = search.length > 1 && Array.from(search).every(char => char === search[0])
  const normalizedSearch = isRepeated ? search[0] : search
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1
  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0))
  const excludeCurrentMatch = normalizedSearch.length === 1
  if (excludeCurrentMatch)
    wrappedValues = wrappedValues.filter(v => v !== currentMatch)
  const nextMatch = wrappedValues.find(value =>
    value.toLowerCase().startsWith(normalizedSearch.toLowerCase()),
  )
  return nextMatch !== currentMatch ? nextMatch : undefined
}

export type Point = { x: number; y: number }
export type Polygon = Point[]
export type Side = 'left' | 'right'
export type GraceIntent = { area: Polygon; side: Side }

// Determine if a point is inside of a polygon.
// Based on https://github.com/substack/point-in-polygon
function isPointInPolygon(point: Point, polygon: Polygon) {
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

function isPointerInGraceArea(event: PointerEvent, area?: Polygon) {
  if (!area)
    return false
  const cursorPos = { x: event.clientX, y: event.clientY }
  return isPointInPolygon(cursorPos, area)
}

function whenMouse(event: (e: PointerEvent) => void) {
  return (e: PointerEvent) => (e.pointerType === 'mouse' ? event(e) : undefined)
}

export { getOpenState, isIndeterminate, getCheckedState, focusFirst, getNextMatch, isPointerInGraceArea, whenMouse }
