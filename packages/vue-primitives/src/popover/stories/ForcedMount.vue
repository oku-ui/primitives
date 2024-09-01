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

      <PopoverPortal force-mount>
        <PopoverContent class="popover_contentClass" :side-offset="10" force-mount>
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>
