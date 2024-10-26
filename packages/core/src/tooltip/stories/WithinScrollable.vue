<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useTooltipProvider } from '../index.ts'

useTooltipProvider()
</script>

<template>
  <div>
    <div
      :style="{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '500px',
        width: '300px',
        border: '1px solid black',
        overflow: 'auto',
      }"
    >
      <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '600px' }">
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover or Focus me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </div>
    </div>
    <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150vh' }">
      <TooltipRoot>
        <TooltipTrigger class="tooltip_triggerClass">
          Hover or Focus me
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent class="tooltip_contentClass" :side-offset="5">
            Nicely done!
            <TooltipArrow class="tooltip_arrowClass" :offset="10" />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </div>
  </div>
</template>
