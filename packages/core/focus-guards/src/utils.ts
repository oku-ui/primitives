import { onMounted, onUnmounted } from 'vue'

/** Number of components which have requested interest to have focus guards */
let count = 0

/**
 * Injects a pair of focus guards at the edges of the whole DOM tree
 * to ensure `focusin` & `focusout` events can be caught consistently.
 */
export function useFocusGuards() {
  onMounted(() => {
    const edgeGuards = document.querySelectorAll('[data-oku-focus-guard]')
    document.body.insertAdjacentElement('afterbegin', edgeGuards[0] ?? createFocusGuard())
    document.body.insertAdjacentElement('beforeend', edgeGuards[1] ?? createFocusGuard())
    count++
  })

  onUnmounted(() => {
    if (count === 1)
      document.querySelectorAll('[data-oku-focus-guard]').forEach(node => node.remove())

    count--
  })
}

export function createFocusGuard() {
  const element = document.createElement('span')
  element.setAttribute('data-oku-focus-guard', '')
  element.tabIndex = 0
  element.style.cssText = 'outline: none; opacity: 0; position: fixed; pointer-events: none'
  return element
}
