import { computed, type CSSProperties, nextTick, onMounted, type Ref, shallowRef } from 'vue'
import { usePresence } from '../presence/index.ts'
import { mergeHooksAttrs, type RadixPrimitiveGetAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useCollapsibleContext } from './CollapsibleRoot.ts'

export interface CollapsibleContentProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with Vue animation libraries.
   */
  forceMount?: boolean
}

export interface UseCollapsibleContentProps {
  el?: Ref<HTMLElement | undefined>
  forceMount?: boolean
}

export function useCollapsibleContent(props: UseCollapsibleContentProps): RadixPrimitiveReturns<{
  isOpen: Ref<boolean>
  attrs: RadixPrimitiveGetAttrs
}> {
  const el = props.el || shallowRef<HTMLElement>()
  const setTemplateEl = props.el ? undefined : (value: HTMLElement | undefined) => el.value = value

  const context = useCollapsibleContext('CollapsibleContent')

  let originalStyles: Pick<CSSStyleDeclaration, 'transitionDuration' | 'animationName'>

  let isPresent: Ref<boolean>
  let isOpen: Ref<boolean>
  if (props.forceMount) {
    isPresent = shallowRef(true)
    isOpen = shallowRef(true)
  }
  else {
    isPresent = usePresence(el, () => props.forceMount || context.open.value, () => {
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
    isOpen = computed(() => context.open.value || isPresent.value)
  }

  const blockAnimationStyles = shallowRef<CSSProperties | undefined>(
    isOpen.value
      ? { transitionDuration: '0s !important', animationName: 'none !important' }
      : undefined,
  )

  onMounted(async () => {
    if (!isOpen.value)
      return

    const node = el.value
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
    isOpen,
    attrs(extraAttrs) {
      const attrs = {
        'ref': setTemplateEl,
        'id': context.contentId,
        'data-state': context.open.value ? 'open' : 'closed',
        'data-disabled': context.disabled() ? '' : undefined,
        'hidden': !isOpen.value,
        'style': {
          '--radix-collapsible-content-height': '0px',
          '--radix-collapsible-content-width': '0px',
          ...blockAnimationStyles.value,
        },
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergeHooksAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
