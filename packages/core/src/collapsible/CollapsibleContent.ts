import { computed, type CSSProperties, nextTick, onMounted, type Ref, shallowRef } from 'vue'
import { usePresence } from '../presence/index.ts'
import { mergePrimitiveAttrs, type PrimitiveDefaultProps, type RadixPrimitiveGetAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useCollapsibleContext } from './CollapsibleRoot.ts'

export interface CollapsibleContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean
}

export const DEFAULT_COLLAPSIBLE_CONTENT_PROPS = {
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<CollapsibleContentProps>

export interface UseCollapsibleContentProps {
  el?: Ref<HTMLElement | undefined>
  forceMount?: boolean
}

export function useCollapsibleContent(props: UseCollapsibleContentProps): RadixPrimitiveReturns<{
  isOpen: Ref<boolean>
  attrs: RadixPrimitiveGetAttrs
}> {
  const el = props.el || shallowRef<HTMLElement>()
  const setElRef = props.el ? undefined : (value: HTMLElement | undefined) => el.value = value

  const context = useCollapsibleContext('CollapsibleContent')

  let originalStyles: Pick<CSSStyleDeclaration, 'transitionDuration' | 'animationName'>

  const isPresent = props.forceMount
    ? shallowRef(true)
    : usePresence(el, context.open, () => {
      const node = el.value
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
  const isOpen = computed(() => isPresent.value || context.open.value)
  const _isOpen = isOpen.value

  const lockAnimationStyles = shallowRef<CSSProperties | undefined>(
    _isOpen
      ? { transitionDuration: '0s !important', animationName: 'none !important' }
      : undefined,
  )

  onMounted(async () => {
    if (!_isOpen)
      return

    const node = el.value
    if (!node)
      return

    lockAnimationStyles.value = undefined
    await nextTick()

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
  })

  return {
    isOpen,
    attrs(extraAttrs) {
      const attrs = {
        'elRef': setElRef,
        'id': context.contentId,
        'data-state': context.open.value ? 'open' : 'closed',
        'data-disabled': context.disabled() ? '' : undefined,
        'hidden': !isOpen.value,
        'style': {
          '--radix-collapsible-content-height': '0px',
          '--radix-collapsible-content-width': '0px',
          ...lockAnimationStyles.value,
        },
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
