import { onMounted, onUnmounted } from 'vue'

/** Number of components which have requested interest to have focus guards */
let count = 0

export function useFocusGuards() {
  onMounted(() => {
    const edgeGuards = document.querySelectorAll('[data-radix-focus-guard]')
    document.body.insertAdjacentElement('afterbegin', edgeGuards[0] ?? createFocusGuard())
    document.body.insertAdjacentElement('beforeend', edgeGuards[1] ?? createFocusGuard())
    count++
  })

  onUnmounted(() => {
    if (count === 1) {
      document.querySelectorAll('[data-radix-focus-guard]').forEach(node => node.remove())
    }
    count--
  })
}

function createFocusGuard() {
  const element = document.createElement('span')
  element.setAttribute('data-radix-focus-guard', '')
  element.tabIndex = 0
  element.style.outline = 'none'
  element.style.opacity = '0'
  element.style.position = 'fixed'
  element.style.pointerEvents = 'none'
  return element
}
