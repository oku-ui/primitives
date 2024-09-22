import type { RefObject } from '../hooks/index.ts'
import { onMounted, type Ref } from 'vue'
import { type ElAttrs, mergeHooksAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'

export interface ScrollAreaViewportProps {
  el: RefObject<HTMLElement | undefined> | Ref<HTMLElement | undefined>
}

export function useScrollAreaViewport(props: ScrollAreaViewportProps): RadixPrimitiveReturns {
  const context = useScrollAreaContext('ScrollAreaViewport')

  onMounted(() => {
    context.viewport.value = 'current' in props.el ? props.el.current : props.el.value
  })

  return {
    attrs(extraAttrs) {
      const attrs: ElAttrs = {
        'data-radix-scroll-area-viewport': '',
        'style': {
          /**
           * We don't support `visible` because the intention is to have at least one scrollbar
           * if this component is used and `visible` will behave like `auto` in that case
           * https://developer.mozilla.org/en-US/docs/Web/CSS/overflowed#description
           *
           * We don't handle `auto` because the intention is for the native implementation
           * to be hidden if using this component. We just want to ensure the node is scrollable
           * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
           * the browser from having to work out whether to render native scrollbars or not,
           * we tell it to with the intention of hiding them in CSS.
           */
          overflowX: context.scrollbarXEnabled.value ? 'scroll' : 'hidden',
          overflowY: context.scrollbarYEnabled.value ? 'scroll' : 'hidden',
        },
      }

      if (extraAttrs) {
        mergeHooksAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
