import type {
  CSSProperties,
  MaybeRef,
} from 'vue'
import {
  defineComponent,
  h,
  mergeProps,
  nextTick,
  onMounted,
  ref,
  toRefs,
  unref,
} from 'vue'
import {
  useComposedRefs,
  useForwardRef,
} from '@oku-ui/use-composable'
import { clamp } from '@oku-ui/utils'
import { Primitive } from '@oku-ui/primitive'
import {
  CONTENT_MARGIN,
} from './types'
import type {
  SelectItemAlignedPositionElement,
  SelectScrollButtonImplElement,
} from './types'
import {
  CONTENT_NAME,
  ITEM_ALIGNED_POSITION_NAME,
  SelectViewportProvider,
  scopeSelectProps,
  selectItemAlignedPositionProps,
  useCollection,
  useSelectContentInject,
  useSelectInject,
} from './props'

const SelectItemAlignedPosition = defineComponent({
  name: ITEM_ALIGNED_POSITION_NAME,
  inheritAttrs: false,
  props: {
    ...selectItemAlignedPositionProps.props,
    ...scopeSelectProps,
  },
  emits: {
    ...selectItemAlignedPositionProps.emits,
  },
  setup(props, { slots, emit, attrs }) {
    const { scopeOkuSelect, ...selectItemAlignedProps } = toRefs(props)

    const selectInject = useSelectInject(CONTENT_NAME, scopeOkuSelect.value)
    const selectContentInject = useSelectContentInject(
      CONTENT_NAME,
      scopeOkuSelect.value,
    )

    const content = ref<HTMLDivElement | null>(null)
    const contentWrapper = ref<HTMLDivElement | null>(null)

    const shouldExpandOnScrollRef = ref<boolean>(false)
    const shouldRepositionRef = ref<boolean>(true)

    const contentZIndex = ref<string>()

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, content)

    const getItems = useCollection(scopeOkuSelect)

    const { viewport, selectedItem, selectedItemText, focusSelectedItem }
      = selectContentInject

    const position = () => {
      if (
        selectInject.trigger.value
        && selectInject.valueNode.value
        && contentWrapper.value
        && content.value
        && viewport?.value
        && selectedItem?.value
        && selectedItemText?.value
      ) {
        const triggerRect
          = selectInject.trigger.value?.getBoundingClientRect?.()

        // -----------------------------------------------------------------------------------------
        //  Horizontal positioning
        // -----------------------------------------------------------------------------------------
        const contentRect = content.value?.getBoundingClientRect?.()
        const valueNodeRect
          = selectInject.valueNode.value?.getBoundingClientRect?.()
        const itemTextRect = selectedItemText?.value?.getBoundingClientRect?.()

        if (selectInject.dir.value !== 'rtl') {
          const itemTextOffset = itemTextRect!.left - contentRect.left
          const left = valueNodeRect!.left - itemTextOffset
          const leftDelta = triggerRect!.left - left
          const minContentWidth = triggerRect!.width + leftDelta
          const contentWidth = Math.max(minContentWidth, contentRect.width)
          const rightEdge = window.innerWidth - CONTENT_MARGIN
          const clampedLeft = clamp(left, [
            CONTENT_MARGIN,
            rightEdge - contentWidth,
          ])

          contentWrapper.value.style.minWidth = `${minContentWidth}px`
          contentWrapper.value.style.left = `${clampedLeft}px`
        }
        else {
          const itemTextOffset = contentRect.right - itemTextRect!.right
          const right
            = window.innerWidth - valueNodeRect!.right - itemTextOffset
          const rightDelta = window.innerWidth - triggerRect!.right - right
          const minContentWidth = triggerRect!.width + rightDelta
          const contentWidth = Math.max(minContentWidth, contentRect.width)
          const leftEdge = window.innerWidth - CONTENT_MARGIN
          const clampedRight = clamp(right, [
            CONTENT_MARGIN,
            leftEdge - contentWidth,
          ])

          contentWrapper.value.style.minWidth = `${minContentWidth}px`
          contentWrapper.value.style.right = `${clampedRight}px`
        }

        // -----------------------------------------------------------------------------------------
        // Vertical positioning
        // -----------------------------------------------------------------------------------------
        const items = getItems()
        const availableHeight = window.innerHeight - CONTENT_MARGIN * 2
        const itemsHeight = viewport?.value?.scrollHeight

        const contentStyles = window.getComputedStyle(content.value as Element)
        const contentBorderTopWidth = Number.parseInt(
          contentStyles.borderTopWidth,
          10,
        )
        const contentPaddingTop = Number.parseInt(contentStyles.paddingTop, 10)
        const contentBorderBottomWidth = Number.parseInt(
          contentStyles.borderBottomWidth,
          10,
        )
        const contentPaddingBottom = Number.parseInt(contentStyles.paddingBottom, 10)
        const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight! + contentPaddingBottom + contentBorderBottomWidth // prettier-ignore
        const minContentHeight = Math.min(
          selectedItem.value.offsetHeight! * 5,
          fullContentHeight,
        )

        const viewportStyles = window.getComputedStyle(
          viewport?.value as Element,
        )
        const viewportPaddingTop = Number.parseInt(viewportStyles.paddingTop, 10)
        const viewportPaddingBottom = Number.parseInt(
          viewportStyles.paddingBottom,
          10,
        )

        const topEdgeToTriggerMiddle
          = triggerRect!.top + triggerRect!.height / 2 - CONTENT_MARGIN
        const triggerMiddleToBottomEdge
          = availableHeight - topEdgeToTriggerMiddle

        const selectedItemHalfHeight = selectedItem.value.offsetHeight! / 2
        const itemOffsetMiddle
          = selectedItem.value.offsetTop! + selectedItemHalfHeight
        const contentTopToItemMiddle
          = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle
        const itemMiddleToContentBottom
          = fullContentHeight - contentTopToItemMiddle

        const willAlignWithoutTopOverflow
          = contentTopToItemMiddle <= topEdgeToTriggerMiddle

        if (willAlignWithoutTopOverflow) {
          const isLastItem
            = selectedItem === items[items.length - 1].ref.current
          contentWrapper.value.style.bottom = `${0}px`
          const viewportOffsetBottom
            = content.value.clientHeight
            - viewport.value.offsetTop!
            - viewport.value.offsetHeight!
          const clampedTriggerMiddleToBottomEdge = Math.max(
            triggerMiddleToBottomEdge,
            selectedItemHalfHeight
              // viewport might have padding bottom, include it to avoid a scrollable viewport
              + (isLastItem ? viewportPaddingBottom : 0)
              + viewportOffsetBottom
              + contentBorderBottomWidth,
          )
          const height
            = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge
          contentWrapper.value.style.height = `${height}px`
        }
        else {
          const isFirstItem = selectedItem === items[0].ref.current
          contentWrapper.value.style.top = `${0}px`
          const clampedTopEdgeToTriggerMiddle = Math.max(
            topEdgeToTriggerMiddle,
            contentBorderTopWidth
              + viewport.value.offsetTop!
              // viewport might have padding top, include it to avoid a scrollable viewport
              + (isFirstItem ? viewportPaddingTop : 0)
              + selectedItemHalfHeight,
          )
          const height
            = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom
          contentWrapper.value.style.height = `${height}px`
          viewport.value.scrollTop
            = contentTopToItemMiddle
            - topEdgeToTriggerMiddle
            + viewport.value.offsetTop!
        }

        contentWrapper.value.style.margin = `${CONTENT_MARGIN}px 0`
        contentWrapper.value.style.minHeight = `${minContentHeight}px`
        contentWrapper.value.style.maxHeight = `${availableHeight}px`
        // -----------------------------------------------------------------------------------------

        emit('placed')

        // we don't want the initial scroll position adjustment to trigger "expand on scroll"
        // so we explicitly turn it on only after they've registered.
        requestAnimationFrame(() => (shouldExpandOnScrollRef.value = true))
      }
    }

    onMounted(() => {
      if (content.value)
        contentZIndex.value = window.getComputedStyle(content.value).zIndex

      nextTick(() => position())
    })

    // When the viewport becomes scrollable at the top, the scroll up button will mount.
    // Because it is part of the normal flow, it will push down the viewport, thus throwing our
    // trigger => selectedItem alignment off by the amount the viewport was pushed down.
    // We wait for this to happen and then re-run the positining logic one more time to account for it.
    const handleScrollButtonChange
      = (node: MaybeRef<SelectScrollButtonImplElement | null>) => {
        if (unref(node) && shouldRepositionRef.value === true) {
          position()
          focusSelectedItem?.()
          shouldRepositionRef.value = false
        }
      }

    SelectViewportProvider({
      scope: scopeOkuSelect.value,
      contentWrapper,
      shouldExpandOnScrollRef,
      onScrollButtonChange: handleScrollButtonChange,
    })

    return () =>
      h(
        'div',
        {
          ref: contentWrapper,
          style: {
            'display': 'flex',
            'flex-direction': 'column',
            'position': 'fixed',
            'z-index': contentZIndex.value,
          },
        },
        {
          default: () =>
            h(
              Primitive.div,
              {
                ...mergeProps(attrs, selectItemAlignedProps),
                ref: composedRefs,
                style: {
                  // When we get the height of the content, it includes borders. If we were to set
                  // the height without having `boxSizing: 'border-box'` it would be too big.
                  'box-sizing': 'border-box',
                  'max-height': '100%',
                  ...(attrs.style as CSSProperties),
                },
              },
              slots,
            ),
        },
      )
  },
})

export const OkuSelectItemAlignedPosition
  = SelectItemAlignedPosition as typeof SelectItemAlignedPosition &
  (new () => {
    $props: SelectItemAlignedPositionElement
  })
