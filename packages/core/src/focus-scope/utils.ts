/* -------------------------------------------------------------------------------------------------
 * Utils
 * ----------------------------------------------------------------------------------------------- */

type FocusableTarget = HTMLElement | { focus: () => void }

/**
 * Attempts focusing the first element in a list of candidates.
 * Stops when focus has actually moved.
 */
export function focusFirst(candidates: HTMLElement[], { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement
  for (const candidate of candidates) {
    focus(candidate, { select })
    if (document.activeElement !== previouslyFocusedElement)
      return
  }
}

/**
 * Returns the first and last tabbable elements inside a container.
 */
export function getTabbableEdges(container: HTMLElement) {
  const candidates = getTabbableCandidates(container)
  const first = findVisible(candidates, container)
  const last = findVisible(candidates.reverse(), container)
  return [first, last] as const
}

/**
 * Returns a list of potential tabbable candidates.
 *
 * NOTE: This is only a close approximation. For example it doesn't take into account cases like when
 * elements are not visible. This cannot be worked out easily by just reading a property, but rather
 * necessitate runtime knowledge (computed styles, etc). We deal with these cases separately.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
 * Credit: https://github.com/discord/focus-layers/blob/master/src/util/wrapFocus.tsx#L1
 */
export function getTabbableCandidates(container: HTMLElement) {
  const nodes: HTMLElement[] = []
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node: HTMLInputElement) {
      const isHiddenInput = node.tagName === 'INPUT' && node.type === 'hidden'
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP
      // `.tabIndex` is not the same as the `tabindex` attribute. It works on the
      // runtime's understanding of tabbability, so this automatically accounts
      // for any kind of element that could be tabbed to.
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    },
  })
  while (walker.nextNode()) nodes.push(walker.currentNode as HTMLElement)
  // we do not take into account the order of nodes with positive `tabIndex` as it
  // hinders accessibility to have tab order different from visual order.
  return nodes
}

/**
 * Returns the first visible element in a list.
 * NOTE: Only checks visibility up to the `container`.
 */
function findVisible(elements: HTMLElement[], container: HTMLElement) {
  for (const element of elements) {
    // we stop checking if it's hidden at the `container` level (excluding)
    if (!isHidden(element, { upTo: container }))
      return element
  }
}

function isHidden(node: HTMLElement, { upTo }: { upTo?: HTMLElement }) {
  if (getComputedStyle(node).visibility === 'hidden')
    return true

  while (node) {
    // we stop at `upTo` (excluding it)
    if (upTo !== undefined && node === upTo)
      return false

    if (getComputedStyle(node).display === 'none')
      return true

    node = node.parentElement as HTMLElement
  }

  return false
}

function isSelectableInput(element: any): element is FocusableTarget & { select: () => void } {
  return element instanceof HTMLInputElement && 'select' in element
}

export function focus(element?: FocusableTarget | null, { select = false } = {}) {
  // only focus if that element is focusable
  if (!element || !element.focus)
    return

  const previouslyFocusedElement = document.activeElement
  // NOTE: we prevent scrolling on focus, to minimize jarring transitions for users
  element.focus({ preventScroll: true })
  // only select if its not the same element, it supports selection and we need to select
  if (element !== previouslyFocusedElement && isSelectableInput(element) && select)
    element.select()
}

/* -------------------------------------------------------------------------------------------------
 * FocusScope stack
 * ----------------------------------------------------------------------------------------------- */

interface FocusScopeAPI { paused: boolean, pause: () => void, resume: () => void }
export const focusScopesStack = createFocusScopesStack()

function createFocusScopesStack() {
  /** A stack of focus scopes, with the active one at the top */
  let stack: FocusScopeAPI[] = []

  return {
    add(focusScope: FocusScopeAPI) {
      // pause the currently active focus scope (at the top of the stack)
      const activeFocusScope = stack[0]

      if (focusScope !== activeFocusScope) {
        activeFocusScope?.pause()
      }

      // remove in case it already exists (because we'll re-add it at the top of the stack)
      stack = arrayRemove(stack, focusScope)
      stack.unshift(focusScope)
    },

    remove(focusScope: FocusScopeAPI) {
      stack = arrayRemove(stack, focusScope)
      stack[0]?.resume()
    },
  }
}

function arrayRemove<T>(array: T[], item: T) {
  const updatedArray = [...array]
  const index = updatedArray.indexOf(item)

  if (index !== -1) {
    updatedArray.splice(index, 1)
  }

  return updatedArray
}

export function removeLinks(items: HTMLElement[]) {
  return items.filter(item => item.tagName !== 'A')
}
