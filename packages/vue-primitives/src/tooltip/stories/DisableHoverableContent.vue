<script setup lang="ts">
import './styles.css'
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from '../index.ts'
import TooltipProvider from './TooltipProvider.vue'
</script>

<template>
  <div>
    <h1>Hoverable content (Default)</h1>
    <p>Content remains open while moving pointer to it</p>
    <div :style="{ display: 'flex', gap: '50px' }">
      <TooltipProvider :skip-delay-duration="1000">
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

    <h1>Disable hoverable content</h1>
    <p>Tooltip closes when pointer leaves the trigger</p>
    <h2>Inherited from provider</h2>
    <div :style="{ display: 'flex', gap: '50px' }">
      <TooltipProvider :delay-duration="0" disable-hoverable-content>
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
    <h2>Inherited value overridden by prop on tooltip</h2>
    <div :style="{ display: 'flex', gap: '50px' }">
      <TooltipProvider :delay-duration="0" disable-hoverable-content>
        <TooltipRoot>
          <TooltipTrigger class="tooltip_triggerClass">
            Disabled hoverable content
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent class="tooltip_contentClass" :side-offset="5">
              Nicely done!
              <TooltipArrow class="tooltip_arrowClass" :offset="10" />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>

        <TooltipRoot :disable-hoverable-content="false">
          <TooltipTrigger class="tooltip_triggerClass">
            Hoverable content
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
