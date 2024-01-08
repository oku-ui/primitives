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
      <OkuTooltipTrigger class="tooltip-trigger">
        Hover or Focus me
      </OkuTooltipTrigger>
      <OkuTooltipPortal>
        <OkuTooltipContent class="tooltip-content" :side-offset="5">
          Nicely done!
          <OkuTooltipArrow class="tooltip-arrow" :offset="10" />
        </OkuTooltipContent>
      </OkuTooltipPortal>
    </OkuTooltip>
  </OkuTooltipProvider>
</template>
