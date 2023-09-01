<script setup lang="ts">
import {
  OkuTooltip,
  OkuTooltipArrow,
  OkuTooltipContent,
  OkuTooltipPortal,
  OkuTooltipProvider,
  OkuTooltipTrigger,
} from '@oku-ui/tooltip'
import { ref } from 'vue'

const open = ref(true)
</script>

<template>
  <OkuTooltipProvider>
    <OkuTooltip v-model="open">
      <OkuTooltipTrigger class="triggerClass">
        I'm controlled, look I'm {{ open ? 'open' : 'closed' }}
      </OkuTooltipTrigger>
      <OkuTooltipPortal>
        <OkuTooltipContent class="contentClass" :side-offset="5">
          Nicely done!
          <OkuTooltipArrow class="arrowClass" :offset="10" />
        </OkuTooltipContent>
      </OkuTooltipPortal>
    </OkuTooltip>
  </OkuTooltipProvider>
</template>
