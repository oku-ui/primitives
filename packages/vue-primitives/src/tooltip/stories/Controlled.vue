<script setup lang="ts">
import { shallowRef } from 'vue'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger, useTooltipProvider } from '../index.ts'
import './styles.css'

const open = shallowRef(true)

useTooltipProvider()
</script>

<template>
  <div>
    <TooltipRoot v-model:open="open">
      <TooltipTrigger class="tooltip_triggerClass" :style="{ margin: '100px' }">
        I'm controlled, look I'm {{ open ? 'open' : 'closed' }}
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
