<script setup lang="ts">
import './styles.css'
import { TooltipTrigger, useTooltipProvider } from '../index.ts'
import SimpleTooltip from './SimpleTooltip.vue'

useTooltipProvider()
</script>

<template>
  <div>
    <div :style="{ padding: '100px' }">
      <SimpleTooltip class="tooltip_contentClass tooltip_animatedContentClass" label="Hello world 1">
        <TooltipTrigger :style="{ marginRight: '10px' }">
          Hello 1
        </TooltipTrigger>
      </SimpleTooltip>

      <SimpleTooltip class="tooltip_contentClass tooltip_animatedContentClass" label="Hello world 2" side="top">
        <TooltipTrigger>Hello 2</TooltipTrigger>
      </SimpleTooltip>
    </div>
  </div>
</template>
