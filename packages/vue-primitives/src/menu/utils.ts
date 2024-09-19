/* ----------------------------------------------------------------------------------------------- */

import type { CheckedState } from '../checkbox/index.ts'
import { isPointInPolygon, type Polygon, wrapArray } from '../shared/index.ts'

export function getOpenState(open: boolean) {
  return open ? 'open' : 'closed'
}

function isIndeterminate(checked?: CheckedState): checked is 'indeterminate' {
  return checked === 'indeterminate'
}

export function getCheckedState(checked: CheckedState) {
  return isIndeterminate(checked) ? 'indeterminate' : checked ? 'checked' : 'unchecked'
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
export function getNextMatch(values: string[], search: string, currentMatch?: string) {
  const isRepeated = search.length > 1 && Array.from(search).every(char => char === search[0])
  const normalizedSearch = isRepeated ? search[0] || '' : search
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1

  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0))!
  const excludeCurrentMatch = normalizedSearch.length === 1

  if (excludeCurrentMatch)
    wrappedValues = wrappedValues.filter(v => v !== currentMatch)

  const nextMatch = wrappedValues.find(value => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()))

  return nextMatch !== currentMatch ? nextMatch : undefined
}

export type Side = 'left' | 'right'
// eslint-disable-next-line ts/consistent-type-definitions
export type GraceIntent = { area: Polygon, side: Side }

export function isPointerInGraceArea(event: PointerEvent, area?: Polygon) {
  if (!area)
    return false

  const cursorPos = { x: event.clientX, y: event.clientY }

  return isPointInPolygon(cursorPos, area)
}
