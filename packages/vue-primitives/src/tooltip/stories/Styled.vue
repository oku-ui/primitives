<script setup lang="ts">
import './styles.css'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useTooltipProvider } from '../index.ts'

useTooltipProvider()
</script>

<template>
  <div>
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
</template>
