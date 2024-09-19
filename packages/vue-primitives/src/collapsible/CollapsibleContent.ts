import { type CSSProperties, nextTick, onMounted, type Ref, shallowRef, watchEffect } from 'vue'
import { usePresence } from '../presence/index.ts'
import { type Data, mergeAttrs } from '../shared/index.ts'
import { useCollapsibleContext } from './CollapsibleRoot.ts'

export interface CollapsibleContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean
}

export interface UseCollapsibleContentProps {
  isOpen: Ref<boolean>
  el: Ref<HTMLElement | undefined>
  forceMount?: boolean
}

export interface UseCollapsibleContentReturns {
  'id': string
  'data-state': 'open' | 'closed'
  'data-disabled'?: string
  'hidden': boolean
  'style': CSSProperties
  [key: string]: any
}

export function useCollapsibleContent(
  props: UseCollapsibleContentProps,
): (extraAttrs?: Data) => UseCollapsibleContentReturns {
  const context = useCollapsibleContext('CollapsibleContent')

  let originalStyles: Pick<CSSStyleDeclaration, 'transitionDuration' | 'animationName'>

  const isPresent = usePresence(props.el, () => props.forceMount || context.open.value, () => {
    const node = props.el.value
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
  watchEffect(() => {
    props.isOpen.value = context.open.value || isPresent.value
  })

  const blockAnimationStyles = shallowRef<CSSProperties | undefined>(props.isOpen.value
    ? {
        transitionDuration: '0s !important',
        animationName: 'none !important',
      }
    : undefined)

  onMounted(async () => {
    if (!props.isOpen.value)
      return

    const node = props.el.value
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

  return (extraAttrs?: Data): UseCollapsibleContentReturns => {
    const attrs = {
      'id': context.contentId,
      'data-state': context.open.value ? 'open' : 'closed',
      'data-disabled': context.disabled() ? '' : undefined,
      'hidden': !props.isOpen.value,
      'style': {
        '--radix-collapsible-content-height': '0px',
        '--radix-collapsible-content-width': '0px',
        ...blockAnimationStyles.value,
      },
    } as const

    if (extraAttrs)
      mergeAttrs(attrs, extraAttrs)

    return attrs
  }
}
