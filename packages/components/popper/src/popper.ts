import type { PropType, Ref } from 'vue'
import { computed, defineComponent, h, onMounted, ref, toRefs, watch, watchEffect } from 'vue'

import type { ElementType, MergeProps, PrimitiveProps, RefElement } from '@oku-ui/primitive'
import type { Measurable } from '@oku-ui/utils'
import type { Scope } from '@oku-ui/provide'
import { createProvideScope } from '@oku-ui/provide'
import { useCallbackRef, useRef, useSize } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { autoUpdate, flip, arrow as floatingUIarrow, hide, limitShift, offset, shift, size, useFloating } from '@floating-ui/vue'
import type { ArrowProps } from '@oku-ui/arrow'
import { OkuArrow } from '@oku-ui/arrow'
import type {
  DetectOverflowOptions,
  Middleware,
  Padding,
  Placement,
} from '@floating-ui/vue'

const SIDE_OPTIONS = ['top', 'right', 'bottom', 'left'] as const
const ALIGN_OPTIONS = ['start', 'center', 'end'] as const

type Side = typeof SIDE_OPTIONS[number]
type Align = typeof ALIGN_OPTIONS[number]

/* -------------------------------------------------------------------------------------------------
 * Popper
 * ----------------------------------------------------------------------------------------------- */

const POPPER_NAME = 'Popper'

const [createPopperProvider, _createPopperScope] = createProvideScope(POPPER_NAME)

type PopperInjectValue = {
  anchor: Ref<Measurable | null>
}

const [PopperProvider, usePopperInject]
  = createPopperProvider<PopperInjectValue>(POPPER_NAME)

interface PopperProps {
  scopeCheckbox?: Scope
}

const Popper = defineComponent({
  name: POPPER_NAME,
  inheritAttrs: false,
  props: {
    scopeCheckbox: {
      type: Object as unknown as PropType<Scope>,
      required: false,
      default: undefined,
    },
  },
  setup(props, { attrs, expose, slots }) {
    const { scopeCheckbox } = toRefs(props)
    const anchor = ref<Measurable | null>(null)

    PopperProvider({
      scope: scopeCheckbox.value as Scope,
      anchor,
    })

    const originalReturn = () => slots.default?.()

    return originalReturn
  },
})

type _PopperProps = PopperProps

type PopperRef = RefElement<typeof Popper>

const OkuPopper = Popper as typeof Popper & (new () => { $props: _PopperProps })

/* -------------------------------------------------------------------------------------------------
 * PopperAnchor
 * ----------------------------------------------------------------------------------------------- */

const ANCHOR_NAME = 'PopperAnchor'

type PopperAnchorElement = ElementType<'div'>
interface PopperAnchorProps extends PrimitiveProps {
  virtualRef?: Ref<Measurable | null>
  scopeCheckbox?: Scope
}

const PopperAnchor = defineComponent({
  name: ANCHOR_NAME,
  inheritAttrs: false,
  props: {
    virtualRef: {
      type: Object as unknown as PropType<Ref<Measurable | null>>,
      required: false,
      default: undefined,
    },
    scopeCheckbox: {
      type: Object as unknown as PropType<Scope>,
      required: false,
      default: undefined,
    },
  },
  setup(props, { attrs, expose, slots }) {
    const { virtualRef, scopeCheckbox } = toRefs(props)
    const { ...attrsAnchor } = attrs as PopperAnchorElement
    const inject = usePopperInject(ANCHOR_NAME, scopeCheckbox.value)
    const valueEl = ref<HTMLElement | null>(null)

    watchEffect(() => {
      inject.value.anchor.value = virtualRef.value?.value || valueEl.value as Measurable
    })

    onMounted(() => {
      inject.value.anchor.value = virtualRef.value?.value || valueEl.value as Measurable
    })

    const originalReturn = () => virtualRef.value
      ? null
      : h(Primitive.div, {
        ...attrsAnchor,
        ref: inject.value.anchor,
      },
      {
        default: () => slots.default && slots.default?.(),
      },
      )

    return originalReturn
  },
})

/* -------------------------------------------------------------------------------------------------
 * PopperContent
 * ----------------------------------------------------------------------------------------------- */

const CONTENT_NAME = 'PopperContent'

type PopperContentContextValue = {
  placedSide: Side
  onArrowChange: Ref<HTMLSpanElement | null>
  arrowX?: number
  arrowY?: number
  shouldHideArrow: boolean
} & PopperInjectValue

