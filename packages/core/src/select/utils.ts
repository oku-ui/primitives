import { wrapArray } from '@oku-ui/shared'
import { onBeforeUnmount } from 'vue'

export function shouldShowPlaceholder(value?: string) {
  return value === '' || value === undefined
}

export function useTypeaheadSearch(onSearchChange: (search: string) => void) {
  let searchRef = ''
  let timerRef = 0

  function handleTypeaheadSearch(key: string) {
    const search = searchRef + key
    onSearchChange(search);

    (function updateSearch(value: string) {
      searchRef = value
      if (timerRef)
        window.clearTimeout(timerRef)
      // Reset `searchRef` 1 second after it was last updated
      if (value !== '') {
        timerRef = window.setTimeout(() => {
          updateSearch('')
          timerRef = 0
        }, 1000)
      }
    })(search)
  }

  function resetTypeahead() {
    searchRef = ''
    if (timerRef)
      window.clearTimeout(timerRef)
  }

  onBeforeUnmount(() => {
    if (timerRef)
      window.clearTimeout(timerRef)
  })

  return [searchRef, handleTypeaheadSearch, resetTypeahead] as const
}

/**
 * This is the "meat" of the typeahead matching logic. It takes in a list of items,
 * the search and the current item, and returns the next item (or `undefined`).
 *
 * We normalize the search because if a user has repeatedly pressed a character,
 * we want the exact same behavior as if we only had that one character
 * (ie. cycle through items starting with that character)
 *
 * We also reorder the items by wrapping the array around the current item.
 * This is so we always look forward from the current item, and picking the first
 * item will always be the correct one.
 *
 * Finally, if the normalized search is exactly one character, we exclude the
 * current item from the values because otherwise it would be the first to match always
 * and focus would never move. This is as opposed to the regular case, where we
 * don't want focus to move if the current item still matches.
 */
export function findNextItem<T extends { textValue: string }>(
  items: T[],
  search: string,
  currentItem?: T,
) {
  const isRepeated = search.length > 1 && Array.from(search).every(char => char === search[0])
  const normalizedSearch = isRepeated ? search[0]! : search
  const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1
  let wrappedItems = wrapArray(items, Math.max(currentItemIndex, 0))
  const excludeCurrentItem = normalizedSearch.length === 1
  if (excludeCurrentItem)
    wrappedItems = wrappedItems.filter(v => v !== currentItem)

  const normalizedSearchLower = normalizedSearch.toLowerCase()

  const nextItem = wrappedItems.find(item => item.textValue.toLowerCase().startsWith(normalizedSearchLower))
  return nextItem !== currentItem ? nextItem : undefined
}
