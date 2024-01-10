<script lang="ts">
import { createProvide, usePopperInject } from './Popper.vue'

type Boundary = Element | null | Array<Element | null>

export interface PopperContentProps extends PrimitiveProps {
  scopeOkuPopper?: any
  /**
   * @default 'bottom'
   */
  side?: Side
  /**
   * @default 0
   */
  sideOffset?: number
  /**
   * @default 'center'
   */
  align?: Align
  /**
   * @default 0
   */
  alignOffset?: number
  /**
   * @default 0
   */
  arrowPadding?: number
  /**
   * @default true
   */
  avoidCollisions?: boolean
  /**
   * @default []
   */
  collisionBoundary?: Boundary | Boundary[]
  /**
   * @default 0
   */
  collisionPadding?: number | Partial<Record<Side, number>>
  /**
   * @default 'partial'
   */
  sticky?: 'partial' | 'always'
  /**
   * @default false
   */
  hideWhenDetached?: boolean
  /**
   * @default 'optimized'
   */
  updatePositionStrategy?: 'optimized' | 'always'

  /**
   * @default true
   */
  layoutShift?: boolean

  dir?: 'ltr' | 'rtl'
  onPlaced?: () => void
}

export type PopperContentEmits = {
  placed: [void]
}
export type PopperContentContext = {
  _names: 'OkuPopperContent'
  placedSide: Ref<Side | undefined>
  onArrowChange(arrow: HTMLSpanElement | null): void
  arrowX?: Ref<number | undefined>
  arrowY?: Ref<number | undefined>
  shouldHideArrow: Ref<boolean | undefined>
}

export const { useInject: usePopperContentInject, useProvider: usePopperContentProvider }
 = createProvide<Omit<PopperContentContext, '_names'>>('OkuPopper')
</script>

<script lang="ts" setup>
import type { Ref } from 'vue'
import { computed, defineEmits, defineExpose, defineOptions, defineProps, ref, watch, watchEffect, withDefaults } from 'vue'
import type { PrimitiveProps } from '@oku-ui/primitive'
import { Primitive } from '@oku-ui/primitive'
import { useComponentRef, useSize } from '@oku-ui/use-composable'
import { autoUpdate, flip, arrow as floatingUIarrow, hide, limitShift, offset, shift, size, useFloating } from '@floating-ui/vue'
import type {
  DetectOverflowOptions,
  Middleware,
  Padding,
  Placement,
} from '@floating-ui/vue'
import type { Align, Side } from './utils'
import { getSideAndAlignFromPlacement, isNotNull, transformOrigin } from './utils'

defineOptions({
  name: 'OkuPopperContent',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PopperContentProps>(), {
  side: 'bottom',
  sideOffset: 0,
  align: 'center',
  alignOffset: 0,
  arrowPadding: 0,
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: 'partial',
  hideWhenDetached: false,
  updatePositionStrategy: 'optimized',
  layoutShift: true,
})
const emit = defineEmits<PopperContentEmits>()

const inject = usePopperInject('OkuPopper', props.scopeOkuPopper)

// const content = ref<HTMLDivElement | null>(null)
const { componentRef, currentElement } = useComponentRef<HTMLDivElement | null>()

// const composedRefs = useComposedRefs(useForwardRef, componentRef)

const arrow = ref<HTMLSpanElement | null>(null)
const arrowSize = useSize(arrow)
const arrowWidth = computed(() => arrowSize.value?.width ?? 0)
const arrowHeight = computed(() => arrowSize.value?.height ?? 0)

const desiredPlacement = computed(() => (props.side + (props.align !== 'center' ? `-${props.align}` : '')) as Placement)

const collisionPadding
    = computed(() => typeof props.collisionPadding === 'number'
      ? props.collisionPadding as Padding
      : { top: 0, right: 0, bottom: 0, left: 0, ...props.collisionPadding } as Padding)

const boundary = computed(() => Array.isArray(props.collisionBoundary)
  ? props.collisionBoundary
  : [props.collisionBoundary])

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
    offset({ mainAxis: props.sideOffset + arrowHeight.value, alignmentAxis: props.alignOffset }),

    props.avoidCollisions && shift({
      mainAxis: true,
      crossAxis: false,
      limiter: props.sticky === 'partial' ? limitShift() : undefined,
      ...detectOverflowOptions.value,
    }),

    props.avoidCollisions && flip({ ...detectOverflowOptions.value }),

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

    arrow.value && floatingUIarrow({ element: arrow, padding: props.arrowPadding }),

    transformOrigin({ arrowWidth: arrowWidth.value, arrowHeight: arrowHeight.value }),

    props.hideWhenDetached && hide({ strategy: 'referenceHidden', ...detectOverflowOptions.value }),
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
        animationFrame: props.updatePositionStrategy === 'always',
        layoutShift: props.layoutShift,
      })
      return cleanup
    },
    middleware: computedMiddleware,
    transform: true,
  },
)

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

watch(currentElement, () => {
  if (currentElement.value)
    contentZIndex.value = window.getComputedStyle(currentElement.value).zIndex
})

usePopperContentProvider({
  scope: props.scopeOkuPopper,
  placedSide,
  onArrowChange(anchor: HTMLElement | null) {
    arrow.value = anchor
  },
  arrowX,
  arrowY,
  shouldHideArrow: cannotCenterArrow,
})

defineExpose({
  $el: currentElement,
})
</script>

<template>
  <div
    ref="refElement"
    data-oku-popper-content-wrapper=""
    :style="{
      ...floatingStyles,
      transform: isPositioned ? floatingStyles.transform : 'translate(0, -200%)', // keep off the page when measuring
      minWidth: 'max-content',
      zIndex: contentZIndex ?? undefined,
      ['--oku-popper-transform-origin' as any]: [
        middlewareData.transformOrigin?.x,
        middlewareData.transformOrigin?.y,
      ].join(' '),
    }"
    :dir="dir"
  >
    <Primitive
      is="div"
      ref="componentRef"
      v-bind="$attrs"
      :data-side="placedSide"
      :data-align="placedAlign"
      :dir="dir"
      :as-child="asChild"
      :style="{
        ...$attrs.style as any,
        // if the PopperContent hasn't been placed yet (not all measurements done)
        // we prevent animations so that users's animation don't kick in too early referring wrong sides
        animation: !isPositioned ? 'none' : undefined,
        // hide the content if using the hide middleware and should be hidden
        opacity: middlewareData.hide?.referenceHidden ? 0 : undefined,
      }"
    >
      <slot />
    </Primitive>
  </div>
</template>
