<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from '../index.ts'
import TooltipProvider from './TooltipProvider.vue'
import './styles.css'
</script>

<template>
  <div>
    <h1>Delay duration</h1>
    <h2>Default (700ms)</h2>

    <div :style="{ display: 'flex', gap: '50px' }">
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>

        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>

        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </TooltipProvider>
    </div>

    <h2>Custom (0ms = instant open)</h2>
    <div :style="{ display: 'flex', gap: '50px' }">
      <TooltipProvider :delay-duration="0">
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>

        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>

        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </TooltipProvider>
    </div>

    <h2>Custom (2s)</h2>
    <div :style="{ display: 'flex', gap: '50px' }">
      <TooltipProvider :delay-duration="2000">
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </TooltipProvider>
    </div>

    <h1>Skip delay duration</h1>
    <h2>Default (300ms to move from one to another tooltip)</h2>
    <div :style="{ display: 'flex', gap: '50px' }">
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </TooltipProvider>
    </div>

    <h2>Custom (0ms to move from one to another tooltip = never skip)</h2>
    <div :style="{ display: 'flex', gap: '50px' }">
      <TooltipProvider :skip-delay-duration="0">
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </TooltipProvider>
    </div>

    <h2>Custom (5s to move from one to another tooltip)</h2>
    <div :style="{ display: 'flex', gap: '50px' }">
      <TooltipProvider :skip-delay-duration="5000">
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Hover me
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </TooltipProvider>
    </div>
  </div>
</template>
