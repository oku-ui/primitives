import type { ElementType, PrimitiveProps } from '@Oku-ui/primitive'
import { Primitive, primitiveProps } from '@Oku-ui/primitive'
import { Fragment, defineComponent, h, ref } from 'vue'
import { useComposedRefs, useForwardRef } from '@Oku-ui/use-composable'
import { scopedProps } from './types'
import { useScrollAreaContext } from './scroll-area'

/* -------------------------------------------------------------------------------------------------
 * ScrollAreaViewportViewport
 * ----------------------------------------------------------------------------------------------- */

const VIEWPORT_NAME = 'ScrollAreaViewportViewport'

export type ScrollAreaViewportIntrinsicElement = ElementType<'div'>
type ScrollAreaViewportElement = HTMLDivElement

interface ScrollAreaViewportProps extends PrimitiveProps { }

const scrollAreaViewport = defineComponent({
  name: VIEWPORT_NAME,
  inheritAttrs: false,
  props: {
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { ...scrollAreaViewportAttrs } = attrs as ScrollAreaViewportIntrinsicElement

    const context = useScrollAreaContext(VIEWPORT_NAME, props.scopeOkuScrollArea)
    const scrollAreaViewportRef = ref<ScrollAreaViewportElement>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, scrollAreaViewportRef, context.onViewportChange)

    const originalReturn = () =>
      h(
        Fragment,
        [
          // h(
          // Style,
          // [
          //   dangerouslySetInnerHTML: __html: `[data-oku-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-oku-scroll-area-viewport]::-webkit-scrollbar{display:none}`,
          // ]
          // ),
          h(
            Primitive.div,
            {
              'data-oku-scroll-area-viewport': '',
              ...scrollAreaViewportAttrs,
              'ref': composedRefs,
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
                overflowX: context.scrollbarXEnabled ? 'scroll' : 'hidden',
                overflowY: context.scrollbarYEnabled ? 'scroll' : 'hidden',
                // ...props.style,
              },
            },
            [
              /**
               * `display: table` ensures our content div will match the size of its children in both
               * horizontal and vertical axis so we can determine if scroll width/height changed and
               * recalculate thumb sizes. This doesn't account for children with *percentage*
               * widths that change. We'll wait to see what use-cases consumers come up with there
               * before trying to resolve it.
               */
              h(
                'div',
                {
                  ref: context.onContentChange,
                  style: { minWidth: '100%', display: 'table' },
                },
                [
                  slots.default?.(),
                ],
              ),
            ],
          ),
        ],
      )

    return originalReturn
  },
})

export const OkuScrollAreaViewport = scrollAreaViewport as typeof scrollAreaViewport &
(new () => { $props: Partial<ScrollAreaViewportElement> })

export type { ScrollAreaViewportElement, ScrollAreaViewportProps }
