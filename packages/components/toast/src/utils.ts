// import { dispatchDiscreteCustomEvent } from '@oku-ui/primitive'
import type { SwipeDirection } from './toast-provider'

function getAnnounceTextContent(container: HTMLElement) {
  const textContent: string[] = []
  const childNodes = Array.from(container.childNodes)

  childNodes.forEach((node) => {
    if (node.nodeType === node.TEXT_NODE && node.textContent)
      textContent.push(node.textContent)
    if (isHTMLElement(node)) {
      const isHidden = node.ariaHidden || node.hidden || node.style.display === 'none'
      const isExcluded = node.dataset.radixToastAnnounceExclude === ''

      if (!isHidden) {
        if (isExcluded) {
          const altText = node.dataset.radixToastAnnounceAlt
          if (altText)
            textContent.push(altText)
        }
        else {
          textContent.push(...getAnnounceTextContent(node))
        }
      }
    }
  })

  // We return a collection of text rather than a single concatenated string.
  // This allows SR VO to naturally pause break between nodes while announcing.
  return textContent
}

/* ---------------------------------------------------------------------------------------------- */

function handleAndDispatchCustomEvent<E extends CustomEvent, ReactEvent>(
  name: string,
  handler: ((event: E) => void) | undefined,
  detail: { originalEvent: ReactEvent } & (E extends CustomEvent<infer D> ? D : never),
  { discrete }: { discrete: boolean },
) {
  const currentTarget = detail.originalEvent.currentTarget as HTMLElement
  const event = new CustomEvent(name, { bubbles: true, cancelable: true, detail })
  if (handler)
    currentTarget.addEventListener(name, handler as EventListener, { once: true })

  // if (discrete)
  // dispatchDiscreteCustomEvent(currentTarget, event)

  // else
  // currentTarget.dispatchEvent(event)
}

function isDeltaInDirection(delta: { x: number; y: number },
  direction: SwipeDirection,
  threshold = 0) {
  const deltaX = Math.abs(delta.x)
  const deltaY = Math.abs(delta.y)
  const isDeltaX = deltaX > deltaY
  if (direction === 'left' || direction === 'right')
    return isDeltaX && deltaX > threshold
  else
    return !isDeltaX && deltaY > threshold
}

// function useNextFrame(callback = () => {}) {
// const fn = useCallbackRef(callback)
// useLayoutEffect(() => {
//   let raf1 = 0
//   let raf2 = 0
//   raf1 = window.requestAnimationFrame(() => (raf2 = window.requestAnimationFrame(fn)))
//   return () => {
//     window.cancelAnimationFrame(raf1)
//     window.cancelAnimationFrame(raf2)
//   }
// }, [fn])
// }

function isHTMLElement(node: any): node is HTMLElement {
  return node.nodeType === node.ELEMENT_NODE
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
function getTabbableCandidates(container: HTMLElement) {
  const nodes: HTMLElement[] = []
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: any) => {
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

function focusFirst(candidates: HTMLElement[]) {
  const previouslyFocusedElement = document.activeElement
  return candidates.some((candidate) => {
    // if focus is already where we want to go, we don't want to keep going through the candidates
    if (candidate === previouslyFocusedElement)
      return true
    candidate.focus()
    return document.activeElement !== previouslyFocusedElement
  })
}

export { getAnnounceTextContent, handleAndDispatchCustomEvent, isDeltaInDirection, isHTMLElement, getTabbableCandidates, focusFirst }
