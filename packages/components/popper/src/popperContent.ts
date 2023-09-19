import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs, watch, watchEffect } from 'vue'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useComposedRefs, useForwardRef, useSize } from '@oku-ui/use-composable'
import { autoUpdate, flip, arrow as floatingUIarrow, hide, limitShift, offset, shift, size, useFloating } from '@floating-ui/vue'
import type {
  DetectOverflowOptions,
  Middleware,
  Padding,
  Placement,
} from '@floating-ui/vue'
import { getSideAndAlignFromPlacement, isNotNull, transformOrigin } from './utils'
import type { PopperContentNaviteElement } from './props'
import { CONTENT_NAME, popperContentProps, popperContentProvider, scopePopperProps, usePopperInject } from './props'

const PopperContent = defineComponent({
  name: CONTENT_NAME,
  inheritAttrs: false,
  props: {
    ...popperContentProps.props,
    ...scopePopperProps,
    ...primitiveProps,
  },
  emits: popperContentProps.emits,
  setup(props, { attrs, slots, emit }) {
    const {
      scopeOkuPopper,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionBoundary,
      collisionPadding: collisionPaddingProp,
      sticky,
      hideWhenDetached,
      updatePositionStrategy,
      layoutShift,
      ...contentProps
    } = toRefs(props)
    const _reactive = reactive(contentProps)
    const reactiveContentProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = usePopperInject(CONTENT_NAME, scopeOkuPopper.value)

    const content = ref<HTMLDivElement | null>(null)
    const composedRefs = useComposedRefs(useForwardRef(), content)

    const arrow = ref<HTMLSpanElement | null>(null)
    const arrowSize = useSize(arrow)

    const arrowWidth = computed(() => arrowSize.value?.width ?? 0)
    const arrowHeight = computed(() => arrowSize.value?.height ?? 0)

    const desiredPlacement = computed(() => (side.value + (align.value !== 'center' ? `-${align.value}` : '')) as Placement)

    const collisionPadding
      = computed(() => typeof collisionPaddingProp.value === 'number'
        ? collisionPaddingProp.value as Padding
        : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp.value } as Padding)

    const boundary = computed(() => Array.isArray(collisionBoundary.value)
      ? collisionBoundary.value
      : [collisionBoundary.value])

    const hasExplicitBoundaries = computed(() => boundary.value.length > 0)

    const detectOverflowOptions = computed(() => {
      return {
        padding: collisionPadding.value,
        boundary: boundary.value.filter(isNotNull),
        // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
        altBoundary: hasExplicitBoundaries.value,
      } as DetectOverflowOptions
    })

    const computedMiddleware = computed(() => {
      return [
        offset({ mainAxis: sideOffset.value + arrowHeight.value, alignmentAxis: alignOffset.value }),

        avoidCollisions.value && shift({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky.value === 'partial' ? limitShift() : undefined,
          ...detectOverflowOptions.value,
        }),

        avoidCollisions.value && flip({ ...detectOverflowOptions.value }),

        size({
          ...detectOverflowOptions.value,
          apply: ({ elements, rects, availableWidth, availableHeight }) => {
            const { width: anchorWidth, height: anchorHeight } = rects.reference
            const contentStyle = elements.floating.style
            contentStyle.setProperty('--oku-popper-available-width', `${availableWidth}px`)
            contentStyle.setProperty('--oku-popper-available-height', `${availableHeight}px`)
            contentStyle.setProperty('--oku-popper-anchor-width', `${anchorWidth}px`)
            contentStyle.setProperty('--oku-popper-anchor-height', `${anchorHeight}px`)
          },
        }),

        arrow.value && floatingUIarrow({ element: arrow, padding: arrowPadding.value }),

        transformOrigin({ arrowWidth: arrowWidth.value, arrowHeight: arrowHeight.value }),

        hideWhenDetached.value && hide({ strategy: 'referenceHidden', ...detectOverflowOptions.value }),
      ] as Middleware[]
    })

    const refElement = ref()
    const { placement, isPositioned, middlewareData, floatingStyles } = useFloating(
      inject.anchor,
      refElement,
      {
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
        strategy: 'fixed',
        placement: desiredPlacement,
        whileElementsMounted: (...args) => {
          const cleanup = autoUpdate(...args, {
            animationFrame: updatePositionStrategy.value === 'always',
            layoutShift: layoutShift.value,
          })
          return cleanup
        },
        middleware: computedMiddleware,
      })

    const placedSide = computed(
      () => getSideAndAlignFromPlacement(placement.value)[0],
    )
    const placedAlign = computed(
      () => getSideAndAlignFromPlacement(placement.value)[1],
    )

    watchEffect(() => {
      if (isPositioned.value)
        emit('placed')
    })

    const arrowX = computed(() => middlewareData.value.arrow?.x ?? 0)
    const arrowY = computed(() => middlewareData.value.arrow?.y ?? 0)
    const cannotCenterArrow = computed(() => middlewareData.value.arrow?.centerOffset !== 0)

    const contentZIndex = ref()

    watch(content, () => {
      if (content.value)
        contentZIndex.value = window.getComputedStyle(content.value).zIndex
    })

    popperContentProvider({
      scope: scopeOkuPopper.value,
      placedSide,
      onArrowChange(anchor: HTMLElement | null) {
        arrow.value = anchor
      },
      arrowX,
      arrowY,
      shouldHideArrow: cannotCenterArrow,
    })

    return () =>
      h('div',
        {
          'ref': refElement,
          'data-oku-popper-content-wrapper': '',
          'style': {
            ...floatingStyles.value,
            transform: isPositioned.value ? floatingStyles.value.transform : 'translate(0, -200%)', // keep off the page when measuring
            minWidth: 'max-content',
            zIndex: contentZIndex.value ?? undefined,
            ['--oku-popper-transform-origin' as any]: [
              middlewareData.value.transformOrigin?.x,
              middlewareData.value.transformOrigin?.y,
            ].join(' '),
          } as CSSStyleDeclaration,
          'dir': props.dir,
        },
        {
          default: () => [
            h(Primitive.div,
              {
                'data-side': placedSide.value,
                'data-align': placedAlign.value,
                ...mergeProps(attrs, reactiveContentProps),
                'ref': composedRefs,
                'style': {
                  ...attrs.style as any,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: !isPositioned.value ? 'none' : undefined,
                  // hide the content if using the hide middleware and should be hidden
                  opacity: middlewareData.value.hide?.referenceHidden ? 0 : undefined,
                },
              }, slots,
            ),
          ],
        },
      )
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopperContent = PopperContent as typeof PopperContent
& (new () => {
  $props: PopperContentNaviteElement
})
