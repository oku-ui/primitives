import { onMounted } from 'vue'
import { useRef } from '../hooks/index.ts'
import { mergeHooksAttrs, type PrimitiveElAttrs, type RadixPrimitiveReturns, type RefOrRefObject } from '../shared/index.ts'
import { useScrollAreaContext } from './ScrollAreaRoot.ts'

export interface ScrollAreaViewportProps {
  el?: RefOrRefObject<HTMLElement | undefined>
}

export function useScrollAreaViewport(props: ScrollAreaViewportProps = {}): RadixPrimitiveReturns {
  const context = useScrollAreaContext('ScrollAreaViewport')
  const el = props.el || useRef<HTMLElement>()
  const setTemplateEl = props.el ? undefined : (value: HTMLElement | undefined) => el.value = value

  onMounted(() => {
    context.viewport.value = el.value
  })

  return {
    attrs(extraAttrs) {
      const attrs: PrimitiveElAttrs = {
        'ref': setTemplateEl,
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

      if (extraAttrs && extraAttrs.length > 0) {
        mergeHooksAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