const [PopperContentProvider, usePopperContentInject] = createPopperProvider<PopperContentContextValue>(CONTENT_NAME)

type Boundary = Element | null

type PopperContentElement = ElementType<'div'>
interface PopperContentProps extends PrimitiveProps {
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
  onPlaced?: () => void
  scopePopper?: Scope
}

const PopperContent = defineComponent({
  name: CONTENT_NAME,
  inheritAttrs: false,
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
    onPlaced: {
      type: Function as unknown as PropType<() => void>,
      required: false,
      default: undefined,
    },
    scopePopper: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, expose, slots }) {
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
      onPlaced,
      scopePopper,
    } = toRefs(props)

    const { ...attrsElement } = attrs as PopperContentElement

    const inject = usePopperInject(CONTENT_NAME, scopePopper.value)

    const content = ref<HTMLDivElement | null>(null)
    const { $el, newRef } = useRef<HTMLDivElement>()

    const arrow = ref<HTMLSpanElement | null>(null)
    const arrowSize = useSize(arrow)
    const arrowWidth = computed(() => arrowSize.value?.width || 0)
    const arrowHeight = computed(() => arrowSize.value?.height || 0)

    const desiredPlacement = (side.value + (align.value !== 'center' ? `-${align.value}` : '')) as Placement

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

    const _middleware = computed(() => {
      const toReturn = []
      toReturn.push(transformOrigin({ arrowWidth: arrowWidth.value, arrowHeight: arrowHeight.value }))

      toReturn.push(
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
      )

      toReturn.push(
        offset({ mainAxis: sideOffset.value + arrowHeight.value, alignmentAxis: alignOffset.value }),
      )
      if (avoidCollisions.value) {
        toReturn.push(shift({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky.value === 'partial' ? limitShift() : undefined,
          ...detectOverflowOptions,
        }))
        toReturn.push(flip({ ...detectOverflowOptions }))
      }

      if (arrow.value)
        toReturn.push(floatingUIarrow({ element: arrow.value, padding: arrowPadding.value }))

      if (hideWhenDetached.value)
        toReturn.push(hide({ strategy: 'referenceHidden', ...detectOverflowOptions }))

      return toReturn
    })

    const { floatingStyles, placement, isPositioned, middlewareData, strategy } = useFloating(inject.value.anchor, newRef, {
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: 'fixed',
      placement: desiredPlacement,
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, {
          animationFrame: updatePositionStrategy.value === 'optimized',
        })
        return cleanup
      },
      middleware: _middleware,
    })

    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement.value)
    const handlePlaced = useCallbackRef(onPlaced.value)
    console.log(placedSide, placement.value, floatingStyles.value)
    watch([isPositioned, handlePlaced], () => {
      if (isPositioned.value)
        handlePlaced?.()
    })

    const arrowX = middlewareData.value.arrow?.x
    const arrowY = middlewareData.value.arrow?.y
    const cannotCenterArrow = middlewareData.value.arrow?.centerOffset !== 0

    const contentZIndex = ref()
    watch(content, () => {
      if (content.value)
        contentZIndex.value = window.getComputedStyle(content.value).zIndex
    })

    PopperContentProvider({
      arrowX,
      arrowY,
      scope: scopePopper.value,
      shouldHideArrow: cannotCenterArrow,
      onArrowChange: arrow,
      placedSide,
      anchor: inject.value.anchor,
    })

    const originalReturn = () =>
      h('div',
        {
          'ref': newRef,
          'data-oku-popper-content-wrapper': '',
          'style': {
            ...floatingStyles.value,
            transform: isPositioned.value ? floatingStyles.value.transform : 'translate(0, -200%)', // keep off the page when measuring
            minWidth: 'max-content',
            zIndex: contentZIndex.value,
            ['--oku-popper-transform-origin' as any]: [
              middlewareData.value.transformOrigin?.x,
              middlewareData.value.transformOrigin?.y,
            ].join(' '),
          },
          'dir': attrsElement.dir,

        },
        [
          h('div',
            {
              'data-side': placedSide,
              'data-align': placedAlign,
              ...attrsElement,
              'style': {
                ...attrsElement.style as any,
                // if the PopperContent hasn't been placed yet (not all measurements done)
                // we prevent animations so that users's animation don't kick in too early referring wrong sides
                animation: !isPositioned.value ? 'none' : undefined,
                // hide the content if using the hide middleware and should be hidden
                opacity: middlewareData.value.hide?.referenceHidden ? 0 : undefined,
              },
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

/* -------------------------------------------------------------------------------------------------
 * PopperArrow
 * ----------------------------------------------------------------------------------------------- */

const ARROW_NAME = 'PopperArrow'

const OPPOSITE_SIDE: Record<Side, Side> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}

type PopperArrowElement = ElementType<'svg'>
interface PopperArrowProps extends PrimitiveProps, ArrowProps {
  scopePopper?: Scope
}

const PopperArrow = defineComponent({
  name: ARROW_NAME,
  props: {
    scopePopper: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, slots }) {
    const { ...attrsElement } = attrs as PopperArrowElement
    console.log(attrsElement, 'attrsElement')
    const contentInject = usePopperContentInject(ARROW_NAME, props.scopePopper)
    const baseSide = computed(() => {
      const side = OPPOSITE_SIDE[contentInject.value.placedSide]
      return side
    })
    // < !--position: absolute; top: 0px; transform - origin: center 0px; transform: rotate(180deg); left: 33px; -->
    //   <!--position: absolute; bottom: 0px; transform: translateY(100 %); visibility: hidden; -->
    const originalReturn = () =>
      h('span', {
        ref: contentInject.value.onArrowChange,
        style: {
          position: 'absolute',
          left: contentInject.value.arrowX,
          top: contentInject.value.arrowY,
          [baseSide.value]: '0px',
          transformOrigin: {
            top: '',
            right: '0 0',
            bottom: 'center 0',
            left: '100% 0',
          }[contentInject.value.placedSide],
          transform: {
            top: 'translateY(100%)',
            right: 'translateY(50%) rotate(90deg) translateX(-50%)',
            bottom: 'rotate(180deg)',
            left: 'translateY(50%) rotate(-90deg) translateX(50%)',
          }[contentInject.value.placedSide],
          visibility: contentInject.value.shouldHideArrow ? 'hidden' : undefined,
        },
      },
      [
        h(OkuArrow, {
          ...attrsElement,
        }),
      ])
    return originalReturn
  },

})

type _PopperArrow = MergeProps<PopperArrowProps, PopperArrowElement>

type _PopperAnchor = MergeProps<PopperAnchorProps, PopperAnchorElement>

type _PopperContent = MergeProps<PopperContentProps, PopperContentElement>

const OkuPopperAnchor = PopperAnchor as typeof PopperAnchor & (new () => { $props: _PopperAnchor })

const OkuPopperContent = PopperContent as typeof PopperContent & (new () => { $props: _PopperContent })

const OkuPopperArrow = PopperArrow as typeof PopperArrow & (new () => { $props: _PopperArrow })

export {
  OkuPopper,
  OkuPopperAnchor,
  OkuPopperContent,
  OkuPopperArrow,
}

export type {
  PopperProps,
  PopperRef,
  PopperAnchorProps,
}

/* ----------------------------------------------------------------------------------------------- */

function isNotNull<T>(value: T | null): value is T {
  return value !== null
}

function transformOrigin(options: { arrowWidth: number; arrowHeight: number }): Middleware {
  return {
    name: 'transformOrigin',
    options,
    fn(data: any) {
      const { placement, rects, middlewareData } = data

      const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0
      const isArrowHidden = cannotCenterArrow
      const arrowWidth = isArrowHidden ? 0 : options.arrowWidth
      const arrowHeight = isArrowHidden ? 0 : options.arrowHeight

      const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement)
      const noArrowAlign = { start: '0%', center: '50%', end: '100%' }[placedAlign]

      const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2
      const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2

      let x = ''
      let y = ''

      if (placedSide === 'bottom') {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`
        y = `${-arrowHeight}px`
      }
      else if (placedSide === 'top') {
        x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`
        y = `${rects.floating.height + arrowHeight}px`
      }
      else if (placedSide === 'right') {
        x = `${-arrowHeight}px`
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`
      }
      else if (placedSide === 'left') {
        x = `${rects.floating.width + arrowHeight}px`
        y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`
      }
      return { data: { x, y } }
    },
  }
}

function getSideAndAlignFromPlacement(placement: Placement) {
  const [side, align = 'center'] = placement.split('-')
  return [side as Side, align as Align] as const
}
