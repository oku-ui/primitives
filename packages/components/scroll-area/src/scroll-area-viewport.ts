import { Fragment, defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useScrollAreaInject } from './scroll-area'
import { scopedScrollAreaProps } from './types'

const VIEWPORT_NAME = 'OkuScrollAreaViewport'

export type ScrollAreaViewportNaviteElement = OkuElement<'div'>
export type ScrollAreaViewportElement = HTMLDivElement

export interface ScrollAreaViewportProps extends PrimitiveProps { }

const scrollAreaViewportProps = {
  props: {
    ...primitiveProps,
  },
  emits: {},
}

const scrollAreaViewport = defineComponent({
  name: VIEWPORT_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaViewportProps.props,
    ...scopedScrollAreaProps,
  },
  emits: scrollAreaViewportProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuScrollArea,
      ...scrollAreaViewportProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaViewportProps)
    const reactiveScrollAreaViewportProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useScrollAreaInject(VIEWPORT_NAME, scopeOkuScrollArea.value)
    const scrollAreaViewportRef = ref<ScrollAreaViewportElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, scrollAreaViewportRef, el => inject.onViewportChange(el as ScrollAreaViewportElement))

    return () => h(Fragment,
      [
        h('style',
          {
            dangerouslySetInnerHTML: {
              __html: '[data-oku-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-oku-scroll-area-viewport]::-webkit-scrollbar{display:none}',
            },
          },
        ),
        h(Primitive.div,
          {
            'data-oku-scroll-area-viewport': '',
            ...mergeProps(attrs, reactiveScrollAreaViewportProps),
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
              overflowX: inject.scrollbarXEnabled.value ? 'scroll' : 'hidden',
              overflowY: inject.scrollbarYEnabled.value ? 'scroll' : 'hidden',
              ...attrs.style as CSSStyleRule,
            },
          },
          {
            /**
             * `display: table` ensures our content div will match the size of its children in both
             * horizontal and vertical axis so we can determine if scroll width/height changed and
             * recalculate thumb sizes. This doesn't account for children with *percentage*
             * widths that change. We'll wait to see what use-cases consumers come up with there
             * before trying to resolve it.
             */
            default: () => h('div',
              {
                ref: el => inject.onContentChange(el as HTMLDivElement),
                style: { minWidth: '100%', display: 'table' },
              }, slots,
            ),
          },
        ),
      ],
    )
  },
})

export const OkuScrollAreaViewport = scrollAreaViewport as typeof scrollAreaViewport &
(new () => { $props: ScrollAreaViewportNaviteElement })
