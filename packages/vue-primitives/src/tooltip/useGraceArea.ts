import type { VirtualElement } from '@floating-ui/utils'
import { isClient } from '@vueuse/core'
import { onBeforeUnmount, onWatcherCleanup, shallowRef, watchEffect } from 'vue'
import { usePopperContext } from '../popper/index.ts'
import { isPointInPolygon, type Point, type Polygon } from '../shared/index.ts'
import { getExitSideFromRect, getHull, getPaddedExitPoints, getPointsFromRect } from './utils.ts'

export interface UseGraceArea {
  onPointerInTransitChange?: (v: boolean) => void
  onClose: () => void
}

export function useGraceArea(props: UseGraceArea) {
  // const context = useTooltipContext('TooltipContentHoverable')
  // const providerContext = useTooltipProviderContext('TooltipContentHoverable')
  const popperContext = usePopperContext('TooltipContentHoverable')

  const pointerGraceArea = shallowRef<Polygon>()

  function handleRemoveGraceArea() {
    pointerGraceArea.value = undefined
    props.onPointerInTransitChange?.(false)
  }

  function handleCreateGraceArea(event: PointerEvent, hoverTarget: HTMLElement) {
    const currentTarget = event.currentTarget as HTMLElement
    const exitPoint: Point = [event.clientX, event.clientY]
    const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect())
    const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide)
    const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect())
    const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints])
    pointerGraceArea.value = graceArea
    props.onPointerInTransitChange?.(true)
  }

  onBeforeUnmount(() => {
    handleRemoveGraceArea()
  })

  if (isClient) {
    watchEffect(() => {
      const _trigger = popperContext.anchor.value
      const triggerVal: HTMLElement = (_trigger as VirtualElement)?.contextElement ?? _trigger
      const contentVal = popperContext.content.value

      if (!triggerVal || !contentVal)
        return

      const handleTriggerLeave = (event: PointerEvent) => handleCreateGraceArea(event, contentVal)
      const handleContentLeave = (event: PointerEvent) => handleCreateGraceArea(event, triggerVal)

      triggerVal.addEventListener('pointerleave', handleTriggerLeave)
      contentVal.addEventListener('pointerleave', handleContentLeave)

      onWatcherCleanup(() => {
        triggerVal.removeEventListener('pointerleave', handleTriggerLeave)
        contentVal.removeEventListener('pointerleave', handleContentLeave)
      })
    })

    function handleTrackPointerGrace(event: PointerEvent) {
      const target = event.target as HTMLElement
      const pointerPosition: Point = [event.clientX, event.clientY]

      const _trigger = popperContext.anchor.value
      const triggerVal: HTMLElement = (_trigger as VirtualElement)?.contextElement ?? _trigger

      const hasEnteredTarget = triggerVal?.contains(target) || popperContext.content.value?.contains(target)
      const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea.value!)

      if (hasEnteredTarget) {
        handleRemoveGraceArea()
      }
      else if (isPointerOutsideGraceArea) {
        handleRemoveGraceArea()
        props.onClose()
      }
    }

    watchEffect(() => {
      if (!pointerGraceArea.value)
        return

      document.addEventListener('pointermove', handleTrackPointerGrace)

      onWatcherCleanup(() => {
        document.removeEventListener('pointermove', handleTrackPointerGrace)
      })
    })
  }
}
