import { defineComponent, h, watchEffect } from 'vue'
import type { ElementType } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'

export type FocusGuardsElement = ElementType<'div'>

/** Number of components which have requested interest to have focus guards */
let count = 0

const focusGuards = defineComponent({
  setup(_props, { slots }) {
    useFocusGuards()

    const originalReturn = () => h(Primitive.div, () => slots.default?.())

    return originalReturn
  },
})

/**
 * Injects a pair of focus guards at the edges of the whole DOM tree
 * to ensure `focusin` & `focusout` events can be caught consistently.
 */
function useFocusGuards() {
  watchEffect((onInvalidate) => {
    const edgeGuards = document.querySelectorAll(
      '[data-oku-radix-focus-guard]',
    )

    document.body.insertAdjacentElement(
      'afterbegin',
      edgeGuards[0] ?? createFocusGuard(),
    )

    document.body.insertAdjacentElement(
      'beforeend',
      edgeGuards[1] ?? createFocusGuard(),
    )

    count++

    onInvalidate(() => {
      if (count === 1) {
        document
          .querySelectorAll('[data-oku-radix-focus-guard]')
          .forEach(node => node.remove())
      }

      count--
    })
  })
}

function createFocusGuard() {
  const element = document.createElement('span')
  element.setAttribute('data-oku-radix-focus-guard', '')
  element.tabIndex = 0
  element.style.cssText
    = 'outline: none; opacity: 0; position: fixed; pointer-events: none'
  return element
}

export const OkuFocusGuards = focusGuards as typeof focusGuards &
(new () => { $props: Partial<FocusGuardsElement> })

export { useFocusGuards }
