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

      <PopoverPortal force-mount>
        <PopoverContent class="popover_contentClass" :side-offset="10" force-mount>
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  </div>
</template>
