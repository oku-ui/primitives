import { defineComponent, h, ref, watchEffect } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { OkuTooltipContentImpl, type TooltipContentImplElement, type TooltipContentImplIntrinsicElement, type TooltipContentImplProps, tooltipContentImplProps } from './tooltipContentImpl'
import { scopeTooltipProps } from './types'
import type { Polygon, ScopeTooltip } from './types'
import { useTooltipInject } from './tooltip'
import { CONTENT_NAME } from './tooltipContent'
import { useTooltipProviderInject } from './tooltipProvider'
import { getExitSideFromRect, getHull, getPaddedExitPoints, getPointsFromRect, isPointInPolygon } from './utils'

export type TooltipContentHoverableElementIntrinsicElement = TooltipContentImplIntrinsicElement
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
  setup(props, { attrs, slots, emit }) {
    const inject = useTooltipInject(CONTENT_NAME, props.scopeOkuTooltip)
    const providerInject = useTooltipProviderInject(CONTENT_NAME, props.scopeOkuTooltip)

    const contentRef = ref<TooltipContentHoverableElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(contentRef, forwardedRef)

    const pointerGraceArea = ref<Polygon | null>(null)

    const { trigger } = inject
    const { onPointerInTransitChange } = providerInject

    const handleRemoveGraceArea = () => {
      pointerGraceArea.value = null
      onPointerInTransitChange(false)
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
      onPointerInTransitChange(true)
    }

    watchEffect((onCleanup) => {
      onCleanup(() => {
        handleRemoveGraceArea()
      })
    })

    watchEffect((onCleanup) => {
      if (trigger.value && contentRef.value) {
        const handleTriggerLeave = (event: PointerEvent) => {
          if (contentRef.value)
            handleCreateGraceArea(event, contentRef.value)
        }
        const handleContentLeave = (event: PointerEvent) => {
          if (trigger.value)
            handleCreateGraceArea(event, trigger.value)
        }

        trigger.value.addEventListener('pointermove', handleTriggerLeave)
        contentRef.value.addEventListener('pointermove', handleContentLeave)

        onCleanup(() => {
          trigger.value?.removeEventListener('pointermove', handleTriggerLeave)
          contentRef.value?.removeEventListener('pointermove', handleContentLeave)
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

          const hasEnteredTarget = trigger.value?.contains(target) || contentRef.value?.contains(target)
          // TODO: `!` is a hack to make flow happy. Remove after flow is removed.
          const isPointerOutsideGraceArea = isPointInPolygon(pointerPosition, pointerGraceArea.value!)

          if (hasEnteredTarget) {
            handleRemoveGraceArea()
          }
          else if (isPointerOutsideGraceArea) {
            handleRemoveGraceArea()
            emit('close')
          }
        }
        document.addEventListener('pointermove', handleTrackPointerGrace)

        onCleanup(() => {
          document.removeEventListener('pointermove', handleTrackPointerGrace)
        })
      }
    })

    return () => h(OkuTooltipContentImpl, {
      ...attrs,
      ...props,
      ref: composedRefs,
    }, {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuTooltipContentHoverable = tooltipContentHoverable as typeof tooltipContentHoverable &
(new () => {
  $props: ScopeTooltip<Partial<TooltipContentHoverableElement>>
})
