import { computed, nextTick, onMounted, type Ref, shallowRef } from 'vue'
import { usePresence } from '../presence/index.ts'
import { useCollapsibleContext } from './CollapsibleRoot.ts'

export interface CollapsibleContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean
}

export function useCollapsibleContent($el: Ref<HTMLElement | undefined>, props: CollapsibleContentProps) {
  const context = useCollapsibleContext('CollapsibleContent')

  let originalStyles: Pick<CSSStyleDeclaration, 'transitionDuration' | 'animationName'>

  const isPresent = usePresence($el, () => props.forceMount || context.open.value, () => {
    const node = $el.value
    if (!node)
      return

    const nodeStyle = node.style

    originalStyles = originalStyles || {
      transitionDuration: nodeStyle.transitionDuration,
      animationName: nodeStyle.animationName,
    }

    // block any animations/transitions so the element renders at its full dimensions
    nodeStyle.transitionDuration = '0s'
    nodeStyle.animationName = 'none'

    // get width and height from full dimensions
    const rect = node.getBoundingClientRect()
    nodeStyle.setProperty('--radix-collapsible-content-height', `${rect.height}px`)
    nodeStyle.setProperty('--radix-collapsible-content-width', `${rect.width}px`)

    // kick off any animations/transitions that were originally set up if it isn't the initial mount
    nodeStyle.transitionDuration = originalStyles.transitionDuration
    nodeStyle.animationName = originalStyles.animationName
  })

  // when opening we want it to immediately open to retrieve dimensions
  // when closing we delay `present` to retrieve dimensions before closing
  const isOpen = computed(() => context.open.value || isPresent.value)

  const blockAnimationStyles = shallowRef<Partial<CSSStyleDeclaration> | undefined>(isOpen.value
    ? {
        transitionDuration: '0s !important',
        animationName: 'none !important',
      }
    : undefined)

  onMounted(async () => {
    if (!isOpen.value)
      return

    const node = $el.value
    if (!node)
      return

    blockAnimationStyles.value = undefined
    await nextTick()

    const nodeStyle = node.style

    originalStyles = originalStyles || {
      transitionDuration: nodeStyle.transitionDuration,
      animationName: nodeStyle.animationName,
    }

    nodeStyle.transitionDuration = '0s'
    nodeStyle.animationName = 'none'
  })

  return {
    context,
    isOpen,
    blockAnimationStyles,
  }
}
