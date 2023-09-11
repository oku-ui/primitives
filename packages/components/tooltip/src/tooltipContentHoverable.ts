import { defineComponent, h, mergeProps, ref, watchEffect } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { OkuTooltipContentImpl, type TooltipContentImplElement, type TooltipContentImplNaviteElement, type TooltipContentImplProps, tooltipContentImplProps } from './tooltipContentImpl'
import { scopeTooltipProps } from './types'
import type { Polygon } from './types'
import { useTooltipInject } from './tooltip'
import { CONTENT_NAME } from './tooltipContent'
import { useTooltipProviderInject } from './tooltipProvider'
import { getExitSideFromRect, getHull, getPaddedExitPoints, getPointsFromRect, isPointInPolygon } from './utils'

export type TooltipContentHoverableElementNaviteElement = TooltipContentImplNaviteElement
export type TooltipContentHoverableElement = TooltipContentImplElement

export interface TooltipContentHoverableProps extends TooltipContentImplProps {

}

export const tooltipContentHoverableProps = {
  props: {
    ...primitiveProps,
    ...tooltipContentImplProps.props,
  },
  emits: {
    ...tooltipContentImplProps.emits,
  },
}

const NAME = 'OkuTooltipContentHoverable'

const tooltipContentHoverable = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...tooltipContentHoverableProps.props,
    ...scopeTooltipProps,
  },
  emits: tooltipContentHoverableProps.emits,
  setup(props, { attrs, slots }) {
    const inject = useTooltipInject(CONTENT_NAME, props.scopeOkuTooltip)
    const providerInject = useTooltipProviderInject(CONTENT_NAME, props.scopeOkuTooltip)

    const contentRef = ref<TooltipContentHoverableElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, contentRef)

    const pointerGraceArea = ref<Polygon | null>(null)

    const handleRemoveGraceArea = () => {
      pointerGraceArea.value = null
      providerInject.onPointerInTransitChange(false)
    }

    const handleCreateGraceArea = (event: PointerEvent, hoverTarget: HTMLElement) => {
      const currentTarget = event.currentTarget as HTMLElement
      const exitPoint = {
        x: event.clientX,
        y: event.clientY,
      }
      const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect())
      const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide)
      const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect())
      const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints])
      pointerGraceArea.value = graceArea
      providerInject.onPointerInTransitChange(true)
    }

    watchEffect((onCleanup) => {
      onCleanup(() => {
        handleRemoveGraceArea()
      })
    })

    watchEffect((onCleanup) => {
      if (inject.trigger.value && contentRef.value) {
        const handleTriggerLeave = (event: PointerEvent) => {
          if (contentRef.value)
            handleCreateGraceArea(event, contentRef.value)
        }
        const handleContentLeave = (event: PointerEvent) => {
          if (inject.trigger.value)
            handleCreateGraceArea(event, inject.trigger.value)
        }

        inject.trigger.value.addEventListener('pointerleave', handleTriggerLeave)
        contentRef.value.addEventListener('pointerleave', handleContentLeave)
        onCleanup(() => {
          inject.trigger.value?.removeEventListener('pointerleave', handleTriggerLeave)
          contentRef.value?.removeEventListener('pointerleave', handleContentLeave)
        })
      }
    })

    watchEffect((onCleanup) => {
      if (pointerGraceArea.value) {
        const handleTrackPointerGrace = (event: PointerEvent) => {
          const target = event.target as HTMLElement
          const pointerPosition = {
            x: event.clientX,
            y: event.clientY,
          }

          const hasEnteredTarget = inject.trigger.value?.contains(target) || contentRef.value?.contains(target)
          const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea.value!)

          if (hasEnteredTarget) {
            handleRemoveGraceArea()
          }
          else if (isPointerOutsideGraceArea) {
            handleRemoveGraceArea()
            inject.onClose()
          }
        }
        document.addEventListener('pointermove', handleTrackPointerGrace)

        onCleanup(() => {
          document.removeEventListener('pointermove', handleTrackPointerGrace)
        })
      }
    })

    return () => h(OkuTooltipContentImpl, {
      ...mergeProps(attrs, props),
      ref: composedRefs,
    }, {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuTooltipContentHoverable = tooltipContentHoverable as typeof tooltipContentHoverable &
(new () => {
  $props: TooltipContentHoverableElementNaviteElement
})
