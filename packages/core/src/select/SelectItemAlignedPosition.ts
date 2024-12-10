import type { UseSelectPopperPrivateProps } from './SelectPopperPosition'
import { nextTick, onMounted, shallowRef } from 'vue'
import { useRef } from '../hooks'
import { clamp, mergePrimitiveAttrs, type PrimitiveElAttrs, type RadixPrimitiveGetAttrs, type RadixPrimitiveReturns } from '../shared'
import { useSelectContentContext } from './SelectContent'
import { CONTENT_MARGIN } from './SelectContentImpl'
import { useCollection, useSelectContext } from './SelectRoot'
import { provideSelectViewportContext } from './SelectViewport'

export type UseSelectItemAlignedPositionProps = UseSelectPopperPrivateProps

export function useSelectItemAlignedPosition(props: UseSelectItemAlignedPositionProps = {}): RadixPrimitiveReturns<{
  wrapperAttrs: () => PrimitiveElAttrs
  attrs: RadixPrimitiveGetAttrs
}> {
  const context = useSelectContext('SelectItemAlignedPosition')
  const contentContext = useSelectContentContext('SelectItemAlignedPosition')
  const contentWrapper = shallowRef<HTMLElement>()
  function setContentWrapper(v: HTMLElement | undefined) {
    contentWrapper.value = v
  }

  const content = shallowRef<HTMLElement>()
  function setContent(v: HTMLElement | undefined) {
    content.value = v
  }
  // const composedRefs = useComposedRefs(forwardedRef, node => setContent(node))
  const getItems = useCollection()
  const shouldExpandOnScrollRef = useRef(false)
  let shouldRepositionRef = true

  const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext

  function position() {
    const triggerEl = context.trigger.value
    const valueNode = context.valueNode.value
    const contentVal = content.value
    const contentWrapperEl = contentWrapper.value
    const viewportEl = viewport.value
    const selectedItemEl = selectedItem.value
    const selectedItemTextEl = selectedItemText.value
    if (
      !triggerEl
      || !valueNode
      || !contentVal
      || !contentWrapperEl
      || !viewportEl
      || !selectedItemEl
      || !selectedItemTextEl
    ) {
      return
    }

    const contentWrapperStyle = contentWrapperEl.style

    const triggerRect = triggerEl.getBoundingClientRect()

    // -----------------------------------------------------------------------------------------
    //  Horizontal positioning
    // -----------------------------------------------------------------------------------------
    const contentRect = contentVal.getBoundingClientRect()
    const valueNodeRect = valueNode.getBoundingClientRect()
    const itemTextRect = selectedItemTextEl.getBoundingClientRect()

    if (context.dir.value !== 'rtl') {
      const itemTextOffset = itemTextRect.left - contentRect.left
      const left = valueNodeRect.left - itemTextOffset
      const leftDelta = triggerRect.left - left
      const minContentWidth = triggerRect.width + leftDelta
      const contentWidth = Math.max(minContentWidth, contentRect.width)
      const rightEdge = window.innerWidth - CONTENT_MARGIN
      const clampedLeft = clamp(
        left,
        CONTENT_MARGIN,
        // Prevents the content from going off the starting edge of the
        // viewport. It may still go off the ending edge, but this can be
        // controlled by the user since they may want to manage overflow in a
        // specific way.
        // https://github.com/radix-ui/primitives/issues/2049
        Math.max(CONTENT_MARGIN, rightEdge - contentWidth),
      )

      contentWrapperStyle.minWidth = `${minContentWidth}px`
      contentWrapperStyle.left = `${clampedLeft}px`
    }
    else {
      const itemTextOffset = contentRect.right - itemTextRect.right
      const right = window.innerWidth - valueNodeRect.right - itemTextOffset
      const rightDelta = window.innerWidth - triggerRect.right - right
      const minContentWidth = triggerRect.width + rightDelta
      const contentWidth = Math.max(minContentWidth, contentRect.width)
      const leftEdge = window.innerWidth - CONTENT_MARGIN
      const clampedRight = clamp(
        right,
        CONTENT_MARGIN,
        Math.max(CONTENT_MARGIN, leftEdge - contentWidth),
      )

      contentWrapperStyle.minWidth = `${minContentWidth}px`
      contentWrapperStyle.right = `${clampedRight}px`
    }

    // -----------------------------------------------------------------------------------------
    // Vertical positioning
    // -----------------------------------------------------------------------------------------
    const items = getItems()
    const availableHeight = window.innerHeight - CONTENT_MARGIN * 2
    const itemsHeight = viewportEl.scrollHeight

    const contentStyles = window.getComputedStyle(contentVal)
    const contentBorderTopWidth = Number.parseInt(contentStyles.borderTopWidth, 10)
    const contentPaddingTop = Number.parseInt(contentStyles.paddingTop, 10)
    const contentBorderBottomWidth = Number.parseInt(contentStyles.borderBottomWidth, 10)
    const contentPaddingBottom = Number.parseInt(contentStyles.paddingBottom, 10)
    const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth // prettier-ignore
    const minContentHeight = Math.min(selectedItemEl.offsetHeight * 5, fullContentHeight)

    const viewportStyles = window.getComputedStyle(viewportEl)
    const viewportPaddingTop = Number.parseInt(viewportStyles.paddingTop, 10)
    const viewportPaddingBottom = Number.parseInt(viewportStyles.paddingBottom, 10)

    const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN
    const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle

    const selectedItemHalfHeight = selectedItemEl.offsetHeight / 2
    const itemOffsetMiddle = selectedItemEl.offsetTop + selectedItemHalfHeight
    const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle
    const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle

    const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle

    if (willAlignWithoutTopOverflow) {
      const isLastItem = items.length > 0 && selectedItemEl === items[items.length - 1]

      contentWrapperStyle.bottom = `${0}px`

      const viewportOffsetBottom = contentVal.clientHeight - viewportEl.offsetTop - viewportEl.offsetHeight
      const clampedTriggerMiddleToBottomEdge = Math.max(
        triggerMiddleToBottomEdge,
        selectedItemHalfHeight
        // viewport might have padding bottom, include it to avoid a scrollable viewport
        + (isLastItem ? viewportPaddingBottom : 0)
        + viewportOffsetBottom
        + contentBorderBottomWidth,
      )
      const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge
      contentWrapperStyle.height = `${height}px`
    }
    else {
      const isFirstItem = items.length > 0 && selectedItemEl === items[0]!

      contentWrapperStyle.top = `${0}px`

      const clampedTopEdgeToTriggerMiddle = Math.max(
        topEdgeToTriggerMiddle,
        contentBorderTopWidth
        + viewportEl.offsetTop
        // viewport might have padding top, include it to avoid a scrollable viewport
        + (isFirstItem ? viewportPaddingTop : 0)
        + selectedItemHalfHeight,
      )
      const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom
      contentWrapperStyle.height = `${height}px`
      viewportEl.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewportEl.offsetTop
    }

    contentWrapperStyle.margin = `${CONTENT_MARGIN}px 0`
    contentWrapperStyle.minHeight = `${minContentHeight}px`
    contentWrapperStyle.maxHeight = `${availableHeight}px`
    // -----------------------------------------------------------------------------------------

    props.onPlaced?.()

    // we don't want the initial scroll position adjustment to trigger "expand on scroll"
    // so we explicitly turn it on only after they've registered.
    requestAnimationFrame(() => {
      shouldExpandOnScrollRef.value = true
    })
  }

  // copy z-index from content to wrapper
  const contentZIndex = shallowRef<string>()

  onMounted(async () => {
    await nextTick()
    position()
    if (content.value)
      contentZIndex.value = window.getComputedStyle(content.value).zIndex
  })

  // When the viewport becomes scrollable at the top, the scroll up button will mount.
  // Because it is part of the normal flow, it will push down the viewport, thus throwing our
  // trigger => selectedItem alignment off by the amount the viewport was pushed down.
  // We wait for this to happen and then re-run the positining logic one more time to account for it.
  function onScrollButtonChange(node: HTMLElement | undefined) {
    if (node && shouldRepositionRef === true) {
      position()
      focusSelectedItem?.()
      shouldRepositionRef = false
    }
  }

  provideSelectViewportContext({
    contentWrapper,
    shouldExpandOnScrollRef,
    onScrollButtonChange,
  })

  return {
    wrapperAttrs() {
      const attrs: PrimitiveElAttrs = {
        ref: setContentWrapper,
        style: {
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          zIndex: contentZIndex.value,
        },
      }

      return attrs
    },

    attrs(extraAttrs) {
      const attrs: PrimitiveElAttrs = {
        elRef: setContent,
        style: {
          // When we get the height of the content, it includes borders. If we were to set
          // the height without having `boxSizing: 'border-box'` it would be too big.
          boxSizing: 'border-box',
          // We need to ensure the content doesn't get taller than the wrapper
          maxHeight: '100%',
        },
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
