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
    <h1 class="text-2xl">
      Delay duration
    </h1>
    <h2 class="text-xl">
      Default (700ms)
    </h2>

    <div
      style="{
      display: flex;
      gap: 50px;
    }"
    >
      <OkuTooltip>
        <OkuTooltipTrigger class="tooltip-trigger">
          Hover me
        </OkuTooltipTrigger>
        <OkuTooltipPortal>
          <OkuTooltipContent class="tooltip-content" :side-offset="5">
            Nicely done!
            <OkuTooltipArrow class="tooltip-arrow" :offset="10" />
          </OkuTooltipContent>
        </OkuTooltipPortal>
      </OkuTooltip>
      <OkuTooltip>
        <OkuTooltipTrigger class="tooltip-trigger">
          Hover me
        </OkuTooltipTrigger>
        <OkuTooltipPortal>
          <OkuTooltipContent class="tooltip-content" :side-offset="5">
            Nicely done!
            <OkuTooltipArrow class="tooltip-arrow" :offset="10" />
          </OkuTooltipContent>
        </OkuTooltipPortal>
      </OkuTooltip>
      <OkuTooltip>
        <OkuTooltipTrigger class="tooltip-trigger">
          Hover me
        </OkuTooltipTrigger>
        <OkuTooltipPortal>
          <OkuTooltipContent class="tooltip-content" :side-offset="5">
            Nicely done!
            <OkuTooltipArrow class="tooltip-arrow" :offset="10" />
          </OkuTooltipContent>
        </OkuTooltipPortal>
      </OkuTooltip>
    </div>
  </OkuTooltipProvider>
</template>

<style lang="postcss" scoped>
.tooltip-positionButton {
  margin: 5px;
  border: 1px solid black;
  background: transparent;
}

.tooltip-content {
  transform-origin: var(--radix-tooltip-content-transform-origin);
  /* ensures content isn't selectable */
  /* this is just a detterent to people putting interactive content inside a `Tooltip.Root` */
  user-select: none;
  background-color: black;
  color: white;
  font-size: 12px;
  border-radius: 5px;
  padding: 10px;
  max-width: 300px;
}

.tooltip-arrow {
  fill: black;
}

@keyframes tooltip-scaleIn {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes tooltip-fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes tooltip-fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.tooltip-animatedContent {
  & [data-state='delayed-open'] {
    animation: tooltip-scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  & [data-state='instant-open'] {
    animation: tooltip-fadeIn 0.2s ease-out;
  }

  & [data-state='closed'] {
    animation: tooltip-fadeOut 0.2s ease-out;
  }
}

.tooltip-grid {
  display: inline-grid;
  grid-template-columns: repeat(3, 50px);
  column-gap: 150px;
  row-gap: 100px;
  padding: 100px;
  border: 1px solid black;
}

.tooltip-chromaticTrigger {
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  background-color: tomato;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.tooltip-chromaticContent {
  box-sizing: border-box;
  display: grid;
  place-content: center;
  width: 60px;
  height: 60px;
  background-color: royalblue;
  color: white;
  font-size: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.tooltip-chromaticArrow {
  fill: black;
}
</style>
