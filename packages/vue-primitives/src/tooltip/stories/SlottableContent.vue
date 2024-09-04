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
        <TooltipContent as="template" :side-offset="5">
          <div class="tooltip_contentClass">
            Nicely done!
            <TooltipArrow class="tooltip_arrowClas" :offset="10" />
          </div>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </div>
</template>
