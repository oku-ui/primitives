import type { CSSProperties } from 'vue'
import {
  defineComponent,
  h,
  mergeProps,
  onMounted,
  ref,
  toRefs,
} from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import type { SelectViewportElement, SelectViewportNativeElement } from './props'
import {
  CONTENT_MARGIN,
  CollectionSlot,
  VIEWPORT_NAME,
  scopeSelectProps,
  selectViewportProps,
  useSelectContentInject,
  useSelectViewportContext,
} from './props'

const SelectViewport = defineComponent({
  name: VIEWPORT_NAME,
  inheritAttrs: false,
  props: {
    ...selectViewportProps.props,
    ...scopeSelectProps,
  },
  emits: {
    ...selectViewportProps.emits,
  },
  setup(props, { slots, emit, attrs }) {
    const { scopeOkuSelect, ...selectViewportProps } = toRefs(props)

    const selectContentInject = useSelectContentInject(
      VIEWPORT_NAME,
      scopeOkuSelect.value,
    )
    const viewportInject = useSelectViewportContext(
      VIEWPORT_NAME,
      scopeOkuSelect.value,
    )

    const viewportRef = ref<HTMLDivElement | null>(null)

    const prevScrollTopRef = ref<number>(0)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, viewportRef)

    onMounted(() => {
      selectContentInject.onViewportChange?.(
        viewportRef.value as unknown as SelectViewportElement,
      )
    })

    return () => [
      h('style', {}, [
        '[data-oku-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}',
        '[data-oku-select-viewport]::-webkit-scrollbar{display:none}',
      ]),
      h(
        CollectionSlot,
        {
          scope: scopeOkuSelect.value,
        },
        {
          default: () =>
            h(
              Primitive.div,
              {
                'data-oku-select-viewport': '',
                'role': 'presentation',
                ...mergeProps(attrs, selectViewportProps),
                'ref': composedRefs,
                'style': {
                  // we use position: 'relative' here on the `viewport` so that when we call
                  // `selectedItem.value.offsetTop` in calculations, the offset is relative to the viewport
                  // (independent of the scrollUpButton).
                  position: 'relative',
                  flex: 1,
                  overflow: 'auto',
                  ...(attrs.style as CSSProperties),
                },
                'onScroll': composeEventHandlers((event: Event) => {
                  emit('onscroll', event)

                  const viewport = event.currentTarget as HTMLElement

                  const { contentWrapper, shouldExpandOnScrollRef }
                    = viewportInject

                  if (shouldExpandOnScrollRef?.value && contentWrapper?.value) {
                    const scrolledBy = Math.abs(
                      prevScrollTopRef.value - viewport.scrollTop!,
                    )

                    if (scrolledBy > 0) {
                      const availableHeight
                        = window.innerHeight - CONTENT_MARGIN * 2
                      const cssMinHeight = Number.parseFloat(
                        contentWrapper.value.style.minHeight,
                      )
                      const cssHeight = Number.parseFloat(
                        contentWrapper.value.style.height,
                      )
                      const prevHeight = Math.max(cssMinHeight, cssHeight)

                      if (prevHeight < availableHeight) {
                        const nextHeight = prevHeight + scrolledBy
                        const clampedNextHeight = Math.min(
                          availableHeight,
                          nextHeight,
                        )

                        const heightDiff = nextHeight - clampedNextHeight
                        contentWrapper.value.style.height
                          = `${clampedNextHeight}px`

                        if (contentWrapper.value.style.bottom === '0px') {
                          viewport.scrollTop = heightDiff > 0 ? heightDiff : 0
                          // ensure the content stays pinned to the bottom
                          contentWrapper.value.style.justifyContent
                            = 'flex-end'
                        }
                      }
                    }
                  }

                  prevScrollTopRef.value = viewport?.scrollTop
                }),
              },
              slots,
            ),
        },
      ),
    ]
  },
})

export const OkuSelectViewport = SelectViewport as typeof SelectViewport &
(new () => {
  $props: SelectViewportNativeElement
})
