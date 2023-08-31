<script setup lang="ts">
import {
  OkuTooltip,
  OkuTooltipArrow,
  OkuTooltipContent,
  OkuTooltipPortal,
  OkuTooltipProvider,
  OkuTooltipTrigger,
} from '@oku-ui/tooltip'
</script>

<template>
  <OkuTooltipProvider>
    <OkuTooltip>
      <OkuTooltipTrigger class="triggerClass">
        Hover or Focus me
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
