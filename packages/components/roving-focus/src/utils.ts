import type { AriaAttributes } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { ScopePropObject } from '@oku-ui/provide'
import type { PropType } from 'vue'

export type ScopeRovingFocus<T> = T & { scopeOkuRovingFocus?: Scope }

export const scopeRovingFocusProps = {
  scopeOkuRovingFocus: {
    ...ScopePropObject,
  },
}

export interface RovingFocusGroupOptions {
  /**
   * The orientation of the group.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   */
  orientation?: Orientation
  /**
   * The direction of navigation between items.
   */
  dir?: Direction
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: boolean
}

export const rovingFocusGroupOptionsProps = {
  props: {
    orientation: {
      type: String as PropType<Orientation | undefined>,
      default: undefined,
    },
    dir: {
      type: String as PropType<Direction | undefined>,
      default: undefined,
    },
    loop: {
      type: Boolean,
      default: false,
    },
  },
}

export type Orientation = AriaAttributes['aria-orientation']
export type Direction = 'ltr' | 'rtl'

export const MAP_KEY_TO_FOCUS_INTENT: Record<string, FocusIntent> = {
  ArrowLeft: 'prev',
  ArrowUp: 'prev',
  ArrowRight: 'next',
  ArrowDown: 'next',
  PageUp: 'first',
  Home: 'first',
  PageDown: 'last',
  End: 'last',
}

export function getDirectionAwareKey(key: string, dir?: Direction) {
  if (dir !== 'rtl')
    return key
  return key === 'ArrowLeft' ? 'ArrowRight' : key === 'ArrowRight' ? 'ArrowLeft' : key
}

export type FocusIntent = 'first' | 'last' | 'prev' | 'next'

export function getFocusIntent(event: KeyboardEvent, orientation?: Orientation, dir?: Direction) {
  const key = getDirectionAwareKey(event.key, dir)
  if (orientation === 'vertical' && ['ArrowLeft', 'ArrowRight'].includes(key))
    return undefined
  if (orientation === 'horizontal' && ['ArrowUp', 'ArrowDown'].includes(key))
    return undefined
  return MAP_KEY_TO_FOCUS_INTENT[key]
}

export function focusFirst(candidates: HTMLElement[]) {
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
export function wrapArray<T>(array: T[], startIndex: number) {
  return array.map((_, index) => array[(startIndex + index) % array.length])
}
