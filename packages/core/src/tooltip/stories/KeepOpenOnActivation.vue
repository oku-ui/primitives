<script setup lang="ts">
import { shallowRef } from 'vue'
import { useForwardElement } from '../../hooks/index.ts'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useTooltipProvider } from '../index.ts'
import './styles.css'

useTooltipProvider()

const triggerRef = shallowRef<HTMLElement>()
const forwardElement = useForwardElement(triggerRef)

function onClick(event: MouseEvent) {
  event.preventDefault()
}

function onPointerdownOutside(event: PointerEvent) {
  if (event.target === triggerRef.value) {
    event.preventDefault()
  }
}
</script>

<template>
  <div>
    <TooltipRoot>
      <TooltipTrigger
        :ref="forwardElement"
        class="tooltip_triggerClass"
        @click="onClick"
      >
        Hover or Focus me
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          class="tooltip_contentClass"
          :side-offset="5"
          @pointerdown-outside="onPointerdownOutside"
        >
          Nicely done!
          <TooltipArrow class="tooltip_arrowClass" offset="{10}" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </div>
</template>
