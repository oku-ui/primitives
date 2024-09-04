<script setup lang="ts">
import { onBeforeUnmount, shallowRef, watchEffect } from 'vue'
import { isClient } from '@vueuse/core'
import { useForwardElement } from '../hooks/useForwardElement.ts'
import { useTooltipProviderContext } from './TooltipProvider.ts'
import { useTooltipContext } from './TooltipRoot.ts'
import { getExitSideFromRect, getHull, getPaddedExitPoints, getPointsFromRect, isPointInPolygon } from './utils.ts'
import type { Polygon } from './TooltipContentHoverable.ts'
import TooltipContentImpl from './TooltipContentImpl.vue'

defineOptions({
  name: 'TooltipContentHoverable',
})

const context = useTooltipContext('TooltipContentHoverable')
const providerContext = useTooltipProviderContext('TooltipContentHoverable')

const pointerGraceArea = shallowRef<Polygon>()

const content = shallowRef<HTMLElement>()
const forwardElement = useForwardElement(content)

function handleRemoveGraceArea() {
  pointerGraceArea.value = undefined
  providerContext.onPointerInTransitChange(false)
}

function handleCreateGraceArea(event: PointerEvent, hoverTarget: HTMLElement) {
  const currentTarget = event.currentTarget as HTMLElement
  const exitPoint = { x: event.clientX, y: event.clientY }
  const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect())
  const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide)
  const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect())
  const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints])
  pointerGraceArea.value = graceArea
  providerContext.onPointerInTransitChange(true)
}

onBeforeUnmount(() => {
  handleRemoveGraceArea()
})

if (isClient) {
  watchEffect((onCleanup) => {
    const triggerVal = context.trigger.value
    const contentVal = content.value

    if (!triggerVal || !contentVal)
      return

    const handleTriggerLeave = (event: PointerEvent) => handleCreateGraceArea(event, contentVal)
    const handleContentLeave = (event: PointerEvent) => handleCreateGraceArea(event, triggerVal)

    triggerVal.addEventListener('pointerleave', handleTriggerLeave)
    contentVal.addEventListener('pointerleave', handleContentLeave)

    onCleanup(() => {
      triggerVal.removeEventListener('pointerleave', handleTriggerLeave)
      contentVal.removeEventListener('pointerleave', handleContentLeave)
    })
  })

  function handleTrackPointerGrace(event: PointerEvent) {
    const target = event.target as HTMLElement
    const pointerPosition = { x: event.clientX, y: event.clientY }
    const hasEnteredTarget = context.trigger.value?.contains(target) || content.value?.contains(target)
    const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea.value!)

    if (hasEnteredTarget) {
      handleRemoveGraceArea()
    }
    else if (isPointerOutsideGraceArea) {
      handleRemoveGraceArea()
      context.onClose()
    }
  }

  watchEffect((onCleanup) => {
    if (!pointerGraceArea.value)
      return

    document.addEventListener('pointermove', handleTrackPointerGrace)

    onCleanup(() => {
      document.removeEventListener('pointermove', handleTrackPointerGrace)
    })
  })
}

defineExpose({
  $el: content,
})
</script>

<template>
  <TooltipContentImpl :ref="forwardElement">
    <slot />
  </TooltipContentImpl>
</template>
