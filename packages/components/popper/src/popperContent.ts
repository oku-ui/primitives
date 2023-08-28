import type { PropType, Ref, StyleValue } from 'vue'
import { computed, defineComponent, h, onMounted, ref, toRefs, watch, watchEffect } from 'vue'

import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { computedEager, useCallbackRef, useComposedRefs, useForwardRef, useSize } from '@oku-ui/use-composable'
import { autoUpdate, flip, arrow as floatingUIarrow, hide, limitShift, offset, shift, size, useFloating } from '@floating-ui/vue'
import type {
  DetectOverflowOptions,
  Middleware,
  Padding,
  Placement,
} from '@floating-ui/vue'
import type { Align, ScopePopper, Side } from './utils'
import { ALIGN_OPTIONS, SIDE_OPTIONS, getSideAndAlignFromPlacement, isDefined, isNotNull, scopePopperProps, transformOrigin } from './utils'
import type { PopperProvideValue } from './popper'
import { createPopperProvider, usePopperInject } from './popper'

const CONTENT_NAME = 'OkuPopperContent'

type PopperContentContextValue = {
  placedSide: Ref<Side>
  arrow: Ref<HTMLSpanElement | null>
  arrowX?: Ref<string>
  arrowY?: Ref<string>
  shouldHideArrow: Ref<boolean>
  x?: Ref<number>
  y?: Ref<number>
} & PopperProvideValue

export const [popperContentProvider, usePopperContentInject] = createPopperProvider<PopperContentContextValue>(CONTENT_NAME)

type Boundary = Element | null

export type PopperContentIntrinsicElement = ElementType<'div'>
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
  emit: {
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
  emits: popperContentProps.emit,
  setup(props, { attrs, slots }) {
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

    const { ...attrsElement } = attrs as PopperContentIntrinsicElement

    const inject = usePopperInject(CONTENT_NAME, props.scopeOkuPopper)

    const content = ref<HTMLDivElement | null>(null)
    const composedRefs = useComposedRefs(content, useForwardRef())

    const arrow = ref<HTMLSpanElement | null>(null)
    const arrowSize = useSize(arrow)

    const arrowWidth = computed(() => arrowSize.value?.width || 0)
    const arrowHeight = computed(() => arrowSize.value?.height || 0)

    const desiredPlacement = computed(() => (side.value + (align.value !== 'center' ? `-${align.value}` : '')) as Placement)

    const collisionPadding
      = typeof collisionPaddingProp.value === 'number'
        ? collisionPaddingProp.value as Padding
        : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp.value } as Padding

    const boundary = Array.isArray(collisionBoundary.value) ? collisionBoundary.value : [collisionBoundary.value]
    const hasExplicitBoundaries = boundary.length > 0

    const detectOverflowOptions = {
      padding: collisionPadding,
      boundary: boundary.filter(isNotNull),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: hasExplicitBoundaries,
    } as DetectOverflowOptions

    const computedMiddleware = computedEager(() => {
      return [
        offset({ mainAxis: sideOffset.value + arrowHeight.value, alignmentAxis: alignOffset.value }),

        avoidCollisions.value && shift({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky.value === 'partial' ? limitShift() : undefined,
          ...detectOverflowOptions,
        }),

        avoidCollisions.value && flip({ ...detectOverflowOptions }),

        size({
          ...detectOverflowOptions,
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

        hideWhenDetached.value && hide({ strategy: 'referenceHidden', ...detectOverflowOptions }),
      ].filter(isDefined) as Middleware[]
    })

    const refElement = ref()
    const { x, y, placement, isPositioned, middlewareData, update, strategy } = useFloating(inject.anchor, refElement, {
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: 'fixed',
      placement: desiredPlacement,
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, {
          animationFrame: updatePositionStrategy.value === 'optimized',
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
        props.onPlaced?.()
    })

    onMounted(() => {
      update()
    })

    const handlePlaced = useCallbackRef(props.onPlaced)

    watch([isPositioned, handlePlaced], () => {
      if (isPositioned.value)
        handlePlaced?.()
    })

    const floatingTop = computed(() => `${y.value ?? 0}px`)
    const floatingLeft = computed(() => `${x.value ?? 0}px`)

    const arrowX = computed(() => `${middlewareData.value.arrow?.x || 0}px`)
    const arrowY = computed(() => `${middlewareData.value.arrow?.y || 0}px`)
    const cannotCenterArrow = computed(() => middlewareData.value.arrow?.centerOffset !== 0)

    const contentZIndex = ref()

    watchEffect(() => {
      if (content.value)
        contentZIndex.value = window.getComputedStyle(content.value).zIndex
    })

    popperContentProvider({
      arrowX,
      arrowY,
      scope: props.scopeOkuPopper,
      shouldHideArrow: cannotCenterArrow,
      onAnchorChange(anchor: HTMLElement | null) {
        arrow.value = anchor
      },
      arrow,
      placedSide,
      anchor: inject.anchor,
    })

    const originalReturn = () =>
      h('div',
        {
          'ref': refElement,
          'data-oku-popper-content-wrapper': '',
          'style': {
            'top': floatingTop.value,
            'left': floatingLeft.value,
            'position': strategy.value,
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
            },
            {
              default: () => slots.default?.(),
            },
          ),
        ],
      )

    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuPopperContent = PopperContent as typeof PopperContent
& (new () => {
  $props: ScopePopper<Partial<PopperContentIntrinsicElement>>
})
