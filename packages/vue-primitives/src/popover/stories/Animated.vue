<script setup lang="ts">
import './styles.css'
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from '../index.ts'
</script>

<template>
  <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '600px' }">
    <PopoverRoot>
      <PopoverTrigger class="popover_triggerClass">
        open
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent class="popover_contentClass popover_animatedContentClass" :side-offset="10">
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>
