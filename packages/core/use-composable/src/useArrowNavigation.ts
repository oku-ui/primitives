export type ArrowKeyOptions = 'horizontal' | 'vertical' | 'both'
type Direction = 'ltr' | 'rtl'

export interface ArrowNavigationOptions {
  /**
   * The arrow key options to allow navigation
   *
   * @default "both"
   */
  arrowKeyOptions?: ArrowKeyOptions

  /**
   * The attribute name to find the collection items in the parent element.
   *
   * @default "data-oku-ui-collection-item"
   */
  attributeName?: string

  /**
   * The parent element where contains all the collection items, this will collect every item to be used when nav
   * It will be ignored if attributeName is provided
   *
   * @default []
   */
  itemsArray?: HTMLElement[]

  /**
   * Allow loop navigation. If false, it will stop at the first and last element
   *
   * @default true
   */
  loop?: boolean

  /**
   * The orientation of the collection
   *
   * @default "ltr"
   */
  dir?: Direction

  /**
   * Prevent the scroll when navigating. This happens when the direction of the
   * key matches the scroll direction of any ancestor scrollable elements.
   *
   * @default true
   */
  preventScroll?: boolean
}

export function useArrowNavigation(
  e: KeyboardEvent,
  currentElement: HTMLElement,
  parentElement: HTMLElement | undefined,
  options: ArrowNavigationOptions = {},
): HTMLElement | null {
  const {
    arrowKeyOptions = 'both',
    attributeName = 'data-oku-ui-collection-item',
    itemsArray = [],
    loop = true,
    dir = 'ltr',
    preventScroll = true,
  } = options

  const [right, left, up, down] = [
    e.key === 'ArrowRight',
    e.key === 'ArrowLeft',
    e.key === 'ArrowUp',
    e.key === 'ArrowDown',
  ]
  const goingVertical = up || down
  const goingHorizontal = right || left
  if (
    (!goingVertical && !goingHorizontal)
    || (arrowKeyOptions === 'vertical' && goingHorizontal)
    || (arrowKeyOptions === 'horizontal' && goingVertical)
  )
    return null

  const allCollectionItems: HTMLElement[] = parentElement
    ? Array.from(parentElement.querySelectorAll(`[${attributeName}]`))
    : itemsArray

  if (!allCollectionItems.length)
    return null

  if (preventScroll)
    e.preventDefault()

  const goForward = goingVertical ? down : dir === 'ltr' ? right : left

  return findNextFocusableElement(allCollectionItems, currentElement, {
    goForward,
    loop,
  })
}

function findNextFocusableElement(
  elements: HTMLElement[],
  currentElement: HTMLElement,
  { goForward, loop }: { goForward: boolean; loop?: boolean },
  iterations = elements.length,
): HTMLElement | null {
  if (--iterations === 0)
    return null

  const index = elements.indexOf(currentElement)
  const newIndex = goForward ? index + 1 : index - 1

  if (!loop && (newIndex < 0 || newIndex >= elements.length))
    return null

  const adjustedNewIndex = (newIndex + elements.length) % elements.length
  const candidate = elements[adjustedNewIndex]
  if (!candidate)
    return null

  const isDisabled
    = candidate.hasAttribute('disabled')
    && candidate.getAttribute('disabled') !== 'false'
  if (isDisabled) {
    return findNextFocusableElement(
      elements,
      candidate,
      { goForward, loop },
      iterations,
    )
  }
  return candidate
}
