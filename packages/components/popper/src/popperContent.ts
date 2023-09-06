import type { PropType, Ref, StyleValue } from 'vue'
import { computed, defineComponent, h, onMounted, ref, toRefs, watch, watchEffect } from 'vue'

import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef, useSize } from '@oku-ui/use-composable'
import { autoUpdate, flip, arrow as floatingUIarrow, hide, limitShift, offset, shift, size, useFloating } from '@floating-ui/vue'
import type {
  DetectOverflowOptions,
  Middleware,
  Padding,
  Placement,
} from '@floating-ui/vue'
import type { Align, Side } from './utils'
import { ALIGN_OPTIONS, SIDE_OPTIONS, getSideAndAlignFromPlacement, isNotNull, scopePopperProps, transformOrigin } from './utils'
import { createPopperProvider, usePopperInject } from './popper'

const CONTENT_NAME = 'OkuPopperContent'

type PopperContentContextValue = {
  placedSide: Ref<Side | undefined>
  onArrowChange(arrow: HTMLSpanElement | null): void
  arrowX?: Ref<number | undefined>
  arrowY?: Ref<number | undefined>
  shouldHideArrow: Ref<boolean | undefined>
}

export const [popperContentProvider, usePopperContentInject] = createPopperProvider<PopperContentContextValue>(CONTENT_NAME)

type Boundary = Element | null

export type PopperContentNaviteElement = OkuElement<'div'>
export type PopperContentElement = HTMLDivElement

export interface PopperContentProps extends PrimitiveProps {
  side?: Side
  sideOffset?: number
  align?: Align
  alignOffset?: number
  arrowPadding?: number
  avoidCollisions?: boolean
  collisionBoundary?: Boundary | Boundary[]
  collisionPadding?: Padding
  sticky?: 'partial' | 'always'
  hideWhenDetached?: boolean
  updatePositionStrategy?: 'optimized' | 'always'
}

export type PopperContentEmits = {
  placed: [void]
}

export const popperContentProps = {
  props: {
    side: {
      type: String as unknown as PropType<Side>,
      required: false,
      default: 'bottom',
      validator: (value: Side) => SIDE_OPTIONS.includes(value),
    },
    sideOffset: {
      type: Number,
      required: false,
      default: 0,
    },
    align: {
      type: String as unknown as PropType<Align>,
      required: false,
      default: 'center',
      validator: (value: Align) => ALIGN_OPTIONS.includes(value),
    },
    alignOffset: {
      type: Number,
      required: false,
      default: 0,
    },
    arrowPadding: {
      type: Number,
      required: false,
      default: 0,
    },
    avoidCollisions: {
      type: Boolean,
      required: false,
      default: true,
    },
    collisionBoundary: {
      type: [Object, Array] as unknown as PropType<Boundary | Boundary[]>,
      required: false,
      default: () => [],
    },
    collisionPadding: {
      type: [Number, Object] as unknown as PropType<Padding>,
      required: false,
      default: 0,
    },
    sticky: {
      type: String as unknown as PropType<'partial' | 'always'>,
      required: false,
      default: 'partial',
    },
    hideWhenDetached: {
      type: Boolean,
      required: false,
      default: false,
    },
    updatePositionStrategy: {
      type: String as unknown as PropType<'optimized' | 'always'>,
      required: false,
      default: 'optimized',
    },
  },
  emits: {
    placed: () => true,
  },
}

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
    } = toRefs(props)

    const { ...attrsElement } = attrs as PopperContentNaviteElement

    const inject = usePopperInject(CONTENT_NAME, props.scopeOkuPopper)

    const content = ref<HTMLDivElement | null>(null)
    const composedRefs = useComposedRefs(useForwardRef(), content)

    const arrow = ref<HTMLSpanElement | null>(null)
    const arrowSize = useSize(arrow)

    const arrowWidth = computed(() => arrowSize.value?.width || 0)
    const arrowHeight = computed(() => arrowSize.value?.height || 0)

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

        arrow.value && floatingUIarrow({ element: arrow.value, padding: arrowPadding.value }),

        transformOrigin({ arrowWidth: arrowWidth.value, arrowHeight: arrowHeight.value }),

        hideWhenDetached.value && hide({ strategy: 'referenceHidden', ...detectOverflowOptions.value }),
      ] as Middleware[]
    })

    const refElement = ref()
    const { strategy, placement, isPositioned, middlewareData, update, floatingStyles } = useFloating(
      computed(() => inject.anchor.value),
      computed(() => refElement.value),
      {
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
        strategy: 'fixed',
        placement: desiredPlacement,
        whileElementsMounted: (...args) => {
          const cleanup = autoUpdate(...args, {
            animationFrame: updatePositionStrategy.value === 'always',
          })
          return cleanup
        },
        middleware: computedMiddleware,
        transform: false,
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

    const arrowX = computed(() => middlewareData.value.arrow?.x || 0)
    const arrowY = computed(() => middlewareData.value.arrow?.y || 0)
    const cannotCenterArrow = computed(() => middlewareData.value.arrow?.centerOffset !== 0)

    const contentZIndex = ref()

    watchEffect(() => {
      if (content.value)
        contentZIndex.value = window.getComputedStyle(content.value).zIndex
    })

    popperContentProvider({
      scope: props.scopeOkuPopper,
      placedSide,
      onArrowChange(anchor: HTMLElement | null) {
        arrow.value = anchor
      },
      arrowX,
      arrowY,
      shouldHideArrow: cannotCenterArrow,
    })

    watch([inject.anchor, refElement], () => {
      update()
    })

    onMounted(() => {
      update()
    })
    const originalReturn = () =>
      h('div',
        {
          'ref': refElement,
          'data-oku-popper-content-wrapper': '',
          'style': {
            ...floatingStyles.value,
            'position': strategy.value,
            'transform': isPositioned ? floatingStyles.value.transform : 'translate(0, -200%)', // keep off the page when measuring
            'min-width': 'max-content',
            'zIndex': contentZIndex.value,
            ['--oku-popper-transform-origin' as any]: [
              middlewareData.value.transformOrigin?.x,
              middlewareData.value.transformOrigin?.y,
            ].join(' '),
          } as StyleValue,
          'dir': attrsElement.dir,
        },
        [
          h(Primitive.div,
            {
              'data-side': placedSide.value,
              'data-align': placedAlign.value,
              ...attrsElement,
              'asChild': props.asChild,
              'ref': composedRefs,
              'style': {
                ...attrsElement.style as any,
                // if the PopperContent hasn't been placed yet (not all measurements done)
                // we prevent animations so that users's animation don't kick in too early referring wrong sides
                animation: !isPositioned.value ? 'none' : undefined,
                // hide the content if using the hide middleware and should be hidden
                opacity: middlewareData.value.hide?.referenceHidden ? 0 : undefined,
              } as StyleValue,
            }, slots,
          ),
        ],
      )

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopperContent = PopperContent as typeof PopperContent
& (new () => {
  $props: PopperContentNaviteElement
})
