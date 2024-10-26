<script setup lang="ts">
import { shallowRef } from 'vue'
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from '../index.ts'
import './styles.css'

const open = shallowRef(false)
</script>

<template>
  <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }">
    <PopoverRoot v-model:open="open">
      <PopoverTrigger class="popover_triggerClass">
        {{ open ? 'close' : 'open' }}
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent class="popover_contentClass" :side-offset="5">
          <PopoverClose class="popover_closeClass">
            close
          </PopoverClose>
          <PopoverArrow class="popover_arrowClass" :width="20" :height="10" />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>
