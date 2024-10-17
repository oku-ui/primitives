<script lang="ts">
import type { Polygon } from './types'
import type {
  TooltipContentImplProps,
} from './utils'

export interface TooltipContentHoverableProps extends TooltipContentImplProps {
}

</script>

<script setup lang="ts">

import { useComponentRef } from '@oku-ui/use-composable'
import { ref, watchEffect, withDefaults } from 'vue'
import OkuTooltipContentImpl from './TooltipContentImpl.vue'
import {
  getExitSideFromRect,
  getHull,
  getPaddedExitPoints,
  getPointsFromRect,
  isPointInPolygon,
  useTooltipInject,
  useTooltipProviderInject,
} from './utils'

const props = withDefaults(defineProps<TooltipContentHoverableProps>(), {
  ariaLabel: undefined,
})
const { componentRef, currentElement } = useComponentRef<HTMLButtonElement | null>()

const inject = useTooltipInject('Tooltip', props.scopeOkuTooltip)
const providerInject = useTooltipProviderInject('TooltipProvider', props.scopeOkuTooltip)

const pointerGraceArea = ref<Polygon | null>(null)

function handleRemoveGraceArea() {
  pointerGraceArea.value = null
  providerInject.onPointerInTransitChange(false)
}

function handleCreateGraceArea(event: PointerEvent, hoverTarget: HTMLElement) {
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
  if (inject.trigger.value && currentElement.value) {
    const handleTriggerLeave = (event: PointerEvent) => {
      if (currentElement.value)
        handleCreateGraceArea(event, currentElement.value)
    }
    const handleContentLeave = (event: PointerEvent) => {
      if (inject.trigger.value)
        handleCreateGraceArea(event, inject.trigger.value)
    }

    inject.trigger.value.addEventListener('pointerleave', handleTriggerLeave)
    currentElement.value.addEventListener('pointerleave', handleContentLeave)
    onCleanup(() => {
      inject.trigger.value?.removeEventListener('pointerleave', handleTriggerLeave)
      currentElement.value?.removeEventListener('pointerleave', handleContentLeave)
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

      const hasEnteredTarget = inject.trigger.value?.contains(target) || currentElement.value?.contains(target)
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

defineExpose({
  $el: currentElement,
})

</script>

<template>
  <OkuTooltipContentImpl
    ref="componentRef"
    v-bind="props"
  >
    <slot />
  </OkuTooltipContentImpl>
</template>
