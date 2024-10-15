import { createPopperScope } from '@oku-ui/popper'
import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createScope } from '@oku-ui/provide'

export type ScopeHoverCard<T> = T & { scopeOkuHoverCard?: Scope }

export const scopeHoverCardProps = {
  scopeOkuHoverCard: {
    ...ScopePropObject,
  },
}

export const [createHoverCardProvide, createHoverCardScope] = createScope('HoverCard', [
  createPopperScope,
])

export function excludeTouch(eventHandler: () => void) {
  return (event: PointerEvent) =>
    event.pointerType === 'touch' ? undefined : eventHandler()
}

/**
 * Returns a list of nodes that can be in the tab sequence.
 * @see: https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
 */
export function getTabbableNodes(container: HTMLElement) {
  const nodes: HTMLElement[] = []
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: any) => {
      // `.tabIndex` is not the same as the `tabindex` attribute. It works on the
      // runtime's understanding of tabbability, so this automatically accounts
      // for any kind of element that could be tabbed to.
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    },
  })
  while (walker.nextNode()) nodes.push(walker.currentNode as HTMLElement)
  return nodes
}
