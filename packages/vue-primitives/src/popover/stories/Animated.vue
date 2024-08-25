<script setup lang="ts">
import './styles.css'
import { Popover, PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverTrigger } from '../index.ts'
</script>

<template>
  <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '600px' }">
    <Popover>
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
    </Popover>
  </div>
</template>
