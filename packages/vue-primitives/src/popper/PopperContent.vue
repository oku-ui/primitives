<script setup lang="ts">
import { computed, shallowRef, watch, watchEffect } from 'vue'
import {
  type Middleware,
  type Placement,
  autoUpdate,
  flip,
  arrow as floatingUIarrow,
  hide,
  limitShift,
  offset,
  shift,
  size,
  useFloating,
} from '@floating-ui/vue'
import { useSize } from '../hooks/useSize.ts'
import { forwardRef } from '../utils/vue.ts'
import { Primitive } from '../primitive/index.ts'
import { usePopperContext } from './Popper.ts'
import { type Align, type PopperContentEmits, type PopperContentProps, type Side, provideContentContext } from './PopperContent.ts'
import { getSideAndAlignFromPlacement, isNotNull, transformOrigin } from './utils.ts'

defineOptions({
  name: 'PopperContent',
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
})
const emit = defineEmits<PopperContentEmits>()

const context = usePopperContext('PopperContent')

const content = shallowRef<HTMLDivElement >()
const forwardedRef = forwardRef(content)

const floatingRef = shallowRef<HTMLElement>()

const arrow = shallowRef<HTMLSpanElement>()

const arrowSize = useSize(arrow)

const desiredPlacement = computed(() => (props.side + (props.align !== 'center' ? `-${props.align}` : '')) as Placement)

function getDetectOverflowOptions() {
  const collisionPadding = typeof props.collisionPadding === 'number'
    ? props.collisionPadding
    : { top: 0, right: 0, bottom: 0, left: 0, ...props.collisionPadding }

  const boundary = Array.isArray(props.collisionBoundary) ? props.collisionBoundary : [props.collisionBoundary]
  const hasExplicitBoundaries = boundary.length > 0

  return {
    padding: collisionPadding,
    boundary: boundary.filter(isNotNull),
    // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
    altBoundary: hasExplicitBoundaries,
  }
}

const middleware = computed(() => {
  const detectOverflowOptions = getDetectOverflowOptions()
  const arrowHeight = arrowSize.value?.height || 0
  const arrowWidth = arrowSize.value?.width || 0

  return [
    offset({ mainAxis: props.sideOffset + arrowHeight, alignmentAxis: props.alignOffset }),
    props.avoidCollisions
    && shift({
      mainAxis: true,
      crossAxis: false,
      limiter: props.sticky === 'partial' ? limitShift() : undefined,
      ...detectOverflowOptions,
    }),
    props.avoidCollisions && flip({ ...detectOverflowOptions }),
    size({
      ...detectOverflowOptions,
      apply: ({ elements, rects, availableWidth, availableHeight }) => {
        const { width: anchorWidth, height: anchorHeight } = rects.reference
        const contentStyle = elements.floating.style
        contentStyle.setProperty('--radix-popper-available-width', `${availableWidth}px`)
        contentStyle.setProperty('--radix-popper-available-height', `${availableHeight}px`)
        contentStyle.setProperty('--radix-popper-anchor-width', `${anchorWidth}px`)
        contentStyle.setProperty('--radix-popper-anchor-height', `${anchorHeight}px`)
      },
    }),
    arrow.value && floatingUIarrow({ element: arrow, padding: props.arrowPadding }),
    transformOrigin({ arrowWidth, arrowHeight }),
    props.hideWhenDetached && hide({ strategy: 'referenceHidden', ...detectOverflowOptions }),
  ] as Middleware[]
})

const { floatingStyles, placement, isPositioned, middlewareData } = useFloating(
  context.anchor,
  floatingRef,
  {
    strategy: 'fixed',
    placement: desiredPlacement,
    whileElementsMounted: (...args) => {
      const cleanup = autoUpdate(...args, {
        animationFrame: props.updatePositionStrategy === 'always',
      })
      return cleanup
    },
    middleware,
  },
)

const placedSide = shallowRef<Side>('bottom')
const placedAlign = shallowRef<Align>('center')

watchEffect(() => {
  const [side, align] = getSideAndAlignFromPlacement(placement.value)
  placedSide.value = side
  placedAlign.value = align
})

watchEffect(() => {
  if (isPositioned.value)
    emit('placed')
}, { flush: 'post' })

const contentZIndex = shallowRef('')

watch(content, (contentVal) => {
  if (contentVal) {
    contentZIndex.value = window.getComputedStyle(contentVal).zIndex
  }
})

provideContentContext({
  placedSide,
  onArrowChange(el) {
    arrow.value = el
  },
  arrowX() {
    return middlewareData.value.arrow?.x ?? undefined
  },
  arrowY() {
    return middlewareData.value.arrow?.y ?? undefined
  },
  shouldHideArrow() {
    return middlewareData.value.arrow?.centerOffset !== 0
  },
})

defineExpose({
  $el: content,
})
</script>

<template>
  <div
    ref="floatingRef"
    data-radix-popper-content-wrapper=""
    :style="{
      ...floatingStyles,
      transform: isPositioned ? floatingStyles.transform : 'translate(0, -200%)', // keep off the page when measuring
      minWidth: 'max-content',
      zIndex: contentZIndex,
      ['--radix-popper-transform-origin' as any]: [
        middlewareData.transformOrigin?.x,
        middlewareData.transformOrigin?.y,
      ].join(' '),

      // hide the content if using the hide middleware and should be hidden
      // set visibility to hidden and disable pointer events so the UI behaves
      // as if the PopperContent isn't there at all
      ...(middlewareData.hide?.referenceHidden && {
        visibility: 'hidden',
        pointerEvents: 'none',
      }),
    }"
    :dir="dir"
  >
    <Primitive
      :ref="forwardedRef"
      :as="as"
      :as-child="props.asChild"
      :data-side="placedSide"
      :data-align="placedAlign"
      v-bind="$attrs"
      :style="{
        // if the PopperContent hasn't been placed yet (not all measurements done)
        // we prevent animations so that users's animation don't kick in too early referring wrong sides
        animation: !isPositioned ? 'none' : undefined,
      }"
    >
      <slot />
    </Primitive>
  </div>
</template>
